import { HomeBento } from "./home/components/HomeBento";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeNumbers from "./home/components/HomeNumbers";
import { HomePartners } from "./home/components/HomePartners";
import QualityAndLense from "./home/components/QualityAndLense";
import YYGlobe from "./home/components/globe/YYGlobe";

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-48 scrollbar-hide">
      <YYGlobe />
      <HomePartners />
      <div>
        <HomeNumbers />
      </div>
      <div className="container mx-auto">
        <HomeBento />
      </div>
      <QualityAndLense />
      <HomeCertificates />
    </div>
  );
}
