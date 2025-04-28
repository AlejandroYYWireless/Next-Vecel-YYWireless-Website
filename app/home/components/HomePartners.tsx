"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { motion } from "framer-motion";
import Image from "next/image";

const brandImages = [
  "/images/brands/UPS.png",
  "/images/brands/Amazon.png",
  "/images/brands/Walmart.png",
  "/images/brands/eBay.png",
  "/images/brands/PhoneCheck.png",
  "/images/brands/Reebelo.png",
  "/images/brands/ATT.png",
  "/images/brands/TMobile.png",
  "/images/brands/USPS.png",
  "/images/brands/FedEx.png",
];

const BrandCard = ({ img }: { img: string }) => {
  // Extract brand name from the path for alt text
  const brandName = img.split("/").pop()?.split(".")[0] || "Brand";

  return (
    <figure
      className={cn(
        "relative flex items-center justify-center h-24 min-w-[180px] select-none max-w-[250px] mx-2 cursor-default overflow-hidden rounded-xl bg-slate-100 dark:bg-white p-2"
      )}
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image
          className="object-contain max-h-full"
          width={160}
          height={80}
          alt={`${brandName} logo`}
          src={img}
        />
      </div>
    </figure>
  );
};

const colors = ["#98FB98", "#a3ff1a", "#90EE90", "#00b3ff", "#87CEFA"];

export function HomePartners() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and 50px below final position
      whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and final position
      exit={{ opacity: 0, y: -50 }} // When exiting, fade out and move up 50px
      viewport={{
        once: true, // Animation will trigger every time
        amount: 0.3, // Triggers when 30% in view for entering
        margin: "0px 0px -20% 0px", // Exit animation starts when element is 60% out of viewport
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="flex justify-center flex-col items-center space-y-12 mt-6 px-4"
    >
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-center">
        Our{" "}
        <AuroraText colors={colors} className="font-bold">
          Partners
        </AuroraText>{" "}
      </h2>
      <Marquee fade={true} direction="left" className="h-full w-full max-w-7xl">
        {brandImages.map((brand) => (
          <BrandCard key={brand} img={brand} />
        ))}
      </Marquee>
    </motion.div>
  );
}
