/**
 * HERO SECTION LAYOUT CONSTRAINTS - DO NOT MODIFY
 * ================================================
 * 
 * 1. ARC IMAGES: Must ALWAYS remain BELOW the headline text
 *    - Rotating carousel along elliptical path
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
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import arc1 from "@/assets/arc-1.jpg";
import arc2 from "@/assets/arc-2.jpg";
import arc3 from "@/assets/arc-3.jpg";
import arc4 from "@/assets/arc-4.jpg";
import arc5 from "@/assets/arc-5.jpg";

const arcImages = [arc1, arc2, arc3, arc4, arc5];

// Carousel configuration
const ROTATION_DURATION = 25; // seconds for one full rotation
const NUM_IMAGES = arcImages.length;
const ANGLE_OFFSET = 360 / NUM_IMAGES; // 72° between each image

const HeroSection = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;
      
      // Rotate clockwise (positive direction)
      setRotation(prev => (prev + (360 / ROTATION_DURATION) * deltaTime) % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Calculate position for each image based on current rotation
  const getImagePosition = (index: number) => {
    // Start angle for this image (offset by index)
    const baseAngle = index * ANGLE_OFFSET;
    // Current angle including rotation (clockwise = subtract rotation)
    const currentAngle = (baseAngle - rotation + 360) % 360;
    // Convert to radians (start from top, go clockwise)
    const radians = ((currentAngle - 90) * Math.PI) / 180;

    // Ellipse parameters - steeper arc (more vertical curve)
    const radiusX = 42; // % of container width
    const radiusY = 32; // % of container height - steeper curve

    // Calculate position on ellipse
    const x = 50 + radiusX * Math.cos(radians); // Center at 50%
    const y = 55 + radiusY * Math.sin(radians); // Center below headline

    // Calculate rotation based on position on arc (tangent angle)
    const tiltAngle = Math.atan2(
      radiusY * Math.cos(radians),
      -radiusX * Math.sin(radians)
    ) * (180 / Math.PI);

    // Visibility: hide images in bottom half (behind video)
    // Top of arc (y < 55%) = visible, bottom (y > 75%) = hidden
    const isInTopHalf = currentAngle >= 180 && currentAngle <= 360 || currentAngle >= 0 && currentAngle <= 0;
    
    // More accurate: use y position for visibility
    const opacity = y < 75 ? 1 : Math.max(0, 1 - (y - 75) / 20);
    
    // Z-index based on y position (lower = in front)
    const zIndex = Math.round(10 - (y / 10));

    return { x, y, tiltAngle, opacity, zIndex };
  };

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

      {/* Rotating Arc Images Container */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {arcImages.map((src, i) => {
            const { x, y, tiltAngle, opacity, zIndex } = getImagePosition(i);
            
            return (
              <motion.div
                key={i}
                className="absolute w-28 sm:w-36 md:w-44 lg:w-52 aspect-square rounded-xl overflow-hidden shadow-elevated"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${tiltAngle}deg)`,
                  opacity,
                  zIndex,
                }}
              >
                <img
                  src={src}
                  alt={`Celebration ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
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
