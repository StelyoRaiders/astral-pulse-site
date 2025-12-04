import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ImageCarousel from "@/components/ImageCarousel";
import ServerStatus from "@/components/ServerStatus";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import Rules from "@/components/Rules";
import ChristmasEffects, { ChristmasSectionWrapper } from "@/components/ChristmasEffects";
import ScrollToTop from "@/components/ScrollToTop";
import { ENABLE_CHRISTMAS } from "@/config/featureFlags";

const Index = () => {
  const SectionWrap = ENABLE_CHRISTMAS ? ChristmasSectionWrapper : Fragment;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <AnimatedBackground />
      {ENABLE_CHRISTMAS && <ChristmasEffects />}
      <Navbar />
      <SectionWrap>
        <Hero />
      </SectionWrap>
      <SectionWrap>
        <ServerStatus />
      </SectionWrap>
      <SectionWrap>
        <Features />
      </SectionWrap>
      <SectionWrap>
        <ImageCarousel />
      </SectionWrap>
      <SectionWrap>
        <Rules />
      </SectionWrap>
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
