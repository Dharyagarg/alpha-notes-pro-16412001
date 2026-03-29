import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Instagram, Youtube, Send, Globe, ExternalLink } from "lucide-react";

const links = [
  { icon: Send, label: "Telegram Channel", desc: "Join for daily notes & updates", url: "#", color: "from-blue-500/20 to-blue-600/20" },
  { icon: Instagram, label: "Instagram", desc: "Follow for study tips & motivation", url: "#", color: "from-pink-500/20 to-rose-500/20" },
  { icon: Youtube, label: "YouTube", desc: "Video explanations & tutorials", url: "#", color: "from-red-500/20 to-red-600/20" },
  { icon: Globe, label: "Website", desc: "alphanotes.in", url: "#", color: "from-primary/20 to-gold-dark/20" },
];

const LinksPage = () => (
  <Layout>
    <section className="section-padding min-h-[70vh] flex items-center">
      <div className="max-w-lg mx-auto w-full">
        <AnimatedSection className="text-center mb-10">
          <div className="w-20 h-20 mx-auto rounded-2xl gold-gradient flex items-center justify-center mb-4 shadow-lg animate-pulse-gold">
            <span className="text-2xl font-extrabold text-primary-foreground">α</span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Alpha Notes</h1>
          <p className="text-sm text-muted-foreground">One Stop Solution for Exam Prep</p>
        </AnimatedSection>

        <div className="space-y-4">
          {links.map((link, i) => (
            <AnimatedSection key={link.label} delay={i * 0.1}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-hover p-4 flex items-center gap-4 group block"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}>
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground truncate">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default LinksPage;
