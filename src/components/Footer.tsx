import { Link } from "react-router-dom";
import { BookOpen, Instagram, Youtube, Send, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Notes", to: "/notes" },
      { label: "Subjects", to: "/subjects" },
      { label: "Premium", to: "/premium" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Links", to: "/links" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "#" },
      { label: "Terms of Service", to: "#" },
    ],
  },
];

export const Footer = () => (
  <footer className="border-t border-border/30 bg-card/30 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gold-text">Alpha Notes</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            One Stop Solution for Class 10, 11, 12, JEE & NEET preparation.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "#" },
              { icon: Youtube, href: "#" },
              { icon: Send, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h4 className="text-sm font-semibold text-foreground mb-4">{group.title}</h4>
            <ul className="space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alpha Notes. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for students
        </p>
      </div>
    </div>
  </footer>
);
