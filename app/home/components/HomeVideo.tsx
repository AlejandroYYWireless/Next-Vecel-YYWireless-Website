"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

const HomeVideo = () => {
  const [isMounted, setIsMounted] = useState(false);
  // Set isMounted to true when component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render the player once we're on the client
  if (!isMounted) {
    return <Skeleton className="w-full h-screen" />;
  }

  return (
    <div className="relative flex justify-center items-center  w-full">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://videos.pexels.com/video-files/946147/946147-hd_1920_1080_30fps.mp4"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://videos.pexels.com/video-files/946147/946147-hd_1920_1080_30fps.mp4"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
};

export default HomeVideo;
