"use client";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";

interface CertificateCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  isRound?: boolean;
}
// Certificate Card Component
const CertificateCard = ({
  image,
  alt,
  title,
  description,
  isRound = false,
}: CertificateCardProps) => {
  const handleDownload = async () => {
    try {
      // Fetch the image
      const response = await fetch(image);
      const blob = await response.blob();

      // Create a temporary URL to the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.${
        blob.type.split("/")[1]
      }`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="rounded-xl w-full sm:max-w-[250px] md:max-w-[280px] lg:max-w-[300px] flex flex-col justify-between shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
      <div
        className={`relative ${
          isRound
            ? "flex items-center justify-center p-2 sm:p-3 lg:p-4"
            : "w-full h-36 sm:h-40 md:h-44 lg:h-48"
        }`}
      >
        {isRound ? (
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-30 md:h-30 lg:w-32 lg:h-32 relative rounded-full shadow-lg overflow-hidden border-4 border-primary/20">
            <Image
              src={image}
              alt={alt}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-36 sm:h-40 md:h-44 lg:h-48 relative">
            <Image
              src={image}
              alt={alt}
              width={300}
              height={192}
              className="object-contain p-2 sm:p-3 lg:p-4 w-full h-full"
            />
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 lg:p-5 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 lg:mb-4">
          {description}
        </p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
        >
          <DownloadIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Download
        </button>
      </div>
    </div>
  );
};

// Certificate data
const certificatesData = [
  {
    image: "/images/R2.webp",
    alt: "R2 Certificate",
    title: "R2 Certification",
    description:
      "Electronics recycling standard certification for responsible recycling practices and environmental stewardship.",
    isRound: false,
  },
  {
    image: "/images/adisa.jpg",
    alt: "ADISA Certification",
    title: "ADISA Certification",
    description:
      "Asset Disposal and Information Security Alliance certification for secure data destruction and IT asset disposal.",
    isRound: true,
  },
  {
    image: "/images/cert1.webp",
    alt: "Perry Johnson Certificate 1",
    title: "Perry Johnson ISO 9001",
    description:
      "Quality Management System certification ensuring consistent service quality and customer satisfaction.",
    isRound: false,
  },
  {
    image: "/images/cert2.webp",
    alt: "Perry Johnson Certificate 2",
    title: "Perry Johnson ISO 14001",
    description:
      "Environmental Management System certification demonstrating our commitment to environmental responsibility.",
    isRound: false,
  },
];

const HomeCertificates = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      viewport={{
        once: true,
        amount: 0.3,
        margin: "0px 0px -20% 0px",
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-0"
    >
      <div className="flex flex-col items-center justify-start gap-2 sm:gap-3 lg:gap-4">
        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold h-auto sm:h-16 lg:h-20">
            We are fully certified<span className="text-primary">.</span>
          </p>
        </BoxReveal>

        <BoxReveal boxColor={"hsl(var(--primary))"} duration={0.5}>
          <p className="mt-1 sm:mt-2 lg:mt-[.5rem] text-sm sm:text-base lg:text-[1rem] bg-black/5 dark:bg-black/80 p-3 sm:p-4 rounded-lg sm:rounded-xl">
            All of our certifications are up to date, and are as follows Rest
            easy knowing you&apos;re in{" "}
            <span className="text-primary">good care</span> with YYWireless.
          </p>
        </BoxReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3 sm:gap-4 justify-center mt-4 sm:mt-6 lg:mt-8 w-full">
          {certificatesData.map((certificate, index) => (
            <CertificateCard
              key={index}
              image={certificate.image}
              alt={certificate.alt}
              title={certificate.title}
              description={certificate.description}
              isRound={certificate.isRound}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCertificates;
