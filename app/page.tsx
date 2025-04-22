import { HeroBoxReveal } from "./home/components/HeroBoxReveal";
import { HomeCarriers } from "./home/components/HomeCarriers";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeGlobe from "./home/components/HomeGlobe";
import { HomePartners } from "./home/components/HomePartners";
import HomeTextReveal from "./home/components/HomeTextReveal";
import HomeVideo from "./home/components/HomeVideo";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* <HomeSlogan /> */}

      <div className="container mx-auto grid grid-cols-2 gap-4 mt-14 space-x-6 mb-12">
        <HomeVideo />
        <HeroBoxReveal />
      </div>
      <HomeGlobe />
      <div className="container mx-auto grid grid-cols-2 gap-4 space-x-6 place-items-end">
        <HomeTextReveal />
        <HomeCarriers />
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-4 space-x-6">
        <div />
      </div>
      <HomePartners />
      <HomeCertificates />
    </div>
  );
}
