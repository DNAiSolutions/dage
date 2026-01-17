import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

// Arc gallery images
import arc1 from "@/assets/arc-1.jpg";
import arc2 from "@/assets/arc-2.jpg";
import arc3 from "@/assets/arc-3.jpg";
import arc4 from "@/assets/arc-4.jpg";
import arc5 from "@/assets/arc-5.jpg";
import arc6 from "@/assets/arc-6.jpg";
import arc7 from "@/assets/arc-7.jpg";
import arc8 from "@/assets/arc-8.jpg";
import panoramaImage from "@/assets/panorama-hero.jpg";

// Arc image configuration - positioned to create curved arc effect
const arcImages = [
  { src: arc1, rotation: -32, x: -48, y: 40, scale: 0.85, zIndex: 1 },
  { src: arc2, rotation: -22, x: -32, y: 15, scale: 0.92, zIndex: 2 },
  { src: arc3, rotation: -12, x: -16, y: -5, scale: 0.98, zIndex: 3 },
  { src: arc4, rotation: -4, x: -2, y: -15, scale: 1.02, zIndex: 4 },
  { src: arc5, rotation: 4, x: 12, y: -15, scale: 1.02, zIndex: 4 },
  { src: arc6, rotation: 12, x: 26, y: -5, scale: 0.98, zIndex: 3 },
  { src: arc7, rotation: 22, x: 42, y: 15, scale: 0.92, zIndex: 2 },
  { src: arc8, rotation: 32, x: 58, y: 40, scale: 0.85, zIndex: 1 },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for different elements
  const arcY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const arcX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const panoramaY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] bg-background overflow-hidden"
    >
      {/* Layer 1: Welcome Badge + Multi-line Headline */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-24 md:pt-32 z-30">
        {/* Welcome Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2.5 border-2 border-foreground rounded-full text-sm font-heading font-semibold tracking-wider uppercase mb-8"
        >
          Welcome to Krewe of D.A.G.E.
        </motion.span>

        {/* 3-Line Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground text-center leading-[0.95] tracking-tight uppercase"
        >
          <span className="block">Your Gateway to</span>
          <span className="block">Celebration, Culture &amp;</span>
          <span className="block text-gold">Community</span>
        </motion.h1>

        {/* Layer 2: Arc Image Gallery */}
        <motion.div
          style={{ y: arcY, x: arcX }}
          className="arc-container absolute inset-x-0 top-[45%] md:top-[50%] flex justify-center items-center h-48 md:h-64 lg:h-80 z-20"
        >
          <div className="relative w-full max-w-6xl mx-auto h-full">
            {arcImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className="arc-image absolute w-28 sm:w-36 md:w-44 lg:w-52 aspect-square rounded-lg overflow-hidden shadow-elevated"
                style={{
                  left: `${img.x + 50}%`,
                  top: `${img.y + 50}%`,
                  transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
                  zIndex: img.zIndex,
                }}
              >
                <img
                  src={img.src}
                  alt={`Mardi Gras celebration ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Layer 3: Rotating CTA Circle */}
        <motion.div
          className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/parade"
            className="group relative block w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
          >
            {/* Outer rotating ring with text */}
            <motion.svg
              style={{ rotate: circleRotate }}
              className="w-full h-full rotating-text"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="1.5"
              />
              <text className="fill-foreground text-[7px] font-heading font-semibold uppercase tracking-[0.15em]">
                <textPath href="#circlePath">
                  Explore Programs • Join the Parade • Explore Programs •
                </textPath>
              </text>
            </motion.svg>

            {/* Inner circle with arrow */}
            <div className="absolute inset-4 md:inset-5 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Layer 4: Full-width Panoramic Image */}
      <motion.div
        style={{ y: panoramaY }}
        className="absolute bottom-0 left-0 right-0 h-[60vh] md:h-[70vh] z-10"
      >
        <div className="relative w-full h-full">
          <img
            src={panoramaImage}
            alt="St. John the Baptist Parish aerial view"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Tagline over panorama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-12 md:bottom-20 inset-x-0 text-center"
          >
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground italic">
              "It takes a Village"
            </p>
            <p className="mt-3 text-muted-foreground text-sm md:text-base font-heading max-w-xl mx-auto px-4">
              Divas Advocating Greater Education • St. John the Baptist Parish, Louisiana
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
