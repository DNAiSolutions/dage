import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Captain's Meeting",
    date: "January 15, 2026",
    time: "6:00 PM",
    location: "Community Center",
    description: "Mandatory meeting for all float captains.",
    type: "Meeting",
  },
  {
    title: "Scholarship Deadline",
    date: "February 1, 2026",
    time: "11:59 PM",
    location: "Online Submission",
    description: "Last day to submit scholarship applications.",
    type: "Deadline",
  },
  {
    title: "Annual Parade",
    date: "March 1, 2026",
    time: "12:00 PM",
    location: "Main Street, LaPlace",
    description: "Join us for the biggest celebration of the year!",
    type: "Event",
  },
  {
    title: "Masquerade Ball",
    date: "March 8, 2026",
    time: "7:00 PM",
    location: "Regency Ballroom",
    description: "An elegant evening of celebration.",
    type: "Event",
  },
];

const typeColors = {
  Meeting: "bg-primary/10 text-primary",
  Deadline: "bg-destructive/10 text-destructive",
  Event: "bg-gold/10 text-gold",
};

const EventsSection = () => {
  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-semibold text-sm rounded-full mb-4">
            Mark Your Calendar
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay up to date with important dates, meetings, and celebrations.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                      typeColors[event.type as keyof typeof typeColors]
                    }`}
                  >
                    {event.type}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {event.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <Link to="/contact">View Full Calendar</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
