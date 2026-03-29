import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Shield, Upload, Users, FileText, Plus, Trash2, Edit, Crown, Search, LogIn,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Note = Tables<"notes">;
type Profile = Tables<"profiles">;

const SUBJECTS = ["Physics", "Chemistry", "Mathematics", "Biology"];
const CLASSES = ["Class 10", "Class 11", "Class 12", "JEE", "NEET"];

const AdminLogin = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) toast.error(error.message);
    setLoading(false);
  };

  return (
    <Layout>
      <section className="section-padding min-h-[70vh] flex items-center justify-center">
        <AnimatedSection>
          <div className="glass-card gold-border-glow p-8 sm:p-12 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Sign in with admin credentials</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@alphanotes.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full gold-gradient text-primary-foreground" disabled={loading}>
                <LogIn className="w-4 h-4 mr-2" />
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
};

const NotesManager = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", subject: "Physics", class: "Class 12",
    chapter: "", is_premium: false, tags: "",
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const fetchNotes = async () => {
    const { data } = await supabase.from("notes").select("*").order("created_at", { ascending: false });
    if (data) setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", subject: "Physics", class: "Class 12", chapter: "", is_premium: false, tags: "" });
    setPdfFile(null);
    setEditNote(null);
  };

  const openCreate = () => { resetForm(); setDialogOpen(true); };

  const openEdit = (note: Note) => {
    setEditNote(note);
    setForm({
      title: note.title,
      description: note.description || "",
      subject: note.subject,
      class: note.class,
      chapter: note.chapter || "",
      is_premium: note.is_premium,
      tags: note.tags?.join(", ") || "",
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.subject || !form.class) {
      toast.error("Title, subject, and class are required");
      return;
    }
    setUploading(true);

    let pdf_url = editNote?.pdf_url || null;

    if (pdfFile) {
      const filePath = `${Date.now()}_${pdfFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("notes-pdfs")
        .upload(filePath, pdfFile);
      if (uploadError) {
        toast.error("PDF upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("notes-pdfs").getPublicUrl(filePath);
      pdf_url = urlData.publicUrl;
    }

    const noteData = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      subject: form.subject,
      class: form.class,
      chapter: form.chapter.trim() || null,
      is_premium: form.is_premium,
      pdf_url,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : null,
    };

    if (editNote) {
      const { error } = await supabase.from("notes").update(noteData).eq("id", editNote.id);
      if (error) toast.error(error.message);
      else toast.success("Note updated");
    } else {
      const { error } = await supabase.from("notes").insert(noteData);
      if (error) toast.error(error.message);
      else toast.success("Note created");
    }

    setUploading(false);
    setDialogOpen(false);
    resetForm();
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Note deleted"); fetchNotes(); }
  };

  const togglePremium = async (note: Note) => {
    const { error } = await supabase.from("notes").update({ is_premium: !note.is_premium }).eq("id", note.id);
    if (error) toast.error(error.message);
    else { toast.success(`Note marked as ${!note.is_premium ? "premium" : "free"}`); fetchNotes(); }
  };

  const filtered = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase()) ||
    n.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Button onClick={openCreate} className="gold-gradient text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Note
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Subject</TableHead>
              <TableHead className="hidden sm:table-cell">Class</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No notes found. Add your first note!
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{note.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">{note.subject}</TableCell>
                  <TableCell className="hidden sm:table-cell">{note.class}</TableCell>
                  <TableCell>
                    <Switch checked={note.is_premium} onCheckedChange={() => togglePremium(note)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(note)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editNote ? "Edit Note" : "Add New Note"}</DialogTitle>
            <DialogDescription>
              {editNote ? "Update the note details below." : "Fill in the details to create a new note."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Organic Chemistry Reactions" />
            </div>
            <div>
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subject *</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Class *</Label>
                <Select value={form.class} onValueChange={(v) => setForm({ ...form, class: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Chapter</Label>
              <Input value={form.chapter} onChange={(e) => setForm({ ...form, chapter: e.target.value })} placeholder="e.g. Chapter 5" />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g. formulas, reactions, quick-revision" />
            </div>
            <div>
              <Label>PDF File</Label>
              <Input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
              {editNote?.pdf_url && !pdfFile && (
                <p className="text-xs text-muted-foreground mt-1">Current PDF attached. Upload new to replace.</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_premium} onCheckedChange={(v) => setForm({ ...form, is_premium: v })} />
              <Label className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-primary" /> Premium Content
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={uploading} className="gold-gradient text-primary-foreground">
              {uploading ? "Saving..." : editNote ? "Update Note" : "Create Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UsersManager = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setProfiles(data);
  };

  useEffect(() => { fetchProfiles(); }, []);

  const togglePremium = async (profile: Profile) => {
    const { error } = await supabase.from("profiles").update({ is_premium: !profile.is_premium }).eq("id", profile.id);
    if (error) toast.error(error.message);
    else { toast.success(`User ${!profile.is_premium ? "upgraded to premium" : "downgraded to free"}`); fetchProfiles(); }
  };

  const filtered = profiles.filter((p) =>
    (p.display_name || "").toLowerCase().includes(search.toLowerCase()) ||
    p.user_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">User ID</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead className="hidden sm:table-cell">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.display_name || "—"}</TableCell>
                  <TableCell className="hidden sm:table-cell font-mono text-xs text-muted-foreground max-w-[150px] truncate">
                    {profile.user_id}
                  </TableCell>
                  <TableCell>
                    <Switch checked={profile.is_premium} onCheckedChange={() => togglePremium(profile)} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<"notes" | "users">("notes");

  if (loading) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </section>
      </Layout>
    );
  }

  if (!user || !isAdmin) return <AdminLogin />;

  const tabs = [
    { id: "notes" as const, label: "Notes", icon: FileText },
    { id: "users" as const, label: "Users", icon: Users },
  ];

  return (
    <Layout>
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
            <p className="text-muted-foreground">Manage notes, users, and premium content.</p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex gap-2 mb-8">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tab === t.id
                      ? "gold-gradient text-primary-foreground shadow-lg"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "notes" && <NotesManager />}
            {tab === "users" && <UsersManager />}
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPage;
