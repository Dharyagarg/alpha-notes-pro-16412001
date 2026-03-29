import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Crown, Check, Lock, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["Access to free notes", "Basic search & filters", "Community support", "5 downloads/day"],
    cta: "Current Plan",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    features: ["All free features", "Premium handwritten notes", "Unlimited downloads", "Formula sheets", "Priority support", "Early access to new content"],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Ultimate",
    price: "₹499",
    period: "/year",
    features: ["Everything in Pro", "Solved previous year papers", "Video explanations", "1-on-1 doubt clearing", "Offline access", "Certificate of completion"],
    cta: "Go Ultimate",
    popular: false,
  },
];

const PremiumPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 gold-border-glow">
            <Crown className="w-4 h-4" /> Premium Plans
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Unlock <span className="gold-text">Premium</span> Notes
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            Invest in your future. Get access to the best study materials.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                className={`glass-card p-6 sm:p-8 relative h-full flex flex-col ${
                  plan.popular ? "gold-border-glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gold-gradient text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "btn-premium"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Locked preview */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">
              Preview <span className="gold-text">Premium Content</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Organic Chemistry – Named Reactions", "JEE Advanced PYQs Solved"].map((title) => (
                <div key={title} className="glass-card p-5 relative overflow-hidden group">
                  <div className="absolute inset-0 backdrop-blur-sm bg-background/60 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Upgrade to unlock</p>
                    </div>
                  </div>
                  <div className="blur-[2px]">
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded w-full" />
                      <div className="h-3 bg-muted rounded w-4/5" />
                      <div className="h-3 bg-muted rounded w-3/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default PremiumPage;
