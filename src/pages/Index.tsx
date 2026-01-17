import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import ProgramsSection from "@/components/ProgramsSection";
import StatsSection from "@/components/StatsSection";
import MissionSection from "@/components/MissionSection";
import EventsSection from "@/components/EventsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <StatsSection />
        <ProgramsSection />
        <MissionSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
