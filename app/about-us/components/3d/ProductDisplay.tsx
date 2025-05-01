"use client";

import { ModelViewer } from "./ModelViewer"; // Import your existing ModelViewer component

export default function ProductDisplay() {
  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-12 px-4 gap-8">
      {/* Left side: Text content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Product Title</h2>
        <p className="text-gray-700 mb-6">
          This is where you can add a detailed description of your product.
          Highlight key features, specifications, and benefits. The 3D model on
          the right allows users to interact with your product from all angles.
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
            Feature one with detailed explanation
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
            Feature two with detailed explanation
          </li>
          <li className="flex items-center">
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
            Feature three with detailed explanation
          </li>
        </ul>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg self-start hover:bg-blue-700 transition-colors">
          Learn More
        </button>
      </div>

      {/* Right side: 3D Model Viewer in a fixed container */}
      <div className="w-full md:w-1/2 h-[500px] border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <ModelViewer modelPath="/models/iphone.glb" height="100%" />
      </div>
    </div>
  );
}
