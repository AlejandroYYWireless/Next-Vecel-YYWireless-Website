"use client";
import { Globe } from "@/components/magicui/globe";
import { WarpBackground } from "@/components/magicui/warp-background";
import { WordRotate } from "@/components/magicui/word-rotate";

const HomeGlobe = () => {
  return (
    <WarpBackground>
      <div className="h-[600px] relative flex justify-center items-center">
        <div className="absolute z-50 flex items-center justify-start pl-4 w-full align-baseline gap-4">
          <h3 className="text-6xl font-extrabold">We ship</h3>
          <WordRotate
            words={["World-Wide", "Fast", "International", "Affordable"]}
            className="text-7xl font-bold"
          />
        </div>
        <div>
          <Globe />
        </div>
      </div>
    </WarpBackground>
  );
};

export default HomeGlobe;
