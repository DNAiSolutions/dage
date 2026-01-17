import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import courtImage from "@/assets/royal-court.jpg";

const Ball = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={courtImage} alt="Masquerade Ball" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-4">
                <Sparkles className="h-4 w-4" />
                Annual Gala
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Masquerade Ball
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                An elegant evening of celebration, crowning, and community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <Calendar className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">Date</h3>
                  <p className="text-muted-foreground">March 8, 2026</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">Time</h3>
                  <p className="text-muted-foreground">7:00 PM - Midnight</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">Venue</h3>
                  <p className="text-muted-foreground">Regency Ballroom</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center text-primary-foreground"
              >
                <Sparkles className="h-12 w-12 text-gold mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  An Unforgettable Evening
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                  Join us for an elegant masquerade featuring live entertainment, 
                  delicious cuisine, the crowning of our Royal Court, and a night 
                  of celebration you won't forget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/contact">RSVP Now</Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/contact">Purchase Tickets</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dress Code */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Dress Code
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Black tie or formal Mardi Gras attire. Masks are encouraged and 
                add to the magical atmosphere of the evening.
              </p>
              <div className="inline-flex gap-4 text-gold font-semibold">
                <span>Purple</span>
                <span>•</span>
                <span>Gold</span>
                <span>•</span>
                <span>Green</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Ball;
