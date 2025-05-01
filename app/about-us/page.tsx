"use client";

import { useRef, useState } from "react";
import FirstEvent from "./components/sections/FirstEvent";
import SecondEvent from "./components/sections/SecondEvent";
import ThirdEvent from "./components/sections/ThirdEvent";
import FourthEvent from "./components/sections/FourthEvent";
import { useScrollAnimationController } from "./components/utils/ScrollAnimationController";
import Header from "./components/Header";
import HeaderPhoto from "./HeaderPhoto";
import { TextAnimate } from "@/components/magicui/text-animate";
import { BoxReveal } from "@/components/magicui/box-reveal";
import PlayButton from "./components/utils/PlayButton";
import MeetTheTeam from "./components/MeetTheTeam";
import { ArrowDown } from "lucide-react";

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
      <section className="mx-auto mt-8 container items-center justify-center flex gap-20">
        <Header />
        <HeaderPhoto />
      </section>
      <section
        id="about-us-section-0"
        className="intro-section mt-24 flex items-center justify-center text-center"
      >
        <BoxReveal duration={0.5} boxColor={"hsl(var(--primary))"}>
          <div className="flex space-y-8 flex-col items-center justify-center">
            <TextAnimate className="text-6xl h-24 text-center font-bold">
              See our Journey
            </TextAnimate>
            <ArrowDown className="h-20 text-primary w-20 animate-bounce" />
          </div>
        </BoxReveal>
      </section>

      {/* Play button is now positioned fixed via GSAP, so it can be placed anywhere in the DOM */}
      <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} />

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
        className="outro-section p-4 flex flex-col items-center justify-center bg-primary text-white"
      >
        <div className="bg-black/50 backdrop-blur-sm p-4 w-[90vw] text-center rounded-2xl">
          <TextAnimate className="text-6xl font-bold">
            Meet the team
          </TextAnimate>
          <MeetTheTeam />
        </div>
      </section>
    </main>
  );
}
