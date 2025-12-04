import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ImageCarousel from "@/components/ImageCarousel";
import ServerStatus from "@/components/ServerStatus";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <ServerStatus />
      <Features />
      <ImageCarousel />
      <Footer />
    </main>
  );
};

export default Index;