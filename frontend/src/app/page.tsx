import MosaicBackground  from "@/components/mosaicbackground";
import Navbar            from "@/components/navbar";
import HeroSection       from "@/components/herooesection"; // Remarque l'orthographe exacte du fichier avec "oo"
import FeatureCards      from "@/components/featurecards";
import InsightsSection   from "@/components/insightssection";
import Footer            from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative pt-24 min-h-screen flex flex-col items-center">
        <MosaicBackground />
        <HeroSection />
        <FeatureCards />
        <InsightsSection />
      </main>

      <Footer />
    </>
  );
}