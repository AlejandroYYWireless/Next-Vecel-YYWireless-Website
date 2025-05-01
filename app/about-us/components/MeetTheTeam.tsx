import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Quote } from "lucide-react";
interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const TeamMemberCard = ({ name, role, image, quote }: TeamMemberCardProps) => {
  // Extract initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and 50px below final position
      whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and final position
      exit={{ opacity: 0, y: -50 }} // When exiting, fade out and move up 50px
      viewport={{
        once: true, // Animation will trigger every time
        amount: 0.1,
        margin: "0px 0px -10% 0px", // Exit animation starts when element is 60% out of viewport
      }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
      }}
    >
      {" "}
      <Card className="w-full max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-bold text-3xl">{name}</h3>
            <Badge variant="outline" className="w-fit mt-1">
              {role}
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex gap-2 items-start">
            <Quote className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
            <p className="text-muted-foreground italic">{quote}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MeetTheTeam = () => {
  // Sample team data
  const teamMembers = [
    {
      name: "Ivan Xiao",
      role: "CEO",
      image: "https://yywireless.com/wp-content/uploads/2023/11/Ivan-Xiao.jpg",
      quote: "Leading the way to a brighter future.",
    },
    {
      name: "Kitty Vang",
      role: "COO",
      image: "https://yywireless.com/wp-content/uploads/2023/11/Kitty-Vang.jpg",
      quote: "Innovation is our core principle.",
    },
    {
      name: "Franky Xiao",
      role: "Director of Repair",
      image:
        "https://yywireless.com/wp-content/uploads/2023/11/Franky-Xiao.jpg",
      quote: "Great design solves real problems.",
    },

    {
      name: "Missy Johnson",
      role: "Accounting Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2023/11/Missy-Johnson.jpg",
      quote: "Connecting people with technology.",
    },
    {
      name: "Maggie Chen",
      role: "Warehouse Manager",
      image: "https://yywireless.com/wp-content/uploads/2023/11/Maggie.jpg",
      quote: "Building relationships that matter.",
    },
    {
      name: "Nick Kalianoff",
      role: "Sales Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2025/01/Nick-Headshot.jpg",
      quote: "Your satisfaction is our priority.",
    },
    {
      name: "Song GongBo",
      role: "Production Manager",
      image: "https://yywireless.com/wp-content/uploads/2024/05/Song.jpg",
      quote: "Empowering your digital experience.",
    },
    {
      name: "Ling Qiu",
      role: "Ecommerce Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2025/01/LingLing-Headshot.jpg",
      quote: "Great design solves real problems.",
    },
    {
      name: "Artish Bhakta",
      role: "Backend Ecommerce Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2025/01/Artish-Headshot-update.jpg",
      quote: "Empowering your digital experience.",
    },

    {
      name: "Melinda Morrill",
      role: "Shipping Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2025/01/Melinda-Headshot-full.jpg",
      quote: "Building relationships that matter.",
    },
    {
      name: "Nick Kalianoff",
      role: "Sales Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2025/01/Nick-Headshot.jpg",
      quote: "Your satisfaction is our priority.",
    },
    {
      name: "Anthony Battillo",
      role: "IT & Innovation Manager",
      image:
        "https://yywireless.com/wp-content/uploads/2023/12/NEW-Anthony-Battillo-Innovation-Manager.jpg",
      quote: "Connecting people with technology.",
    },
  ];

  return (
    <div className="py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
