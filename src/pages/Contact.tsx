import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Get in <span className="gold-text">Touch</span>
            </h1>
            <p className="text-muted-foreground">Have a question? We'd love to hear from you.</p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Form */}
            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn-premium w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "hello@alphanotes.in" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: MapPin, label: "Location", value: "New Delhi, India" },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
