/**
 * HERO SECTION LAYOUT CONSTRAINTS - DO NOT MODIFY
 * ================================================
 * 
 * 1. ARC IMAGES: Must ALWAYS remain BELOW the headline text
 *    - Y positions: 60% (center), 65% (inner), 85% (edges)
 *    - X spacing: 10%, 30%, 50%, 70%, 90% (minimum spread)
 *    - Images positioned with z-20, headline has z-30
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

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import arc1 from "@/assets/arc-1.jpg";
import arc2 from "@/assets/arc-2.jpg";
import arc3 from "@/assets/arc-3.jpg";
import arc4 from "@/assets/arc-4.jpg";
import arc5 from "@/assets/arc-5.jpg";

// Arc positioned in U-shape: edges lower, center higher
const arcImages = [
  { src: arc1, x: '10%', y: '85%', rotation: -10, zIndex: 1 },
  { src: arc2, x: '30%', y: '65%', rotation: -5, zIndex: 2 },
  { src: arc3, x: '50%', y: '60%', rotation: 0, zIndex: 3 },
  { src: arc4, x: '70%', y: '65%', rotation: 5, zIndex: 2 },
  { src: arc5, x: '90%', y: '85%', rotation: 10, zIndex: 1 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-background">
      
      {/* Heading Section */}
      <div className="relative z-30 flex flex-col items-center pt-24 md:pt-32 px-4">
        
        {/* Welcome Badge */}
        <span className="inline-block px-6 py-2.5 border-2 border-foreground rounded-full text-sm font-heading font-semibold tracking-wider uppercase mb-8">
          Welcome to Krewe of D.A.G.E.
        </span>

        {/* 3-Line Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-foreground text-center leading-[0.95] tracking-tight uppercase">
          <span className="block">Your Gateway to</span>
          <span className="block">Celebration, Culture</span>
          <span className="block text-gold">Community</span>
        </h1>
        
      </div>

      {/* Arc Images Container */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {arcImages.map((img, i) => (
            <div
              key={i}
              className="absolute w-32 sm:w-40 md:w-48 lg:w-56 aspect-square rounded-xl overflow-hidden shadow-elevated"
              style={{
                left: img.x,
                top: img.y,
                transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`,
                zIndex: img.zIndex,
              }}
            >
              <img
                src={img.src}
                alt={`Celebration ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
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
