import GlobeSection from "./home/components/GlobeSection";
import { HomeBento } from "./home/components/HomeBento";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeNumbers from "./home/components/HomeNumbers";
import { HomePartners } from "./home/components/HomePartners";
import HomeVideo from "./home/components/HomeVideo";
import QualityAndLense from "./home/components/QualityAndLense";

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-40  overflow-hidden">
      <GlobeSection />
      <HomePartners />
      <div className="grid grid-cols-2  md:grid-cols-2 place-items-center">
        <HomeNumbers />
        <HomeVideo />
      </div>
      <div className="container mx-auto">
        <HomeBento />
      </div>
      <QualityAndLense />
      <HomeCertificates />
    </div>
  );
}
