/**
 * HERO SECTION LAYOUT CONSTRAINTS - DO NOT MODIFY
 * ================================================
 * 
 * 1. ARC IMAGES: Must ALWAYS remain BELOW the headline text
 *    - Y positions: 58% (center), 66% (inner), 88% (edges)
 *    - X spacing: 10%, 30%, 50%, 70%, 90% (minimum spread)
 *    - Images positioned with z-20, headline has z-30
 *    - CAROUSEL: Images rotate through positions every 3s
 * 
 * 2. ROTATING CTA CIRCLE: Must overlap video section by half
 *    - Position: -bottom-14 md:-bottom-18 lg:-bottom-20
 *    - Z-index: z-50 (stays above all other elements)
 *    - Centered: left-1/2 -translate-x-1/2
 * 
 * 3. HEADLINE: Positioned at top with z-30
 *    - Badge + 3-line headline structure
 *    - pt-24 md:pt-32 padding from top
 *    - Images render below, not overlapping text
 * 
 * These constraints apply regardless of headline text changes.
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import arc1 from "@/assets/arc-1.jpg";
import arc2 from "@/assets/arc-2.jpg";
import arc3 from "@/assets/arc-3.jpg";
import arc4 from "@/assets/arc-4.jpg";
import arc5 from "@/assets/arc-5.jpg";
import arc6 from "@/assets/arc-6.jpg";
import arc7 from "@/assets/arc-7.jpg";
import arc8 from "@/assets/arc-8.jpg";

// All available images for rotation
const allImages = [arc1, arc2, arc3, arc4, arc5, arc6, arc7, arc8];

// Fixed arc positions (images rotate through these)
const arcPositions = [
  { x: '10%', y: '88%', zIndex: 1 },   // position 0 (left edge)
  { x: '30%', y: '66%', zIndex: 2 },   // position 1 (inner left)
  { x: '50%', y: '58%', zIndex: 3 },   // position 2 (center)
  { x: '70%', y: '66%', zIndex: 2 },   // position 3 (inner right)
  { x: '90%', y: '88%', zIndex: 1 },   // position 4 (right edge)
];

const HeroSection = () => {
  // Track which 5 images are currently visible (indices into allImages)
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2, 3, 4]);
  const [exitingImage, setExitingImage] = useState<{ src: string; position: typeof arcPositions[0] } | null>(null);
  const [enteringImage, setEnteringImage] = useState<{ src: string; position: typeof arcPositions[0] } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndices(prev => {
        // Get next image index (wraps around)
        const lastVisibleIndex = prev[prev.length - 1];
        const nextIndex = (lastVisibleIndex + 1) % allImages.length;
        
        // Set exiting image (rightmost)
        setExitingImage({
          src: allImages[prev[4]],
          position: arcPositions[4]
        });
        
        // Set entering image (will appear at left)
        setEnteringImage({
          src: allImages[nextIndex],
          position: arcPositions[0]
        });
        
        // Clear animations after they complete
        setTimeout(() => {
          setExitingImage(null);
          setEnteringImage(null);
        }, 700);
        
        // Shift all indices: remove first, add next at end
        return [...prev.slice(1), nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[120vh] bg-background overflow-hidden">
      
      {/* Heading Section */}
      <div className="relative z-30 flex flex-col items-center pt-24 md:pt-32 px-4">
        
        {/* Welcome Badge */}
        <span className="inline-block px-6 py-2.5 border-2 border-foreground rounded-full text-sm font-heading font-semibold tracking-wider uppercase mb-8">
          Welcome to Krewe of D.A.G.E.
        </span>

        {/* 3-Line Headline */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground text-center leading-[0.95] tracking-tight uppercase">
          <span className="block">Your Gateway to</span>
          <span className="block">Celebration, Culture</span>
          <span className="block text-gold">Community</span>
        </h1>
        
      </div>

      {/* Arc Images Container - z-40 to appear above video */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {/* Visible images in arc positions */}
          {visibleIndices.map((imgIndex, posIndex) => {
            const pos = arcPositions[posIndex];
            return (
              <div
                key={`${imgIndex}-${posIndex}`}
                className="absolute w-32 sm:w-40 md:w-48 lg:w-56 aspect-square rounded-xl overflow-hidden shadow-elevated transition-all duration-700 ease-in-out"
                style={{
                  left: pos.x,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: pos.zIndex,
                }}
              >
                <img
                  src={allImages[imgIndex]}
                  alt={`Celebration ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          
          {/* Exiting image (animates down and fades out) */}
          {exitingImage && (
            <div
              className="absolute w-32 sm:w-40 md:w-48 lg:w-56 aspect-square rounded-xl overflow-hidden shadow-elevated transition-all duration-700 ease-in-out opacity-0"
              style={{
                left: exitingImage.position.x,
                top: '120%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
              }}
            >
              <img
                src={exitingImage.src}
                alt="Exiting"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Entering image (starts from below, animates up with CSS animation) */}
          {enteringImage && (
            <div
              className="absolute w-32 sm:w-40 md:w-48 lg:w-56 aspect-square rounded-xl overflow-hidden shadow-elevated animate-slide-up-fade-in"
              style={{
                left: enteringImage.position.x,
                transform: 'translate(-50%, -50%)',
                zIndex: enteringImage.position.zIndex,
                '--target-top': enteringImage.position.y,
              } as React.CSSProperties}
            >
              <img
                src={enteringImage.src}
                alt="Entering"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Rotating CTA Circle */}
      <div className="absolute -bottom-14 md:-bottom-18 lg:-bottom-20 left-1/2 -translate-x-1/2 z-50">
        <Link
          to="/parade"
          className="group relative block w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"
        >
          {/* Rotating outer ring with text */}
          <svg
            className="w-full h-full animate-spin-slow"
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
          </svg>

          {/* Inner circle with arrow */}
          <div className="absolute inset-4 md:inset-5 bg-foreground rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>

    </section>
  );
};

export default HeroSection;
