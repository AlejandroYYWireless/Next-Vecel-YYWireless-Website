"use client";
import { motion } from "framer-motion";
import { HeroBoxReveal } from "./HeroBoxReveal";
import { HomeLens } from "./HomeLens";

const QualityAndLense = () => {
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
      className="relative flex items-start justify-center gap-20"
    >
      <HeroBoxReveal />
      <HomeLens />
    </motion.div>
  );
};

export default QualityAndLense;
