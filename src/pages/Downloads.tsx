import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, FileText, Trash2, FolderOpen, HardDrive } from "lucide-react";
import { toast } from "sonner";

interface DownloadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  downloadedAt: string;
}

const DB_NAME = "alpha-notes-downloads";
const STORE_NAME = "files";

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => { req.result.createObjectStore(STORE_NAME, { keyPath: "id" }); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

const getAllFiles = async (): Promise<DownloadedFile[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
};

const deleteFile = async (id: string) => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

const fmtSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const DownloadsPage = () => {
  const [files, setFiles] = useState<DownloadedFile[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <section className="section-padding min-h-screen">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Offline Access</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Downloads</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Access your downloaded notes offline anytime.
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading...</div>
          ) : files.length === 0 ? (
            <AnimatedSection delay={0.1}>
              <div className="glass-card gold-border-glow p-12 text-center">
                <HardDrive className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No downloads yet</h2>
                <p className="text-muted-foreground mb-6">
                  Download notes from the Notes page to access them offline.
                </p>
                <Button asChild className="gold-gradient text-primary-foreground">
                  <a href="/notes">Browse Notes</a>
                </Button>
              </div>
            </AnimatedSection>
          ) : (
            <div className="space-y-3">
              {files.map((file, i) => (
                <AnimatedSection key={file.id} delay={i * 0.05}>
                  <motion.div whileHover={{ x: 4 }} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {fmtSize(file.size)} · {new Date(file.downloadedAt).toLocaleDateString()}
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
