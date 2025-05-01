"use client";

import { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PlayButtonProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function PlayButton({ isPlaying, togglePlay }: PlayButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (!buttonRef.current) return;

    // Initial button state - centered at bottom
    const initialX = window.innerWidth / 2 - 32; // Half screen width minus half button width
    const targetX = window.innerWidth - 160; // Right position with margin

    // Set initial position with exact pixels
    gsap.set(buttonRef.current, {
      position: "fixed",
      bottom: "2rem",
      left: initialX + "px",
      scale: 1.5,
      zIndex: 50,
      opacity: 0, // Start hidden
    });

    // Show the button after positioning
    setTimeout(() => {
      if (!buttonRef.current) return;
      gsap.to(buttonRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    }, 100);

    // Create horizontal movement animation
    const horizontalTween = gsap.to(buttonRef.current, {
      left: targetX + "px",
      scale: 1.8,
      ease: "power1.inOut",
      paused: true, // Initially paused
    });

    // Create rotation animation (720 degrees = 2 full rotations)
    const rotationTween = gsap.to(buttonRef.current, {
      rotation: 720,
      ease: "power1.inOut",
      paused: true, // Initially paused
    });

    // Create ScrollTrigger to control both animations
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "top+=800 top",
      scrub: 0.5,
      onUpdate: (self) => {
        // Update both animations based on scroll progress
        horizontalTween.progress(self.progress);
        rotationTween.progress(self.progress);
      },
    });

    // Handle window resize
    const handleResize = () => {
      if (!buttonRef.current) return;

      const newInitialX = window.innerWidth / 2 - 32;
      const newTargetX = window.innerWidth - 160;

      // Get current progress
      const triggers = ScrollTrigger.getAll();
      const progress = triggers.length > 0 ? triggers[0].progress : 0;

      // Update tween end position
      horizontalTween.vars.left = newTargetX + "px";
      horizontalTween.invalidate(); // Refresh the tween

      // If not scrolled, reset start position
      if (progress === 0) {
        gsap.set(buttonRef.current, {
          left: newInitialX + "px",
        });
      } else {
        // Update current position based on progress
        horizontalTween.progress(progress);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      horizontalTween.kill();
      rotationTween.kill();
    };
  }, []);

  return (
    <Button
      ref={buttonRef}
      onClick={togglePlay}
      className="rounded-full shadow-xl flex items-center justify-center w-16 h-16 opacity-0"
    >
      {isPlaying ? <Pause size={32} /> : <Play size={32} />}
    </Button>
  );
}
