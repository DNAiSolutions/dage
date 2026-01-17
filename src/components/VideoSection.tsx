const VideoSection = () => {
  return (
    <section className="relative w-full bg-background py-0">
      <div className="w-full aspect-video max-h-[80vh]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Krewe of D.A.G.E. Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoSection;
