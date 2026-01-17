import { Play } from "lucide-react";
import panoramaHero from "@/assets/panorama-hero.jpg";

const VideoSection = () => {
  return (
    <section className="relative z-10 w-full bg-background">
      <div className="relative w-full aspect-video max-h-[80vh]">
        {/* Parade thumbnail image */}
        <img
          src={panoramaHero}
          alt="Parade celebration in the sky"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="group w-20 h-20 md:w-24 md:h-24 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-elevated transition-transform duration-300 hover:scale-110">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
