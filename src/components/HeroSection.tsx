import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroLeft from "@/assets/hero-parade.jpg";
import heroRight from "@/assets/royal-court.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Circle transforms based on scroll
  const circleY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={sectionRef} className="relative bg-cream min-h-screen overflow-hidden">
      {/* Top Badge */}
      <div className="pt-28 pb-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-3 border-2 border-foreground rounded-full"
        >
          <span className="font-heading text-sm tracking-[0.2em] uppercase font-medium">
            Welcome to D.A.G.E.
          </span>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="relative container mx-auto px-4">
        {/* Left Angled Photo */}
        <motion.div
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute left-0 top-0 w-64 md:w-80 lg:w-96 z-0"
          style={{ transform: "rotate(-12deg)" }}
        >
          <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
            <img
              src={heroLeft}
              alt="Mardi Gras Parade"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right Angled Photo */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute right-0 top-0 w-64 md:w-80 lg:w-96 z-0"
          style={{ transform: "rotate(8deg)" }}
        >
          <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
            <img
              src={heroRight}
              alt="Royal Court"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Stacked Headline */}
        <div className="relative z-10 text-center py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground"
          >
            <span className="block">Divas Advocating</span>
            <span className="block">Greater Education &</span>
            <span className="block">Community</span>
          </motion.h1>
        </div>
      </div>

      {/* Rotating Circle Button - positioned to bridge into video */}
      <div className="relative z-20 flex justify-center -mb-24 md:-mb-32">
        <motion.div
          style={{ y: circleY, scale: circleScale }}
          className="relative"
        >
          <motion.div
            style={{ rotate: circleRotate }}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-gold flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Rotating Text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text className="fill-foreground text-[11px] font-heading font-bold uppercase tracking-[0.3em]">
                <textPath href="#circlePath">
                  EXPLORE PROGRAMS • EXPLORE PROGRAMS •
                </textPath>
              </text>
            </svg>
            {/* Center Dots */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
          </motion.div>
          {/* Center Arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground flex items-center justify-center">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-cream rotate-45" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={heroLeft}
          >
            <source
              src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-primary/40" />
        </motion.div>

        {/* Bottom Right Info Cards */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="hidden md:block"
          >
            <div className="w-64 aspect-[4/3] overflow-hidden rounded-lg shadow-xl rotate-3">
              <img
                src={heroRight}
                alt="Community Event"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.a
            href="/parade"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-foreground text-cream px-6 py-4 rounded-lg flex items-center justify-between gap-8 hover:bg-foreground/90 transition-colors"
          >
            <span className="font-heading font-semibold">Join Now</span>
            <span className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center">
              <span className="text-xl">+</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
