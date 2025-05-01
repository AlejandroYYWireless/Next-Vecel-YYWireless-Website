"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

interface CompanyLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const CompanyLogo = ({
  width = 80,
  height = 80,
  className = "",
}: CompanyLogoProps) => {
  const theme = useTheme();
  const isDarkmode =
    theme.theme === "dark" ||
    (theme.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const logo = isDarkmode
    ? "/images/logolargedark.png"
    : "/images/logolarge.png";
  return (
    <div className={className}>
      <Image
        alt="An image of the company's logo, YYWireless, its an image of a globe and text light grey and green"
        height={height}
        width={width}
        src={logo}
        style={{
          height: "auto",
          width: "auto",
          maxHeight: height,
          maxWidth: width,
        }}
      />
    </div>
  );
};

export default CompanyLogo;
