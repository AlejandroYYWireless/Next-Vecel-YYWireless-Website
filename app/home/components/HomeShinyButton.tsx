"use client";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
const HomeShinyButton = () => {
  const [isMobile, setIsMobile] = useState(false);

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
  const handleClick = () => {
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  };
  if (isMobile) {
    return null;
  }

  return (
    <ShinyButton
      onClick={handleClick}
      className="p-6 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <ArrowDown />
    </ShinyButton>
  );
};

export default HomeShinyButton;
