/* eslint-disable @next/next/no-img-element */

"use client";
import { Lens } from "@/components/magicui/lens";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function HomeLens() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Stock data for the carousel
  const stockData = [
    {
      title: "A/H Stock",
      description:
        "Our H Stock inventory has no visible damage, nearly mint condition.",
      image:
        "https://images.unsplash.com/photo-1598327106026-d9521da673d1?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "B/M Stock",
      description: "Some scratches or scuffs throughout the device.",
      image:
        "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "C/L Stock",
      description:
        "Expect to see many scuffs or scratches, still completely usable.",
      image:
        "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Function to navigate to next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === stockData.length - 1 ? 0 : prev + 1));
  };

  // Function to navigate to previous slide
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? stockData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1068) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <Card
      className="relative max-w-md shadow-none rounded-3xl p-0 bg-transparent border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="px-0 dark:p-2 rounded-3xl w-[400px]">
        <CardTitle className="text-2xl py-2">
          {stockData[activeSlide].title}
        </CardTitle>
        <CardDescription>{stockData[activeSlide].description}</CardDescription>
      </CardHeader>
      <CardContent className="relative shadow-lg w-[400px] p-0 space-y-0 rounded-3xl">
        <div
          className={`absolute inset-0 rounded-3xl flex items-center pointer-events-none justify-center bg-black bg-opacity-60 z-[30] transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <TextAnimate className="text-white text-xl font-medium">
            Hover me
          </TextAnimate>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-2 z-40">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/40 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-2 z-40">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/40 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
          {stockData.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                activeSlide === index ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>

        <Lens
          zoomFactor={2}
          lensSize={150}
          isStatic={false}
          ariaLabel="Zoom Area"
        >
          <div className="w-full h-[500px] overflow-hidden">
            <img
              src={stockData[activeSlide].image}
              alt={`${stockData[activeSlide].title} image`}
              width={500}
              height={500}
              className="h-full object-cover"
            />
          </div>
        </Lens>
      </CardContent>
    </Card>
  );
}
