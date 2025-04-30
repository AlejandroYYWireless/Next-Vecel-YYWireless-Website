import React from "react";
import { ModelViewer } from "../3d/ModelViewer";

const LandingSection = () => {
  return (
    <div>
      // Full viewport height
      <ModelViewer modelPath="/models/iphone.glb" height="100vh" />
    </div>
  );
};

export default LandingSection;
