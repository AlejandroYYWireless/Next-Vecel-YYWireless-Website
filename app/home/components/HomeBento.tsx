"use client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Clock, Smile, TruckIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@devnomic/marquee";
import { AnimatedBeamMultipleOutputDemo } from "./AnimatedBeamMultiple";
const files = [
  {
    name: "Carlos Barba",
    body: "I have been purchasing merchandise from you for more than three years, and I must say, I am very satisfied with the service provided.",
  },
  {
    name: "Sandeep X",
    body: "I have been a loyal customer of YYWireless for over a decade. During this time, I have observed their impressive growth in operations and logistics. I highly recommend them.",
  },
  {
    name: "DNCL Techzone",
    body: "YYWireless reigns supreme in the wireless industry, offering an unparalleled variety of mobile devices at the most competitive prices for both retail and wholesale.",
  },

  {
    name: "Sandeep X",
    body: "The team is exceptionally professional and shows a deep understanding of customer challenges and issues. Any occasional issues are resolved swiftly.",
  },
  {
    name: "DNCL Techzone",
    body: "I have collaborated with Ivan and his team for over five years. They have provided me with tremendous support, and we are committed to continuing and strengthening our relationship.",
  },
];

const features = [
  {
    Icon: Smile,
    name: "Clients first",
    description:
      "We strongly believe a strong relationship with our clients is the lifeline of good business.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        fade={true}
        direction="left"
        className="h-full w-[800px] absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-48 h-fit cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: TruckIcon,
    name: "Couriers Support",
    description:
      "YYWireless supports all major couriers, USPS, UPS, DHL, FedEx, and FedEx Express.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: Clock,
    name: "24/7 Support",
    description:
      "We provide around the clock support for clients in all regions of the world.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <img
        src="/images/chatbubble.webp"
        className="absolute right-4 bottom-10 w-64 h-auto object-contain transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-95"
      />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Fast Delivery",
    description: "We stick to our 2-day delivery no exceptions.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-14 top-10 origin-top scale-95 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
];

export function HomeBento() {
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
    >
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </motion.div>
  );
}
