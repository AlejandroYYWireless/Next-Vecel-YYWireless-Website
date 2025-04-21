import React from "react";
import Image from "next/image";

const HomeCertificates = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Certifications
        </h2>

        <div className="flex flex-wrap md:flex-nowrap overflow-x-auto gap-6 pb-4 items-center justify-center">
          {/* Main certificate */}
          <div className="flex-shrink-0 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative w-96 h-48 md:w-96 md:h-56">
              <Image
                src="/images/r2.webp"
                alt="Main Certificate"
                fill
                className="object-cover p-6"
              />
            </div>
          </div>

          {/* Certificate 1 */}
          <div className="flex-shrink-0 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative w-48 h-64 md:w-56 md:h-72">
              <Image
                src="/images/cert1.webp"
                alt="Professional Certificate"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Certificate 2 */}
          <div className="flex-shrink-0 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative w-48 h-64 md:w-56 md:h-72">
              <Image
                src="/images/cert2.webp"
                alt="Industry Certificate"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Profile/Badge */}
          <div className="flex-shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 relative rounded-full shadow-md overflow-hidden border-2 border-white transition-all duration-300 hover:shadow-lg">
              <Image
                src="/images/adisa.jpg"
                alt="Professional Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCertificates;
