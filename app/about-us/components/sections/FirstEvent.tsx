const FirstEvent = () => {
  return (
    <section className="content-section h-screen flex items-center justify-center relative">
      <div className="flex items-center justify-between w-full max-w-6xl px-12">
        <div className="text-content w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-4">2009</h2>
          <p className="text-lg mb-4">
            Founded in 2009, YYWireless started as a humble 1-man operation in a
            basement.
          </p>
          <p className="text-lg">
            Proving the power of innovation and determination, YYWireless set
            its roots in refurbished electronics industry.
          </p>
        </div>
        <div className="image-wrapper w-1/2 flex justify-center">
          <div className="brand-image bg-blue-600 w-[400px] h-[300px] rounded-lg flex items-center justify-center p-8">
            <img
              src="https://plus.unsplash.com/premium_photo-1734549547989-805c0885dd9c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstEvent;
