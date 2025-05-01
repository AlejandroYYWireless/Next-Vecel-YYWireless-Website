"use client";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { motion } from "motion/react";
// Reusable StatItem component
interface StatItemProps {
  pretext: string;
  value: number;
  posttext: string;
}

const StatItem = ({ pretext, value, posttext }: StatItemProps) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
      <p className="text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-4xl">
        {pretext}
      </p>
      <NumberTicker
        value={value}
        className="whitespace-pre-wrap font-medium tracking-tighter text-gray-100 text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
      />
      <p className="text-gray-700 text-base sm:text-xl md:text-2xl lg:text-4xl">
        {posttext}
      </p>
    </div>
  );
};

const HomeNumbers = () => {
  const stats = [
    { pretext: "Over", value: 500, posttext: "Clients" },
    { pretext: "Over", value: 23000, posttext: "Sq/ft Warehouse" },
    { pretext: "Over", value: 2000000, posttext: "Packages Shipped" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and 50px below final position
      whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and final position
      exit={{ opacity: 0, y: -50 }} // When exiting, fade out and move up 50px
      viewport={{
        once: true, // Animation will trigger every time
        amount: 0.1, // Triggers when 30% in view for entering
        margin: "0px 0px -20% 0px", // Exit animation starts when element is 60% out of viewport
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
      className="flex flex-col items-start md:items-center"
    >
      <div className="space-y-12 flex flex-col justify-end items-end text-end sm:space-y-16 md:space-y-20 lg:space-y-24">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            pretext={stat.pretext}
            value={stat.value}
            posttext={stat.posttext}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HomeNumbers;
