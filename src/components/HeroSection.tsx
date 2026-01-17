import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

// Arc gallery images - only 5 needed
import arc1 from "@/assets/arc-1.jpg";
import arc2 from "@/assets/arc-2.jpg";
import arc3 from "@/assets/arc-3.jpg";
import arc4 from "@/assets/arc-4.jpg";
import arc5 from "@/assets/arc-5.jpg";
import panoramaImage from "@/assets/panorama-hero.jpg";

// Arc image configuration - 5 images positioned to FRAME the headline (not cluster in center)
const arcImages = [
  // Far left - tilted left
  { src: arc1, rotation: -22, xVw: -38, yPercent: 55, scale: 0.9, zIndex: 1 },
  // Left of headline - higher up
  { src: arc2, rotation: -12, xVw: -22, yPercent: 15, scale: 0.95, zIndex: 2 },
  // Bottom center - slight tilt
  { src: arc3, rotation: 3, xVw: 0, yPercent: 70, scale: 0.88, zIndex: 1 },
  // Right of headline - higher up
  { src: arc4, rotation: 12, xVw: 22, yPercent: 15, scale: 0.95, zIndex: 2 },
  // Far right - tilted right
  { src: arc5, rotation: 22, xVw: 38, yPercent: 55, scale: 0.9, zIndex: 1 },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const arcY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const panoramaY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[160vh] bg-background overflow-hidden"
    >
      {/* Sticky content container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-start pt-20 md:pt-28">
        
        {/* Layer 1: Welcome Badge + Headline (z-30) */}
        <div className="relative z-30 text-center px-4">
          {/* Welcome Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2.5 border-2 border-foreground rounded-full text-sm font-heading font-semibold tracking-wider uppercase mb-6"
          >
            Welcome to Krewe of D.A.G.E.
          </motion.span>

          {/* 3-Line Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight uppercase"
          >
            <span className="block">Your Gateway to</span>
            <span className="block">Celebration, Culture &amp;</span>
            <span className="block text-gold">Community</span>
          </motion.h1>
        </div>

        {/* Layer 2: Arc Image Gallery (z-20) - positioned to frame headline */}
        <motion.div
          style={{ y: arcY }}
          className="arc-container absolute inset-0 top-16 md:top-20 pointer-events-none z-20"
        >
          <div className="relative w-full h-full max-w-7xl mx-auto">
            {arcImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="arc-image absolute w-32 sm:w-40 md:w-48 lg:w-56 aspect-square rounded-lg overflow-hidden shadow-elevated"
                style={{
                  left: `calc(50% + ${img.xVw}vw)`,
                  top: `${img.yPercent}%`,
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

        {/* Layer 3: Rotating CTA Circle (z-40) - at video edge */}
        <motion.div
          className="absolute bottom-[18vh] md:bottom-[22vh] left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
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
                stroke="hsl(var(--secondary))"
                strokeWidth="2.5"
              />
              <text className="fill-foreground text-[7px] font-heading font-semibold uppercase tracking-[0.12em]">
                <textPath href="#circlePath">
                  Explore Programs • Join the Parade • Explore Programs •
                </textPath>
              </text>
            </motion.svg>

            {/* Inner circle with arrow */}
            <div className="absolute inset-3 md:inset-4 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight className="w-7 h-7 md:w-9 md:h-9 text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Layer 4: Full-width Panoramic Image (z-10) */}
      <motion.div
        style={{ y: panoramaY }}
        className="absolute bottom-0 left-0 right-0 h-[55vh] md:h-[60vh] z-10"
      >
        <div className="relative w-full h-full">
          <img
            src={panoramaImage}
            alt="St. John the Baptist Parish aerial view"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          
          {/* Tagline over panorama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-10 md:bottom-16 inset-x-0 text-center"
          >
            <p className="font-display text-xl md:text-3xl lg:text-4xl font-bold text-foreground italic">
              "It takes a Village"
            </p>
            <p className="mt-2 text-muted-foreground text-sm md:text-base font-heading max-w-xl mx-auto px-4">
              Divas Advocating Greater Education • St. John the Baptist Parish, Louisiana
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
