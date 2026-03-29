import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, Filter, Crown, Download, Eye } from "lucide-react";

const allNotes = [
  { id: 1, title: "Electrostatics Complete", subject: "Physics", class: "Class 12", premium: false, downloads: 1200 },
  { id: 2, title: "Organic Chemistry Reactions", subject: "Chemistry", class: "Class 12", premium: true, downloads: 980 },
  { id: 3, title: "Integration Tricks & Formulas", subject: "Mathematics", class: "Class 12", premium: true, downloads: 1500 },
  { id: 4, title: "Human Physiology – Digestive", subject: "Biology", class: "NEET", premium: false, downloads: 870 },
  { id: 5, title: "Trigonometry All Formulas", subject: "Mathematics", class: "Class 10", premium: false, downloads: 2100 },
  { id: 6, title: "Chemical Bonding", subject: "Chemistry", class: "Class 11", premium: true, downloads: 760 },
  { id: 7, title: "Laws of Motion", subject: "Physics", class: "JEE", premium: false, downloads: 1100 },
  { id: 8, title: "Cell Biology Notes", subject: "Biology", class: "Class 11", premium: false, downloads: 640 },
  { id: 9, title: "Coordinate Geometry", subject: "Mathematics", class: "JEE", premium: true, downloads: 890 },
  { id: 10, title: "Thermodynamics", subject: "Physics", class: "Class 11", premium: false, downloads: 950 },
  { id: 11, title: "Genetics & Evolution", subject: "Biology", class: "NEET", premium: true, downloads: 1300 },
  { id: 12, title: "Acids, Bases & Salts", subject: "Chemistry", class: "Class 10", premium: false, downloads: 1800 },
];

const classes = ["All", "Class 10", "Class 11", "Class 12", "JEE", "NEET"];
const subjects = ["All", "Physics", "Chemistry", "Mathematics", "Biology"];
const types = ["All", "Free", "Premium"];

const NotesPage = () => {
  const [search, setSearch] = useState("");
  const [selClass, setSelClass] = useState("All");
  const [selSubject, setSelSubject] = useState("All");
  const [selType, setSelType] = useState("All");

  const filtered = allNotes.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.subject.toLowerCase().includes(search.toLowerCase());
    const matchClass = selClass === "All" || n.class === selClass;
    const matchSubject = selSubject === "All" || n.subject === selSubject;
    const matchType = selType === "All" || (selType === "Free" ? !n.premium : n.premium);
    return matchSearch && matchClass && matchSubject && matchType;
  });

  return (
    <Layout>
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Browse <span className="gold-text">Notes</span>
            </h1>
            <p className="text-muted-foreground">Find the perfect notes for your preparation</p>
          </AnimatedSection>

          {/* Search & Filters */}
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="glass-card p-4 sm:p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search notes by title or subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelClass(c)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selClass === c
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="w-px h-6 bg-border hidden sm:block" />
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelSubject(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selSubject === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="w-px h-6 bg-border hidden sm:block" />
                <div className="flex gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelType(t)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        selType === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Notes Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((note, i) => (
              <AnimatedSection key={note.id} delay={i * 0.05}>
                <div className="glass-card-hover p-5 group cursor-pointer relative overflow-hidden">
                  {note.premium && (
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className="gold-gradient absolute -right-5 -top-5 w-20 h-20 rotate-45 opacity-10" />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {note.class}
                    </span>
                    {note.premium ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        <Crown className="w-3 h-3" /> Premium
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-emerald-500">Free</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{note.subject}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" /> {note.downloads.toLocaleString()}
                    </span>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No notes found</p>
              <p className="text-sm">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NotesPage;
