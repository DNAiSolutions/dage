import { motion } from "framer-motion";
import { Heart, Users, Calendar, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import volunteerImage from "@/assets/volunteers.jpg";

const opportunities = [
  {
    icon: Calendar,
    title: "Event Setup & Coordination",
    description: "Help organize and set up for our parade, ball, and community events.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Spread the word about our programs and scholarship opportunities.",
  },
  {
    icon: Megaphone,
    title: "Parade Support",
    description: "Assist with parade logistics, crowd management, and safety.",
  },
  {
    icon: Heart,
    title: "Fundraising",
    description: "Support our scholarship fund through various fundraising activities.",
  },
];

const Volunteer = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={volunteerImage} alt="Volunteers" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-4">
                <Heart className="h-4 w-4 fill-current" />
                Join Our Village
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Volunteer With Us
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl">
                Be part of something bigger. Our volunteers are the heart and soul 
                of everything we do. Together, we make a difference.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Sign Up Today</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Opportunities */}
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
                Ways to <span className="text-primary">Get Involved</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                There's a place for everyone in our village. Find the opportunity 
                that fits your skills and interests.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {opportunities.map((opp, index) => (
                <motion.div
                  key={opp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <opp.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">
                        {opp.title}
                      </h3>
                      <p className="text-muted-foreground">{opp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Volunteer */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why <span className="text-primary">Volunteer?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  When you volunteer with D.A.G.E., you're not just giving time—you're 
                  investing in your community's future. You'll meet amazing people, 
                  develop new skills, and be part of traditions that last a lifetime.
                </p>
                <p className="font-display text-2xl text-gold italic">
                  "It takes a Village"
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;
