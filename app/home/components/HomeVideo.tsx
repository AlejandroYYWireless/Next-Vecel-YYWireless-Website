"use client";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import ReactPlayer with no SSR
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const HomeVideo = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Video URLs array
  const videoUrls = [
    "https://videos.pexels.com/video-files/12127275/12127275-hd_1906_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/4284184/4284184-uhd_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/946147/946147-hd_1920_1080_30fps.mp4",
  ];

  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle video end
  const handleEnded = () => {
    // Move to next video in the array
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videoUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Only render the player once we're on the client
  if (!isMounted) {
    return <Skeleton className="w-full h-[400px] rounded-lg" />;
  }

  return (
    <div className="relative  w-full  ">
      {/* Enlarged dot pattern that extends beyond the video boundaries */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: "scale(1.5)",
          top: "40%",
          left: "10%",
          width: "100%",
        }}
      >
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      </div>

      {/* Video positioned to take up most but not all of the container */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl shadow-lg">
        {/* Video player wrapper with overflow hidden to enforce rounded corners */}
        <div className="aspect-video w-full overflow-hidden rounded-3xl">
          <ReactPlayer
            className="react-player"
            url={videoUrls[currentVideoIndex]}
            width="100%"
            height="100%"
            quality="low"
            playing={true}
            controls={true}
            muted={true}
            playsinline={true}
            onEnded={handleEnded}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeVideo;
