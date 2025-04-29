import { HomeBento } from "./home/components/HomeBento";
import HomeCertificates from "./home/components/HomeCertificates";
import HomeNumbers from "./home/components/HomeNumbers";
import { HomePartners } from "./home/components/HomePartners";
import HomeShinyButton from "./home/components/HomeShinyButton";
import QualityAndLense from "./home/components/QualityAndLense";

export default function Home() {
  return (
    <div className="space-y-24 md:space-y-48 scrollbar-hide">
      <div className="relative">
        <div className="absolute left-1/2 bottom-[-110px]">
          <HomeShinyButton />
        </div>
      </div>
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
