import { motion } from "framer-motion";
import { ArrowRight, Crown, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import courtImage from "@/assets/royal-court.jpg";

const positions = [
  {
    title: "Queen",
    description: "Lead representative of the Krewe, presiding over all events.",
    requirements: ["Age 21+", "Community leader", "Active Krewe member"],
  },
  {
    title: "1st Maid",
    description: "First attendant to the Queen with key ceremonial duties.",
    requirements: ["Age 18+", "Dedicated volunteer", "Strong community ties"],
  },
  {
    title: "2nd Maid",
    description: "Second attendant supporting the Royal Court's mission.",
    requirements: ["Age 18+", "Enthusiastic participant", "Team player"],
  },
];

const Court = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={courtImage} alt="Royal Court" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-4">
                <Crown className="h-4 w-4" />
                2026 Season
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Royal Court
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl">
                Represent the Krewe with grace, elegance, and community leadership. 
                Our Royal Court embodies the spirit and mission of D.A.G.E.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Apply for Court
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Positions */}
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
                Court <span className="text-primary">Positions</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Each position carries unique responsibilities and honors.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {positions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-8 shadow-soft text-center border-t-4 border-gold"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                    <Crown className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    {position.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{position.description}</p>
                  <ul className="space-y-2 text-sm">
                    {position.requirements.map((req) => (
                      <li key={req} className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Star className="h-4 w-4 text-gold" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-xl p-8 md:p-12 shadow-soft"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    Royal Court Benefits
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Lead ceremonial roles at the Ball and Parade
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Custom royal regalia and crown
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Professional photography session
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Community recognition and media features
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Leadership development opportunities
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold font-bold">•</span>
                      Lifelong Krewe family connections
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Court;
