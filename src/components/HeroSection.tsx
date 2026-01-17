import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import heroParade from "@/assets/hero-parade.jpg";
import royalCourt from "@/assets/royal-court.jpg";
import volunteers from "@/assets/volunteers.jpg";
import scholarship from "@/assets/scholarship-celebration.jpg";

// 10 images arranged in an upward arc curve (center high, edges low)
// Images have FIXED tilt angles - they do NOT rotate on scroll
// On scroll, images TRANSLATE along the arc path (slide effect)
const arcImages = [
  { id: 1, src: heroParade, baseX: -420, baseY: 160, baseRotation: -12 },
  { id: 2, src: royalCourt, baseX: -320, baseY: 80, baseRotation: -10 },
  { id: 3, src: volunteers, baseX: -220, baseY: 20, baseRotation: -8 },
  { id: 4, src: scholarship, baseX: -120, baseY: -30, baseRotation: -5 },
  { id: 5, src: heroParade, baseX: -40, baseY: -50, baseRotation: -2 },
  { id: 6, src: royalCourt, baseX: 40, baseY: -50, baseRotation: 2 },
  { id: 7, src: volunteers, baseX: 120, baseY: -30, baseRotation: 5 },
  { id: 8, src: scholarship, baseX: 220, baseY: 20, baseRotation: 8 },
  { id: 9, src: heroParade, baseX: 320, baseY: 80, baseRotation: 10 },
  { id: 10, src: royalCourt, baseX: 420, baseY: 160, baseRotation: 12 },
];

interface ArcImageProps {
  src: string;
  baseX: number;
  baseY: number;
  baseRotation: number;
  index: number;
  scrollProgress: MotionValue<number>;
}

const ArcImage = ({ 
  src, 
  baseX, 
  baseY, 
  baseRotation, 
  index,
  scrollProgress 
}: ArcImageProps) => {
  // Scroll-based TRANSLATION along the arc path (NOT rotation)
  // Images slide around the arc curve as user scrolls
  const slideOffsetX = useTransform(
    scrollProgress, 
    [0, 0.5, 1], 
    [0, 80, 160] // Shift right as scroll progresses
  );
  
  const slideOffsetY = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0, 30, 80] // Shift down slightly to follow arc curve
  );
  
  const opacity = useTransform(
    scrollProgress, 
    [0, 0.15, 0.6, 0.85, 1], 
    [0.8, 1, 1, 0.7, 0.3]
  );

  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 1.02, 0.95]
  );

  // Build transform: translate along arc path + FIXED rotation (no spinning)
  const transform = useTransform(
    [slideOffsetX, slideOffsetY, scale] as MotionValue<number>[],
    ([offsetX, offsetY, sc]: number[]) => 
      `translate3d(${offsetX}px, ${offsetY}px, 0px) scale3d(${sc}, ${sc}, 1) rotate(${baseRotation}deg)`
  );

  return (
    <motion.div
      className="home-image-wrapper absolute"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{
        width: 150,
        height: 150,
        left: "50%",
        top: "50%",
        marginLeft: baseX,
        marginTop: baseY,
        willChange: "transform",
        opacity,
        transform,
      }}
    >
      <img
        src={src}
        alt={`Community image ${index + 1}`}
        loading="eager"
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </motion.div>
  );
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Circle rotation based on scroll - matches Citypedia behavior
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <section ref={sectionRef} className="relative bg-cream min-h-[150vh]">
      {/* Home Section with Badge + Images + Headline */}
      <div className="home-section relative">
        {/* Top Welcome Badge */}
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

        {/* Home Details Block - Arc Images + Headline */}
        <div className="home-details-block relative">
          <div className="w-layout-blockcontainer container-large mx-auto">
            {/* Home Block Container */}
            <div className="home-block relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
              {/* Arc Image Block - positioned behind headline */}
              <div 
                className="home-image-block absolute inset-0 flex items-center justify-center z-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {arcImages.map((img, index) => (
                  <ArcImage
                    key={img.id}
                    src={img.src}
                    baseX={img.baseX}
                    baseY={img.baseY}
                    baseRotation={img.baseRotation}
                    index={index}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Stacked Headline - z-index 2, on top of images */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tighter text-foreground text-center"
                >
                  <span className="block">Divas Advocating</span>
                  <span className="block">Greater Education &</span>
                  <span className="block">Community</span>
                </motion.h1>
              </div>
            </div>
          </div>
        </div>

        {/* City CTA Section - Rotating Circle Button - Moved closer to arc */}
        <div className="city-section relative mt-4 md:mt-8 flex justify-center z-20">
          <motion.a
            href="/parade"
            className="city-cta relative cursor-pointer group"
            style={{
              width: 150,
              height: 150,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Outer rotating ring with text */}
            <motion.div
              className="city-cta-wrap absolute inset-0 rounded-full flex items-center justify-center"
              style={{ 
                rotate: circleRotate,
                backgroundColor: "hsl(var(--accent))", // Green accent
              }}
            >
              {/* Circular Text */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 150">
                <defs>
                  <path
                    id="circleTextPath"
                    d="M 75, 75 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
                  />
                </defs>
                <text className="fill-foreground text-[9px] font-heading font-bold uppercase tracking-[0.3em]">
                  <textPath href="#circleTextPath">
                    EXPLORE PROGRAMS • EXPLORE PROGRAMS •
                  </textPath>
                </text>
              </svg>
              {/* Decorative dots at top and bottom */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground" />
            </motion.div>

            {/* Center static button with arrow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center shadow-lg">
                <ArrowUpRight className="w-6 h-6 text-cream -rotate-45" />
              </div>
            </div>
          </motion.a>
        </div>

        {/* Minimal whitespace - video visible in first viewport scroll */}
        <div className="h-8 bg-cream" />
      </div>

      {/* Video Banner Section - revealed from behind the arc */}
      <div className="city-image-section relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
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
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent" />
        </motion.div>

        {/* City Loop element - scrolling text at bottom (optional enhancement) */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden py-6">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(8)].map((_, i) => (
              <span 
                key={i} 
                className="font-display text-4xl md:text-6xl font-black uppercase text-cream/80 tracking-tight"
              >
                KREWE OF D.A.G.E. •
              </span>
            ))}
          </motion.div>
        </div>

        {/* Angled photo card over video - bottom right */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-20 right-6 md:bottom-24 md:right-10 hidden md:block z-10"
        >
          <div className="w-56 lg:w-72 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl rotate-3">
            <img
              src={royalCourt}
              alt="Royal Court Celebration"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* CTA overlay button */}
        <motion.a
          href="/parade"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-20 right-6 md:bottom-24 md:right-10 md:hidden bg-foreground text-cream px-6 py-4 rounded-xl flex items-center justify-between gap-8 hover:bg-foreground/90 transition-colors shadow-xl z-10"
        >
          <span className="font-heading font-semibold text-base">Join the Krewe</span>
          <span className="w-8 h-8 rounded-full bg-cream/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
