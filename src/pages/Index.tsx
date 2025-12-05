import { Fragment, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ENABLE_CHRISTMAS } from "@/config/featureFlags";

// Lazy load componentes que no son críticos para el primer render
const Features = lazy(() => import("@/components/Features"));
const ImageCarousel = lazy(() => import("@/components/ImageCarousel"));
const ServerStatus = lazy(() => import("@/components/ServerStatus"));
const Footer = lazy(() => import("@/components/Footer"));
const Rules = lazy(() => import("@/components/Rules"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const ChristmasEffects = lazy(() => 
  import("@/components/ChristmasEffects").then(mod => ({ 
    default: mod.ChristmasSectionWrapper 
  }))
);

// Componente de fallback mínimo para evitar layout shift
const SectionFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <AnimatedBackground />
      <Navbar />
      {ENABLE_CHRISTMAS ? (
        <Suspense fallback={<Hero />}>
          <ChristmasEffects>
            <Hero />
          </ChristmasEffects>
        </Suspense>
      ) : (
        <Hero />
      )}
      <Suspense fallback={<SectionFallback />}>
        <ServerStatus />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ImageCarousel />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Rules />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        {ENABLE_CHRISTMAS ? (
          <ChristmasEffects>
            <Footer />
          </ChristmasEffects>
        ) : (
          <Footer />
        )}
      </Suspense>
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </main>
  );
};

export default Index;
