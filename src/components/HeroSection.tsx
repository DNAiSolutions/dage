import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroParade from "@/assets/hero-parade.jpg";
import royalCourt from "@/assets/royal-court.jpg";
import volunteers from "@/assets/volunteers.jpg";
import scholarship from "@/assets/scholarship-celebration.jpg";

// Arc image configuration - positions along an upward arc
const arcImages = [
  { id: 1, src: heroParade, x: -42, y: 15, rotation: -15, delay: 0 },
  { id: 2, src: royalCourt, x: -30, y: 5, rotation: -12, delay: 0.05 },
  { id: 3, src: volunteers, x: -18, y: -2, rotation: -8, delay: 0.1 },
  { id: 4, src: scholarship, x: -8, y: -5, rotation: -4, delay: 0.15 },
  { id: 5, src: heroParade, x: 0, y: -6, rotation: 0, delay: 0.2 },
  { id: 6, src: royalCourt, x: 8, y: -5, rotation: 4, delay: 0.25 },
  { id: 7, src: volunteers, x: 18, y: -2, rotation: 8, delay: 0.3 },
  { id: 8, src: scholarship, x: 30, y: 5, rotation: 12, delay: 0.35 },
  { id: 9, src: heroParade, x: 42, y: 15, rotation: 15, delay: 0.4 },
];

const ArcImage = ({ 
  src, 
  x, 
  y, 
  rotation, 
  delay,
  scrollProgress 
}: { 
  src: string; 
  x: number; 
  y: number; 
  rotation: number; 
  delay: number;
  scrollProgress: any;
}) => {
  // Scroll-based transforms for each image
  const imageRotate = useTransform(
    scrollProgress, 
    [0, 0.5, 1], 
    [rotation - 5, rotation, rotation + 10]
  );
  const imageOpacity = useTransform(
    scrollProgress, 
    [0, 0.2, 0.6, 0.9], 
    [0.7, 1, 1, 0.3]
  );
  const imageY = useTransform(
    scrollProgress,
    [0, 1],
    [0, 100]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: rotation - 10 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.8, delay: delay + 0.3, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        translateX: "-50%",
        translateY: "-50%",
        rotate: imageRotate,
        opacity: imageOpacity,
        y: imageY,
      }}
      className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52"
    >
      <div className="w-full h-full overflow-hidden rounded-lg shadow-xl">
        <img
          src={src}
          alt="Community moment"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Circle transforms based on scroll
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const circleScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  return (
    <section ref={sectionRef} className="relative bg-cream overflow-hidden">
      {/* Top Badge */}
      <div className="pt-32 pb-8 flex justify-center relative z-30">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-8 py-3 border-2 border-foreground rounded-full bg-cream"
        >
          <span className="font-heading text-sm tracking-[0.2em] uppercase font-medium">
            Welcome to D.A.G.E.
          </span>
        </motion.div>
      </div>

      {/* Arc Images Container */}
      <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh]">
        {/* Image Arc Layer */}
        <div className="absolute inset-0 z-0">
          {arcImages.map((img) => (
            <ArcImage
              key={img.id}
              src={img.src}
              x={img.x}
              y={img.y}
              rotation={img.rotation}
              delay={img.delay}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Stacked Headline - On Top of Arc */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[clamp(2rem,7vw,6.5rem)] font-black uppercase leading-[0.85] tracking-tight text-foreground text-center max-w-6xl px-4"
          >
            <span className="block">Divas Advocating</span>
            <span className="block">Greater Education &</span>
            <span className="block">Community</span>
          </motion.h1>
        </div>
      </div>

      {/* Rotating Circle Button - Bridges into Video */}
      <div className="relative z-30 flex justify-center -mt-16 md:-mt-24">
        <motion.div
          style={{ scale: circleScale }}
          className="relative cursor-pointer group"
        >
          <motion.div
            style={{ rotate: circleRotate }}
            className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full bg-gold flex items-center justify-center transition-transform group-hover:scale-105"
          >
            {/* Rotating Text Ring */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text className="fill-foreground text-[10px] font-heading font-bold uppercase tracking-[0.25em]">
                <textPath href="#circlePath">
                  EXPLORE PROGRAMS • EXPLORE PROGRAMS •
                </textPath>
              </text>
            </svg>
            {/* Decorative Dots */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-foreground" />
          </motion.div>
          {/* Center Arrow Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-cream rotate-[135deg]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Banner Section - Revealed from Behind */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] mt-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={heroParade}
          >
            <source
              src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </video>
          {/* Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/30 to-transparent" />
        </motion.div>

        {/* Bottom Right Cards Over Video */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col gap-4 z-10">
          {/* Angled Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="hidden md:block"
          >
            <div className="w-56 lg:w-72 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl rotate-3">
              <img
                src={royalCourt}
                alt="Royal Court Celebration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          {/* CTA Button */}
          <motion.a
            href="/parade"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-foreground text-cream px-6 py-4 rounded-xl flex items-center justify-between gap-10 hover:bg-foreground/90 transition-colors shadow-xl"
          >
            <span className="font-heading font-semibold text-lg">Join Now</span>
            <span className="w-10 h-10 rounded-full bg-cream/20 flex items-center justify-center">
              <span className="text-2xl font-light">+</span>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
