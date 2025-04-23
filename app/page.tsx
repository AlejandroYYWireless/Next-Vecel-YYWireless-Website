import { HeroBoxReveal } from "./home/components/HeroBoxReveal";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeCertificatesCarousel from "./home/components/HomeCertificatesCarousel";
import { HomePartners } from "./home/components/HomePartners";
import HomeSlogan from "./home/components/HomeSlogan";
import HomeVideo from "./home/components/HomeVideo";

export default function Home() {
  return (
    <div>
      <HomeSlogan />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-14 space-x-6 mb-12">
        <HomeVideo />
        <HeroBoxReveal />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[200px]">
        <div className="place-self-end">
          <HomeCertificates />
        </div>
        <div className="place-self-start">
          <HomeCertificatesCarousel />
        </div>
      </div>
      <HomePartners />
    </div>
  );
}
