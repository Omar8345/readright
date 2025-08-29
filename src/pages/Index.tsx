import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { InputSection } from "@/components/InputSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <InputSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
};

export default Index;
