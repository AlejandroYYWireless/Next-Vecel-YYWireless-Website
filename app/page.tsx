import HomeCertificates from "./home/components/HomeCertificates";
import { MarqueeDemo } from "./home/components/HomePartners";
import HomeSlogan from "./home/components/HomeSlogan";
import HomeVideo from "./home/components/HomeVideo";

export default function Home() {
  return (
    <div className="space-y-6">
      <HomeSlogan />
      <HomeVideo />
      <HomeCertificates />
      <MarqueeDemo />
    </div>
  );
}
