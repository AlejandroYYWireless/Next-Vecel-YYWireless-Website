"use client";

import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/utils";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import Image from "next/image";

const reviews = [
  {
    name: "Carlos Barba",
    body: "I have been purchasing merchandise from you for more than three years, and I must say, I am very satisfied with the service provided. The prompt resolution of issues and excellent customer service stand out, along with your user-friendly website.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Sandeep",
    body: "I have been a loyal customer of YYWireless for over a decade. During this time, I have observed their impressive growth in operations and logistics. The team is exceptionally professional and shows a deep understanding of customer challenges and issues. Any occasional issues are resolved swiftly. I highly recommend them.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "John",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "DNCL Techzone.",
    body: "YYWireless reigns supreme in the wireless industry, offering an unparalleled variety of mobile devices at the most competitive prices for both retail and wholesale. I have collaborated with Ivan and his team for over five years. They have provided me with tremendous support, and we are committed to continuing and strengthening our relationship.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
];

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string;
  name: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-fit min-w-[250px] md:max-w-[400px] cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={`${name}'s avatar`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const colors = ["#98FB98", "#a3ff1a", "#90EE90", "#8DC63F", "#369C2A"];

export function HomePartners() {
  return (
    <div className="flex justify-center flex-col items-center space-y-12 mt-6 ">
      <h2 className="text-7xl font-semibold font-mokoto">
        What{" "}
        <AuroraText colors={colors} className="font-bold">
          Others
        </AuroraText>{" "}
        say about us
      </h2>
      <Marquee
        fade={true}
        direction="left"
        pauseOnHover={true}
        className="h-full w-[800px]"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
