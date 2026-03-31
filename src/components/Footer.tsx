import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/dage-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Krewe of D.A.G.E." className="h-20 w-auto" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Divas Advocating Greater Education. Bringing Mardi Gras culture and
              educational opportunities to St. John the Baptist Parish since 2018.
            </p>
            <p className="text-gold font-display text-lg italic">
              "It takes a Village"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Parade Info", path: "/parade" },
                { name: "Royal Court", path: "/court" },
                { name: "Scholarships", path: "/scholarships" },
                { name: "Volunteer", path: "/volunteer" },
                { name: "Admin", path: "/auth" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-gold">
              Our Programs
            </h3>
            <ul className="space-y-2">
              {[
                "Annual Parade",
                "Royal Court",
                "Masquerade Ball",
                "Youth Scholarships",
                "Community Events",
              ].map((item) => (
                <li key={item}>
                  <span className="text-primary-foreground/80 text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4 text-gold">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  St. John the Baptist Parish, Louisiana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="mailto:info@kreweofdage.org"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  info@kreweofdage.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="tel:+15551234567"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  (555) 123-4567
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} Krewe of D.A.G.E. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-gold fill-gold" /> for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
