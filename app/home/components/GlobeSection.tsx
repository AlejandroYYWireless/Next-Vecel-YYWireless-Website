import React from "react";
import { GlobeHeroText } from "./GlobeHeroText";
import { ModelViewer } from "@/app/about-us/components/3d/ModelViewer";
import { WarpBackground } from "@/components/magicui/warp-background";

const GlobeSection = () => {
  return (
    <WarpBackground className="border-none">
      <div className="mx-auto grid grid-cols-2 dark:bg-black/50 bg-background/90 overflow-hidden min-h-[600px] p-12 rounded-[50px] shadow-2xl container mt-14">
        <GlobeHeroText />
        <ModelViewer />
      </div>
    </WarpBackground>
  );
};

export default GlobeSection;
