import React from "react";
import { ModelViewer } from "../3d/ModelViewer";

const Render3DDisplay = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left side: Text content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold">iPhone 15 Pro</h3>
            <p className="text-gray-700">
              Experience the next generation of smartphone technology with our
              latest model. Advanced camera system, powerful performance, and
              sleek design come together to create an unparalleled user
              experience.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Advanced Camera System</h4>
                  <p className="text-sm text-gray-600">
                    Capture stunning photos and videos with our most advanced
                    camera system yet.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium">All-Day Battery Life</h4>
                  <p className="text-sm text-gray-600">
                    Stay powered throughout your day with our most efficient
                    battery performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Titanium Design</h4>
                  <p className="text-sm text-gray-600">
                    Featuring our strongest and lightest materials for
                    durability and premium feel.
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>

          {/* Right side: Containerized 3D Model */}
          <div className="w-full lg:w-1/2 h-[500px] border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white">
            <ModelViewer modelPath="/models/iphone.glb" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Render3DDisplay;
