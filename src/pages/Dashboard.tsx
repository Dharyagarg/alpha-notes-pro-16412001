import { Layout } from "@/components/Layout";
import { AnimatedSection } from "@/components/AnimatedSection";
import { User, Bookmark, Clock, Crown, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">Sign in to access your personalized dashboard</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card gold-border-glow p-8 sm:p-12 text-center max-w-md mx-auto">
            <LogIn className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Required</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Sign in to view your bookmarks, recently viewed notes, and premium status.
            </p>
            <button className="btn-premium w-full mb-3">Sign In</button>
            <p className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium">Sign Up</button>
            </p>
          </div>
        </AnimatedSection>

        {/* Preview sections */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Bookmark, label: "Bookmarks", desc: "Save notes for later" },
            { icon: Clock, label: "Recently Viewed", desc: "Pick up where you left" },
            { icon: Crown, label: "Premium Status", desc: "Manage your plan" },
          ].map((item, i) => (
            <AnimatedSection key={item.label} delay={0.2 + i * 0.1}>
              <div className="glass-card p-5 text-center opacity-50">
                <item.icon className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium text-foreground text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default DashboardPage;
