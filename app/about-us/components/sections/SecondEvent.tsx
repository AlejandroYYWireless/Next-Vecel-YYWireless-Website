import React from "react";

const SecondEvent = () => {
  return (
    <section className="content-section h-screen flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-6xl px-12">
        <div className="text-content w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-4">2013</h2>
          <p className="text-lg mb-4">
            With growth in mind, YYWireless expanded to its first office.
          </p>
          <p className="text-lg">
            Growing the company from a 1 man operation to 5 employees,
            YYWireless focused on making a name for itself in the refurbished
            technology market.
          </p>
        </div>
        <div className="image-wrapper w-1/2 flex justify-center">
          <div className="brand-image bg-primary w-[400px] h-[300px] rounded-3xl flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1610320022580-5295faad847c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondEvent;
