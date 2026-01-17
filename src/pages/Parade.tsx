import { motion } from "framer-motion";
import { ArrowRight, PartyPopper, Users, FileText, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import paradeImage from "@/assets/hero-parade.jpg";

const steps = [
  {
    icon: FileText,
    title: "Submit Application",
    description: "Complete the float captain application with all required documentation.",
  },
  {
    icon: DollarSign,
    title: "Pay Registration",
    description: "Submit your deposit and set up a payment plan if needed.",
  },
  {
    icon: Users,
    title: "Build Your Crew",
    description: "Recruit riders and ensure all liability forms are submitted.",
  },
  {
    icon: PartyPopper,
    title: "Ride With Us!",
    description: "Join the parade and celebrate with the community!",
  },
];

const Parade = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={paradeImage} alt="Parade" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-4">
                2026 Season
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Annual Parade
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl">
                Experience the magic of Mardi Gras! Join hundreds of riders and thousands 
                of spectators for the biggest celebration in St. John the Baptist Parish.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Apply to Ride
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                How to <span className="text-primary">Participate</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Becoming a parade rider is easy. Follow these steps to join the celebration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card rounded-xl p-6 shadow-soft h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {index + 1}
                      </div>
                      <step.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-xl p-8 shadow-soft"
              >
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Float Captains
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Lead your own float with your crew
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Manage rider applications and payments
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Attend mandatory captain meetings
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Submit insurance and liability documentation
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-xl p-8 shadow-soft"
              >
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Riders
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Join an existing float team
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Complete liability waiver
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Pay rider fees to your captain
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold">•</span>
                    Dress in theme and throw beads!
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Parade;
