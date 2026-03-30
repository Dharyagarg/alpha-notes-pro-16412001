import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Download, FileText, Trash2, FolderOpen, HardDrive, Search, Music2, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { getAllFiles, deleteFile, fmtSize, type DownloadedFile } from "@/lib/downloadManager";

type FilterCategory = "all" | "note" | "music";

const DownloadsPage = () => {
  const [files, setFiles] = useState<DownloadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterCategory>("all");

  const load = async () => {
    try {
      const f = await getAllFiles();
      setFiles(f.sort((a, b) => new Date(b.downloadedAt).getTime() - new Date(a.downloadedAt).getTime()));
    } catch {
      setFiles([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    await deleteFile(id);
    toast.success("File removed from downloads");
    load();
  };

  const handleOpen = (file: DownloadedFile) => {
    window.open(file.url, "_blank");
  };

  const filtered = files.filter((f) => {
    const matchFilter = filter === "all" || f.category === filter;
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const musicCount = files.filter((f) => f.category === "music").length;
  const noteCount = files.filter((f) => f.category === "note").length;

  return (
    <Layout>
      <section className="section-padding min-h-screen">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Offline Access</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Downloads</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Access your downloaded notes and music offline anytime.
            </p>
          </AnimatedSection>

          {/* Search & Filter */}
          <AnimatedSection delay={0.05} className="mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search downloads..."
                  className="pl-10 bg-secondary/50 border-border/50"
                />
              </div>
              <div className="flex gap-2">
                {([
                  { key: "all" as FilterCategory, label: "All", count: files.length },
                  { key: "music" as FilterCategory, label: "Music", count: musicCount, icon: Music2 },
                  { key: "note" as FilterCategory, label: "Notes", count: noteCount, icon: FileIcon },
                ]).map((f) => (
                  <Button
                    key={f.key}
                    variant={filter === f.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f.key)}
                    className={filter === f.key ? "gold-gradient text-primary-foreground" : ""}
                  >
                    {f.icon && <f.icon className="w-3.5 h-3.5 mr-1" />}
                    {f.label} ({f.count})
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading...</div>
          ) : filtered.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <div className="glass-card gold-border-glow p-12 text-center">
                <HardDrive className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  {files.length === 0 ? "No downloads yet" : "No matching downloads"}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {files.length === 0
                    ? "Download notes or music to access them offline."
                    : "Try a different search or filter."}
                </p>
                {files.length === 0 && (
                  <div className="flex gap-3 justify-center">
                    <Button asChild className="gold-gradient text-primary-foreground">
                      <a href="/notes">Browse Notes</a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="/music">Browse Music</a>
                    </Button>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-3">
              {filtered.map((file, i) => (
                <AnimatedSection key={file.id} delay={i * 0.03}>
                  <motion.div whileHover={{ x: 4 }} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {file.category === "music" ? (
                        <Music2 className="w-6 h-6 text-primary" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {fmtSize(file.size)} · {file.category} · {new Date(file.downloadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpen(file)}>
                        <FolderOpen className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(file.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DownloadsPage;
