import React from "react";
import YYGlobe from "./globe/YYGlobe";
import { GlobeHeroText } from "./GlobeHeroText";

const GlobeSection = () => {
  return (
    <div className="mx-auto dark:bg-black/50 overflow-hidden min-h-[600px] p-12 rounded-[50px] shadow-2xl container mt-14">
      <GlobeHeroText />
      <div className="absolute inset-0 left-[400px] h-[800px] overflow-clip">
        <YYGlobe height="400px" radius={0.8} rotationSpeed={0.003} />
      </div>
    </div>
  );
};

export default GlobeSection;
