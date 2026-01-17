import { motion } from "framer-motion";
import { Users, GraduationCap, Calendar, Heart } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Parade Riders",
    description: "Community members celebrating together",
  },
  {
    icon: GraduationCap,
    value: "$25K+",
    label: "Scholarships Awarded",
    description: "Invested in student futures",
  },
  {
    icon: Calendar,
    value: "7",
    label: "Years Strong",
    description: "Building traditions since 2018",
  },
  {
    icon: Heart,
    value: "1000+",
    label: "Volunteers",
    description: "Hearts serving our community",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="font-semibold text-foreground mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
