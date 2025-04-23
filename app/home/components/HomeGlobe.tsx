"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Globe } from "@/components/magicui/globe";
import { WarpBackground } from "@/components/magicui/warp-background";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";

const HomeGlobe = () => {
  return (
    <WarpBackground>
      <div className="h-[600px] relative flex justify-center items-center">
        {/* Word Rotate section moved to be on top of the box content */}
        <div className="absolute z-50 pointer-events-none flex flex-col items-start left-20 justify-start px-4 w-full max-w-5xl mx-auto">
          {/* Title with Word Rotate */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-6xl font-extrabold font-mokoto">
              YYWireless is
            </h3>
            <div className="rounded-3xl font-mokoto dark:shadow-xl dark:bg-background/50 p-2">
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
              <p className="text-5xl font-mokoto font-semibold">
                Service to scale<span className="text-primary">.</span>
              </p>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
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
                  <span className="font-semibold text-primary">Compete</span> ,
                  and <span className="font-semibold text-primary">More</span>
                  . <br />
                </p>
              </div>
            </BoxReveal>

            <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
              <Button className="mt-[1.6rem] bg-primary">
                Learn about our products & pricing
              </Button>
            </BoxReveal>
          </div>
        </div>
        <div>
          <Globe />
        </div>
      </div>
    </WarpBackground>
  );
};

export default HomeGlobe;
