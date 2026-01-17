import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/dage-logo.png";

const donationTiers = [
  {
    amount: "$25",
    title: "Friend",
    description: "Help us purchase supplies for community events.",
  },
  {
    amount: "$50",
    title: "Supporter",
    description: "Contribute to our youth program activities.",
  },
  {
    amount: "$100",
    title: "Champion",
    description: "Fund a significant portion of a student scholarship.",
  },
  {
    amount: "$250",
    title: "Patron",
    description: "Become a named sponsor for our programs.",
  },
];

const Donate = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <img src={logo} alt="D.A.G.E." className="h-24 mx-auto mb-6" />
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold font-semibold text-sm rounded-full mb-4">
                <Heart className="h-4 w-4 fill-current" />
                Support Our Mission
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                Make a <span className="text-gold">Difference</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
                Your generous donation supports youth scholarships, community events, 
                and the preservation of our rich Mardi Gras heritage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Donation Tiers */}
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
                Choose Your <span className="text-primary">Impact</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Every contribution, no matter the size, makes a meaningful difference 
                in our community.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {donationTiers.map((tier, index) => (
                <motion.div
                  key={tier.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-elevated transition-all duration-300 border-t-4 border-gold"
                >
                  <p className="font-display text-4xl font-bold text-primary mb-2">
                    {tier.amount}
                  </p>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {tier.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {tier.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Donate {tier.amount}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-4">
                Want to give a custom amount?
              </p>
              <Button variant="gold" size="lg">
                Custom Donation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Tax Info */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Tax-Deductible Giving
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Krewe of D.A.G.E. is a registered 501(c)(3) nonprofit organization. 
                Your donation is tax-deductible to the fullest extent allowed by law. 
                You will receive a receipt for your records.
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us for More Info</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
