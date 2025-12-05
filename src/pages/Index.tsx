import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ImageCarousel from "@/components/ImageCarousel";
import ServerStatus from "@/components/ServerStatus";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Rules from "@/components/Rules";
import { ChristmasSectionWrapper } from "@/components/ChristmasEffects";
import ScrollToTop from "@/components/ScrollToTop";
import { ENABLE_CHRISTMAS } from "@/config/featureFlags";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />
      {ENABLE_CHRISTMAS ? (
        <ChristmasSectionWrapper>
          <Hero />
        </ChristmasSectionWrapper>
      ) : (
        <Hero />
      )}
      <ServerStatus />
      <Features />
      <ImageCarousel />
      <Rules />
      {ENABLE_CHRISTMAS ? (
        <ChristmasSectionWrapper>
          <Footer />
        </ChristmasSectionWrapper>
      ) : (
        <Footer />
      )}
      <ScrollToTop />
    </main>
  );
};

export default Index;
