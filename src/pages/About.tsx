import { motion } from "framer-motion";
import { Users, Target, Heart, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import logo from "@/assets/dage-logo.png";

const values = [
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in the power of togetherness. Our programs bring families, friends, and neighbors together in celebration.",
  },
  {
    icon: Target,
    title: "Education",
    description:
      "Investing in our youth is investing in our future. Scholarships and mentorship are at the heart of our mission.",
  },
  {
    icon: Heart,
    title: "Tradition",
    description:
      "We preserve and celebrate the rich cultural heritage of Mardi Gras and Louisiana traditions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "From our parades to our scholarship programs, we strive for excellence in everything we do.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={logo} alt="D.A.G.E." className="h-32 mx-auto mb-6" />
                <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                  About <span className="text-gold">D.A.G.E.</span>
                </h1>
                <p className="text-primary-foreground/80 text-lg">
                  Divas Advocating Greater Education • Est. 2018
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
                  <p>
                    The Krewe of D.A.G.E. was founded in 2018 by a group of passionate 
                    women who saw an opportunity to bring authentic New Orleans–level 
                    Mardi Gras culture to St. John the Baptist Parish while addressing 
                    a critical need: educational support for local youth.
                  </p>
                  <p>
                    What started as a vision quickly became a movement. <strong>"D.A.G.E."</strong> stands 
                    for <em>Divas Advocating Greater Education</em>, reflecting our dual commitment 
                    to celebrating our rich cultural heritage and investing in the future 
                    of our community through scholarships and educational programs.
                  </p>
                  <p>
                    Our motto, <em>"It takes a Village,"</em> isn't just words—it's how we operate. 
                    Every float rider, volunteer, and donor is part of our village. Together, 
                    we've awarded thousands of dollars in scholarships, organized unforgettable 
                    parades, and created a community that celebrates together.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These principles guide everything we do.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 text-center shadow-soft"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
