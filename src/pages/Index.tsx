import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  BookOpen, Sparkles, Crown, ArrowRight, Star, GraduationCap,
  Atom, FlaskConical, Calculator, Brain, ChevronRight, Zap, Shield, Clock
} from "lucide-react";

const categories = [
  { label: "Class 10", icon: GraduationCap, count: 120, color: "from-blue-500/20 to-cyan-500/20" },
  { label: "Class 11", icon: BookOpen, count: 180, color: "from-emerald-500/20 to-green-500/20" },
  { label: "Class 12", icon: Sparkles, count: 200, color: "from-violet-500/20 to-purple-500/20" },
  { label: "JEE", icon: Atom, count: 350, color: "from-orange-500/20 to-amber-500/20" },
  { label: "NEET", icon: FlaskConical, count: 280, color: "from-rose-500/20 to-pink-500/20" },
];

const features = [
  { icon: Zap, title: "Smart Learning", desc: "AI-curated notes organized by difficulty and syllabus coverage." },
  { icon: BookOpen, title: "Categorized Notes", desc: "Perfectly organized by class, subject, and chapter." },
  { icon: Crown, title: "Premium Access", desc: "Unlock exclusive handwritten notes and solved examples." },
  { icon: Shield, title: "Exam Ready", desc: "Notes aligned with latest exam patterns and marking schemes." },
  { icon: Clock, title: "Quick Revision", desc: "Concise summaries and formula sheets for last-minute prep." },
  { icon: Brain, title: "Practice Questions", desc: "Curated MCQs and subjective questions with solutions." },
];

const trendingNotes = [
  { title: "Organic Chemistry – Reactions", subject: "Chemistry", class: "Class 12", premium: true },
  { title: "Electrostatics Complete Notes", subject: "Physics", class: "JEE", premium: false },
  { title: "Integration Formulas & Tricks", subject: "Mathematics", class: "Class 12", premium: true },
  { title: "Human Physiology – Digestive", subject: "Biology", class: "NEET", premium: false },
  { title: "Trigonometry – All Formulas", subject: "Mathematics", class: "Class 10", premium: false },
  { title: "Chemical Bonding Notes", subject: "Chemistry", class: "Class 11", premium: true },
];

const testimonials = [
  { name: "Priya S.", role: "JEE Advanced 2025", text: "Alpha Notes helped me score 98 percentile. The notes are incredibly well-organized!", rating: 5 },
  { name: "Rahul M.", role: "NEET 2025", text: "Best notes platform I've used. The biology notes are comprehensive and easy to understand.", rating: 5 },
  { name: "Ananya K.", role: "Class 12 CBSE", text: "Got 95% in boards! The revision notes and formula sheets were a lifesaver.", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden section-padding min-h-[85vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 gold-border-glow">
              <Sparkles className="w-3.5 h-3.5" />
              Your Academic Success Starts Here
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance"
          >
            One Stop Solution for{" "}
            <span className="gold-text">Class 10, 11, 12,</span>
            <br />
            <span className="gold-text">JEE & NEET</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Access premium, handcrafted notes designed by toppers and educators.
            Study smarter, score higher.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/notes" className="btn-premium flex items-center gap-2 text-base">
              Explore Notes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/premium"
              className="px-8 py-3 rounded-xl text-base font-semibold border border-border hover:border-primary/50 text-foreground hover:text-primary transition-all duration-300"
            >
              Go Premium
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary" /> 1000+ Notes
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-primary fill-primary" /> 4.9 Rating
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary" /> 50K+ Students
            </span>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="gold-text">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select your class or exam to find perfectly curated notes.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.label} delay={i * 0.1}>
              <Link
                to={`/notes?category=${cat.label}`}
                className="glass-card-hover p-6 text-center group block"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{cat.label}</h3>
                <p className="text-xs text-muted-foreground">{cat.count}+ Notes</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="gold-text">Alpha Notes</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Built for serious students who want to excel.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.1}>
              <div className="glass-card-hover p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Trending Notes */}
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Trending <span className="gold-text">Notes</span>
            </h2>
            <p className="text-muted-foreground">Most popular notes this week</p>
          </div>
          <Link to="/notes" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingNotes.map((note, i) => (
            <AnimatedSection key={note.title} delay={i * 0.08}>
              <div className="glass-card-hover p-5 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                    {note.class}
                  </span>
                  {note.premium && (
                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                      <Crown className="w-3 h-3" /> Premium
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {note.title}
                </h3>
                <p className="text-sm text-muted-foreground">{note.subject}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Loved by <span className="gold-text">Students</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed italic">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="glass-card gold-border-glow p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <div className="relative">
              <Crown className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to <span className="gold-text">Ace Your Exams</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of students already using Alpha Notes to score higher and study smarter.
              </p>
              <Link to="/notes" className="btn-premium inline-flex items-center gap-2 text-base">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Index;
