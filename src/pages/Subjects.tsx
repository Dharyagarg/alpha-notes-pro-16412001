import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Atom, FlaskConical, Calculator, Leaf, ChevronRight } from "lucide-react";

const subjects = [
  {
    name: "Physics",
    icon: Atom,
    gradient: "from-blue-500/15 to-cyan-500/15",
    chapters: { "Class 10": ["Light", "Electricity", "Magnetic Effects"], "Class 11": ["Mechanics", "Thermodynamics", "Waves"], "Class 12": ["Electrostatics", "Optics", "Modern Physics"], JEE: ["Mechanics", "Electrodynamics", "Optics"], NEET: ["Mechanics", "Heat", "Optics"] },
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    gradient: "from-emerald-500/15 to-green-500/15",
    chapters: { "Class 10": ["Chemical Reactions", "Acids & Bases", "Metals"], "Class 11": ["Atomic Structure", "Chemical Bonding", "States of Matter"], "Class 12": ["Solutions", "Electrochemistry", "Organic Chemistry"], JEE: ["Physical Chemistry", "Organic", "Inorganic"], NEET: ["Organic", "Inorganic", "Physical"] },
  },
  {
    name: "Mathematics",
    icon: Calculator,
    gradient: "from-violet-500/15 to-purple-500/15",
    chapters: { "Class 10": ["Trigonometry", "Coordinate Geometry", "Statistics"], "Class 11": ["Sets", "Relations", "Trigonometry"], "Class 12": ["Calculus", "Vectors", "Probability"], JEE: ["Algebra", "Calculus", "Coordinate Geometry"] },
  },
  {
    name: "Biology",
    icon: Leaf,
    gradient: "from-rose-500/15 to-pink-500/15",
    chapters: { "Class 10": ["Life Processes", "Heredity", "Evolution"], "Class 11": ["Cell Biology", "Plant Physiology", "Animal Kingdom"], "Class 12": ["Genetics", "Evolution", "Ecology"], NEET: ["Botany", "Zoology", "Genetics"] },
  },
];

const SubjectsPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Explore <span className="gold-text">Subjects</span>
          </h1>
          <p className="text-muted-foreground">Deep dive into each subject by class and chapter</p>
        </AnimatedSection>

        <div className="space-y-8">
          {subjects.map((subj, i) => (
            <AnimatedSection key={subj.name} delay={i * 0.1}>
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subj.gradient} flex items-center justify-center`}>
                    <subj.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{subj.name}</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(subj.chapters).map(([cls, chapters]) => (
                    <div key={cls} className="p-4 rounded-xl bg-secondary/50 border border-border/30">
                      <h3 className="text-sm font-semibold text-primary mb-3">{cls}</h3>
                      <ul className="space-y-2">
                        {chapters.map((ch) => (
                          <li key={ch}>
                            <Link
                              to={`/notes?subject=${subj.name}&class=${cls}`}
                              className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
                            >
                              {ch}
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default SubjectsPage;
