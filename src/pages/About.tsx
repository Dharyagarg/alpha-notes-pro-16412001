import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Target, Heart, BookOpen, Users, Award, Lightbulb } from "lucide-react";

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Making quality education accessible to every student in India." },
  { icon: Heart, title: "Student-First", desc: "Every note is crafted keeping student needs at the center." },
  { icon: Lightbulb, title: "Innovation", desc: "Constantly improving our content based on latest exam patterns." },
];

const stats = [
  { value: "50K+", label: "Students" },
  { value: "1000+", label: "Notes" },
  { value: "4.9", label: "Rating" },
  { value: "95%", label: "Success Rate" },
];

const AboutPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gold-text">Alpha Notes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe every student deserves access to high-quality study materials.
            Alpha Notes was born from the idea that well-crafted notes can transform academic performance.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={0.1} className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="glass-card p-6 text-center">
                <p className="text-3xl font-extrabold gold-text mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Story */}
        <AnimatedSection delay={0.2} className="mb-16">
          <div className="glass-card p-8 sm:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Our <span className="gold-text">Story</span></h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Alpha Notes started as a simple idea — sharing well-organized study notes with classmates.
                What began in a small study group quickly grew into a platform used by thousands of students across India.
              </p>
              <p>
                Our team of educators, toppers, and content creators work tirelessly to provide notes that are
                not just informative but also easy to understand and exam-focused. We cover CBSE, ICSE, JEE, and NEET syllabi.
              </p>
              <p>
                Today, Alpha Notes is trusted by 50,000+ students and continues to grow with the mission of
                democratizing quality education.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection delay={0.3}>
          <h2 className="text-2xl font-bold text-center mb-8">Our <span className="gold-text">Values</span></h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={0.3 + i * 0.1}>
                <div className="glass-card-hover p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
