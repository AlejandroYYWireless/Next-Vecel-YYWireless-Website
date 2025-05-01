import React from "react";

const FourthEvent = () => {
  return (
    <section className="content-section h-screen flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-6xl px-12">
        <div className="text-content w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-4">2023 to Present</h2>
          <p className="text-lg mb-4">
            Powering through the pandemic, YYWireless expanded yet again to a
            warehouse as its new center of operations.
          </p>
          <p className="text-lg">
            With a new location and plenty of space, the company grew from 25 to
            50, to 75 and is is currently over 100 employees with 10 departments
            9 managers, and a growth rate of over 25% year over year.
          </p>
        </div>
        <div className="image-wrapper w-1/2 flex justify-center">
          <div className="brand-image bg-blue-600 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1501324682324-0d8d7c4b9706?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthEvent;
