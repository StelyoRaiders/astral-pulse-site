import { useEffect, useState } from "react";
import { ChevronDown, Copy, Users, Zap } from "lucide-react";
import SantaOverlay from "./SantaOverlay";
import { ENABLE_CHRISTMAS } from "@/config/featureFlags";
import { toast } from "@/hooks/use-toast";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText("play.oasisrp.es:30120");
    toast({
      title: "IP Copiada!",
      description: "La IP del servidor ha sido copiada al portapapeles",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Aquí puedes poner tu video - actualmente usa un video de ejemplo */}
          <source
            src="/video.mp4"
            type="video/mp4"
          />
          {/* Agrega más formatos para mejor compatibilidad */}
          <source
            src="/video.webm"
            type="video/webm"
          />
        </video>
        {/* Overlays para oscurecer el video */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-1/4 w-2 h-2 bg-secondary rounded-full animate-float-slow opacity-40" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="container relative z-10 px-4 pt-20">
        {ENABLE_CHRISTMAS && (
          <div className="absolute z-30" style={{ top: "120px", right: "18%" }}>
            <SantaOverlay
              position="absolute"
              style={{ top: 0, right: 0, left: "auto" }}
              className="scale-75 md:scale-90"
            />
          </div>
        )}
        <div className="max-w-4xl">
          {/* Status Badge */}
          <div 
            className={`status-badge mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span>Server Online</span>
          </div>

          {/* Main Title */}
          <h1 
            className={`font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal mb-6 leading-none transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="text-gradient block">Oasis</span>
            <span className="text-foreground">ROLEPLAY</span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-xl mb-10 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            Sumérgete en la experiencia de roleplay definitiva. 
            Crea tu historia, construye tu legado y forma parte de nuestra comunidad.
          </p>

          {/* Stats Row */}
          <div 
            className={`flex flex-wrap gap-6 mb-10 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="stat-card skew-x-[-3deg]">
              <div className="skew-x-[3deg]">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Jugadores</span>
                </div>
                <p className="text-3xl font-heading text-gradient">128/256</p>
              </div>
            </div>
            <div className="stat-card skew-x-[-3deg]">
              <div className="skew-x-[3deg]">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">Uptime</span>
                </div>
                <p className="text-3xl font-heading text-gradient">99.9%</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap gap-4 mb-10 transition-all duration-700 delay-[400ms] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <a href="https://whitelist.oasisrp.es/" className="btn-gta">
              <span>Comienza TU HISTORIA</span>
            </a>
            <a href="https://discord.oasisrp.es/" className="btn-outline-gta">
              <span>Unirse a Discord</span>
            </a>
          </div>

          {/* Server IP */}
          <div 
            className={`inline-flex items-center gap-3 glass-dark px-5 py-3 cursor-pointer group border-l-4 border-primary skew-x-[-3deg] transition-all duration-700 delay-500 hover:shadow-glow ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            onClick={copyIP}
          >
            <div className="skew-x-[3deg] flex items-center gap-3">
              <code className="font-mono text-sm md:text-base text-foreground">
                play.oasisrp.es:30120
              </code>
              <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <ChevronDown className="w-8 h-8 text-primary" />
        </div>
      </div>

      {/* Diagonal Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-background" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }} />
    </section>
  );
};

export default Hero;
