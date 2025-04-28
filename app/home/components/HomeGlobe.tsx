"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Globe } from "@/components/magicui/globe";
import { WarpBackground } from "@/components/magicui/warp-background";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HomeGlobe = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1068); // 768px is the md breakpoint in Tailwind
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Very subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#6d9654]/20 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <Globe className="top-1/3" />
        </div>
        <div className="mt-10">
          <motion.h1
            className="font-extrabold text-4xl text-center px-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Refurbished Technology Solutions, at Enterprise and Global Scales
          </motion.h1>

          {/* Added motion.p with fade up animation with delay */}
          <motion.p
            className="text-center text-xl mt-12 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          >
            Join us in our mission to make technology accessible to everyone.
          </motion.p>
        </div>
      </div>
    );
  }

  // Desktop view - original layout with WarpBackground
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <WarpBackground
        className="border-none"
        beamsPerSide={0}
        beamDuration={0}
        beamSize={5}
      >
        <div className="h-[600px] relative flex justify-center items-center">
          {/* Word Rotate section moved to be on top of the box content */}
          <div className="absolute z-[51] pointer-events-none flex flex-col items-start left-20 justify-start px-4 w-full max-w-5xl mx-auto">
            {/* Title with Word Rotate */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-6xl font-extrabold">YYWireless is</h3>
              <div className="rounded-3xl dark:shadow-xl dark:bg-background/50 p-2">
                <WordRotate
                  words={[
                    "Global",
                    "Fast",
                    "International",
                    "Scaleable",
                    "Affordable",
                  ]}
                  className="text-7xl font-bold"
                />
              </div>
            </div>

            {/* Box content */}
            <div className="flex flex-col items-start justify-start gap-4">
              <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
                <p className="text-5xl font-semibold mt-[.5rem] bg-black/5 dark:bg-black/80 p-4 rounded-xl">
                  Connecting <span className="text-primary">You</span> with the{" "}
                  <span className="text-primary">World.</span>
                </p>
              </BoxReveal>

              {/* <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <h2 className="mt-[.5rem] text-[1rem] bg-black/5 dark:bg-black/80 p-4 rounded-xl">
                Our services are designed to handle the most{" "}
                <span className="text-primary">demanding</span> to the{" "}
                <span className="text-primary">smallest</span> of requests.
              </h2>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <div className="mt-6 bg-black/5 dark:bg-black/80 p-4 rounded-xl">
                <p>
                  From products to services, we have everything you need to{" "}
                  <span className="font-semibold text-primary">Scale</span>,{" "}
                  <span className="font-semibold text-primary">Innovate</span>,{" "}
                  <span className="font-semibold text-primary">Compete</span>,
                  and <span className="font-semibold text-primary">More</span>.
                </p>
              </div>
            </BoxReveal> */}

              <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
                <Button className="h-14 pointer-events-auto cursor-pointer text-xl mt-[1.6rem] pr-6 bg-primary group">
                  View Our Solutions
                  <ArrowRight className="ml-2 font-bold scale-150 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
              </BoxReveal>
            </div>
          </div>
          <div>
            <Globe />
          </div>
        </div>
      </WarpBackground>
    </motion.div>
  );
};

export default HomeGlobe;
