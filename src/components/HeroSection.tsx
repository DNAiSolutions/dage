/**
 * HERO SECTION LAYOUT CONSTRAINTS - DO NOT MODIFY
 * ================================================
 * 
 * 1. ARC IMAGES: Must ALWAYS remain BELOW the headline text
 *    - Y positions: 58% (center), 66% (inner), 88% (edges)
 *    - X spacing: 10%, 30%, 50%, 70%, 90% (minimum spread)
 *    - Images positioned with z-20, headline has z-30 with mix-blend-difference
 *    - CAROUSEL: Images rotate through positions every 4.5s
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

import carousel1 from "@/assets/carousel-1.png";
import carousel2 from "@/assets/carousel-2.png";
import carousel3 from "@/assets/carousel-3.png";
import carousel4 from "@/assets/carousel-4.png";
import carousel5 from "@/assets/carousel-5.png";
import carousel6 from "@/assets/carousel-6.png";
import carousel7 from "@/assets/carousel-7.png";

// All available images for rotation
const allImages = [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7];

// Fixed arc positions (images rotate through these)
const arcPositions = [
  { x: '10%', y: '84%', zIndex: 1 },   // position 0 (left edge)
  { x: '30%', y: '68%', zIndex: 2 },   // position 1 (inner left)
  { x: '50%', y: '60%', zIndex: 3 },   // position 2 (center)
  { x: '70%', y: '68%', zIndex: 2 },   // position 3 (inner right)
  { x: '90%', y: '84%', zIndex: 1 },   // position 4 (right edge)
];

const HeroSection = () => {
  // Track which 5 images are currently visible (indices into allImages)
  const [visibleIndices, setVisibleIndices] = useState([0, 1, 2, 3, 4]);
  const [exitingImage, setExitingImage] = useState<{ src: string; position: typeof arcPositions[0] } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndices(prev => {
        // Get next image index (wraps around)
        const lastVisibleIndex = prev[prev.length - 1];
        const nextIndex = (lastVisibleIndex + 1) % allImages.length;
        
        // Set exiting image (rightmost) - animates down and fades out
        setExitingImage({
          src: allImages[prev[4]],
          position: arcPositions[4]
        });
        
        // Clear exit animation after it completes
        setTimeout(() => {
          setExitingImage(null);
        }, 700);
        
        // Shift all indices: remove first, add next at end
        return [...prev.slice(1), nextIndex];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-background overflow-visible">
      
      {/* Heading Section */}
      <div className="relative z-30 flex flex-col items-center pt-24 md:pt-32 px-4">
        
        {/* Welcome Badge */}
        <span className="inline-block px-6 py-2.5 border-2 border-foreground rounded-full text-sm font-heading font-semibold tracking-wider uppercase mb-8">
          Welcome to Krewe of D.A.G.E.
        </span>

        {/* 3-Line Headline */}
        <h1 
          className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center leading-[0.95] tracking-tight uppercase bg-gradient-to-r from-[#68258C] via-[#0FA958] via-50% to-[#F2B705] bg-clip-text text-transparent"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
        >
          <span className="block">Bringing Education, Culture,</span>
          <span className="block">and Community Together</span>
          <span className="block">in St. John Parish</span>
        </h1>
        
      </div>

      {/* Arc Images Container - z-20 so headline blends in front */}
      <div className="absolute inset-0 z-20 pointer-events-none">
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
                  className="w-full h-full object-cover brightness-110"
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
                top: '100%',
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
              {/* Krewe Colors Gradient */}
              <linearGradient id="kreweGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#68258C" />
                <stop offset="33%" stopColor="#0FA958" />
                <stop offset="66%" stopColor="#F2B705" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
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
              stroke="url(#kreweGradient)"
              strokeWidth="2"
            />
            <text className="fill-foreground text-[7px] font-heading font-semibold uppercase tracking-[0.15em]">
              <textPath href="#circlePath">
                Explore Programs • Join the Parade • Explore Programs •
              </textPath>
            </text>
          </svg>

          {/* Inner circle with arrow */}
          <div className="absolute inset-4 md:inset-5 bg-gradient-to-br from-purple to-green via-gold rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>

    </section>
  );
};

export default HeroSection;
