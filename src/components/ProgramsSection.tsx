import { motion } from "framer-motion";
import { ArrowRight, Crown, GraduationCap, PartyPopper, Heart } from "lucide-react";
import { Link } from "react-router-dom";

import paradeImage from "@/assets/parade-float.png";
import courtImage from "@/assets/royal-court-new.png";
import scholarship1 from "@/assets/scholarship-1.png";
import scholarship2 from "@/assets/scholarship-2.png";
import volunteerImage from "@/assets/volunteers-new.png";

const programs = [
  {
    title: "Annual Parade",
    description:
      "Join the celebration! Ride with us through the streets of St. John Parish, spreading joy and Mardi Gras spirit.",
    image: paradeImage,
    icon: PartyPopper,
    link: "/parade",
    color: "from-primary to-primary/80",
    isScholarship: false,
  },
  {
    title: "Royal Court",
    description:
      "Represent the Krewe with grace and elegance. Our Queens and Maids embody community leadership.",
    image: courtImage,
    icon: Crown,
    link: "/court",
    color: "from-gold to-gold/80",
    isScholarship: false,
  },
  {
    title: "Scholarships",
    description:
      "Investing in our future. We provide scholarships to deserving high school students pursuing higher education.",
    image: scholarship1,
    image2: scholarship2,
    icon: GraduationCap,
    link: "/scholarships",
    color: "from-secondary to-secondary/80",
    isScholarship: true,
  },
  {
    title: "Volunteer",
    description:
      "Be part of something bigger. Volunteers are the heart of our community events and programs.",
    image: volunteerImage,
    icon: Heart,
    link: "/volunteer",
    color: "from-primary to-primary/80",
    isScholarship: false,
  },
];

const ProgramsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold font-semibold text-sm rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Building Community,{" "}
            <span className="text-primary">One Event at a Time</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From parades to scholarships, every program is designed to celebrate
            our culture and uplift our community.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={program.link}
                className="group block relative h-80 rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                {/* Background Image(s) */}
                {program.isScholarship ? (
                  <div className="absolute inset-0 flex">
                    <img
                      src={program.image}
                      alt={`${program.title} 1`}
                      className="w-1/2 h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <img
                      src={(program as any).image2}
                      alt={`${program.title} 2`}
                      className="w-1/2 h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <img
                    src={program.image}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                
                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-end text-primary-foreground">
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                      <program.icon className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                    {program.title}
                  </h3>
                  <p className="text-primary-foreground/90 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
