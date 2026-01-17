import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dage-logo.png";

const MissionSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Logo Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-primary/20 blur-3xl rounded-full" />
              <img
                src={logo}
                alt="Krewe of D.A.G.E."
                className="relative h-64 md:h-80 w-auto animate-float"
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Est. 2018
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              More Than a Parade.
              <br />
              <span className="text-primary">A Movement.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-8">
              <p>
                <strong className="text-foreground">D.A.G.E.</strong> stands for{" "}
                <em>Divas Advocating Greater Education</em>. We are a nonprofit 
                organization dedicated to preserving Mardi Gras traditions while 
                creating educational opportunities for the youth of St. John the 
                Baptist Parish.
              </p>
              <p>
                Our annual parade, royal court, and scholarship programs bring 
                together hundreds of community members in celebration and service. 
                We believe that <em>"It takes a Village"</em>—and we're building one, 
                float by float, scholarship by scholarship.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/about">
                  Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/donate">Support Our Mission</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
