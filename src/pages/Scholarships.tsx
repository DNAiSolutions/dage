import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Calendar, FileCheck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import scholarshipImage from "@/assets/scholarship-celebration.jpg";

const requirements = [
  "Current high school senior in St. John the Baptist Parish",
  "Minimum 2.5 GPA",
  "Demonstrated community involvement",
  "Personal essay (500-750 words)",
  "Two letters of recommendation",
  "Official transcript",
];

const Scholarships = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 min-h-[60vh] flex items-center">
          <div className="absolute inset-0">
            <img src={scholarshipImage} alt="Scholarship" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-secondary/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-foreground/20 text-secondary-foreground font-semibold text-sm rounded-full mb-4">
                <GraduationCap className="h-4 w-4" />
                Applications Open
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-4">
                Youth Scholarships
              </h1>
              <p className="text-secondary-foreground/90 text-lg mb-8 max-w-xl">
                Investing in the future leaders of our community. We award scholarships 
                to deserving high school seniors pursuing higher education.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Eligibility <span className="text-primary">Requirements</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our scholarship program is designed to support local students who 
                  demonstrate academic achievement, community involvement, and a 
                  commitment to their future.
                </p>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <FileCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-muted rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Important Dates
                    </h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Applications Open</span>
                      <span className="font-semibold text-foreground">December 1</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Deadline</span>
                      <span className="font-semibold text-destructive">February 1</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Winners Announced</span>
                      <span className="font-semibold text-foreground">March 15</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-6 w-6 text-gold" />
                    <h3 className="font-display text-xl font-bold">Award Amount</h3>
                  </div>
                  <p className="text-4xl font-display font-bold text-gold mb-2">
                    $1,000+
                  </p>
                  <p className="text-primary-foreground/80">
                    Multiple scholarships awarded annually to deserving students.
                  </p>
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

export default Scholarships;
