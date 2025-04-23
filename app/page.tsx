import { HeroBoxReveal } from "./home/components/HeroBoxReveal";
import { HomeCarriers } from "./home/components/HomeCarriers";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeCertificatesCarousel from "./home/components/HomeCertificatesCarousel";
import { HomePartners } from "./home/components/HomePartners";
import HomeSlogan from "./home/components/HomeSlogan";
import HomeTextReveal from "./home/components/HomeTextReveal";
import HomeVideo from "./home/components/HomeVideo";

export default function Home() {
  return (
    <div className="space-y-6">
      <HomeSlogan />

      <div className="container mx-auto grid grid-cols-2 gap-4 mt-14 space-x-6 mb-12">
        <HomeVideo />
        <HeroBoxReveal />
      </div>
      <div className="flex items-center justify-center">
        <HomeCertificates />
        <HomeCertificatesCarousel />
      </div>
      <HomePartners />
    </div>
  );
}
