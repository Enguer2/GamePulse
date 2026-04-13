import MosaicBackground  from "@/components/mosaicbackground";
import Navbar            from "@/components/navbar";
import HeroSection       from "@/components/herooesection";
import FeatureCards      from "@/components/featurecards";
import InsightsSection   from "@/components/insightssection"; // in coming
import Footer            from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative pt-24 min-h-screen flex flex-col items-center">
        <MosaicBackground />
        <HeroSection />
        <FeatureCards />
      </main>

      <Footer />
    </>
  );
}