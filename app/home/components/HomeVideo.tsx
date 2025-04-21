"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

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
    return <Skeleton className="w-full h-screen" />;
  }

  return (
    <div className="player-wrapper relative">
      {/* Video player */}
      <ReactPlayer
        className="react-player"
        url={videoUrls[currentVideoIndex]}
        width="100%"
        height="100%"
        playing={true}
        controls={true}
        muted={true}
        playsinline={true}
        onEnded={handleEnded}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />

      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold mb-4">
          Our headline here
        </h1>
        <p className="text-white text-xl max-w-lg text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
          voluptate ullam voluptatem quos qui, quia, eius nesciunt natus quo
          dolor reiciendis quod rem aliquam reprehenderit. Ipsa, quis explicabo.
          Ipsa, dolorem.
        </p>
      </div>
    </div>
  );
};

export default HomeVideo;
