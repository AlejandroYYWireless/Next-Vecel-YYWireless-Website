"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import FirstEvent from "./components/sections/FirstEvent";
import SecondEvent from "./components/sections/SecondEvent";
import ThirdEvent from "./components/sections/ThirdEvent";
import FourthEvent from "./components/sections/FourthEvent";
import { useScrollAnimationController } from "./components/utils/ScrollAnimationController";
import LandingSection from "./components/sections/LandingSection";

export default function Page() {
  const container = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { togglePlay } = useScrollAnimationController({
    container,
    isPlaying,
    setIsPlaying,
  });

  return (
    <main className="relative">
      {/* Intro Section */}
      <section id="about-us-section-0" className="intro-section h-[300px] ">
        <LandingSection />
      </section>

      {/* Animation Container */}
      <div ref={container}>
        <div id="about-us-section-1">
          <FirstEvent />
        </div>
        <div id="about-us-section-2">
          <SecondEvent />
        </div>
        <div id="about-us-section-3">
          <ThirdEvent />
        </div>
        <div id="about-us-section-4">
          <FourthEvent />
        </div>
      </div>

      {/* Outro Section */}
      <section
        id="about-us-section-5"
        className="outro-section h-screen flex items-center justify-center bg-orange-500 text-white"
      >
        <h1 className="text-4xl font-bold">The Future Awaits</h1>
      </section>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2 z-50 transition-all duration-300"
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </main>
  );
}
