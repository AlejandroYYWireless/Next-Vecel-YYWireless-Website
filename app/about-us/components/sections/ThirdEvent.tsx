import React from "react";

const ThirdEvent = () => {
  return (
    <section className="content-section h-screen flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-6xl px-12">
        <div className="text-content w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-4">2019</h2>
          <p className="text-lg mb-4">
            Now with momentum and traction, YYWireless expanded yet again to a
            new larger location.
          </p>
          <p className="text-lg">
            With this move, the company grew in size again to 25 employees and
            5,000 square feet, but it was not enough.
          </p>
        </div>
        <div className="image-wrapper w-1/2 flex justify-center">
          <div className="brand-image bg-red-100 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdEvent;
