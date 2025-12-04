import { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  drift: number;
  opacity: number;
}

const bulbColors = ["#FF5F6D", "#FFD166", "#06D6A0", "#4E9AFF", "#A855F7"];

const BulbRow = ({ count, delayOffset = 0 }: { count: number; delayOffset?: number }) => (
  <div className="flex items-center justify-between gap-3 px-4">
    {Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        className="w-3 h-3 rounded-full block animate-pulse"
        style={{
          backgroundColor: bulbColors[index % bulbColors.length],
          animationDelay: `${delayOffset + (index % 7) * 0.15}s`,
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.25))",
          opacity: 0.9,
        }}
      />
    ))}
  </div>
);

export const ChristmasSectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
      <div className="relative w-full">
        <div className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent blur-sm opacity-30" />
        <BulbRow count={40} />
      </div>
    </div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="relative w-full">
        <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent blur-sm opacity-30" />
        <BulbRow count={36} delayOffset={0.35} />
      </div>
    </div>
    {children}
  </div>
);

const ChristmasEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const flakes: Snowflake[] = [];
    const flakeCount = Math.min(320, Math.floor(window.innerWidth * 0.45));

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 1.5 + 0.4,
        drift: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.4 + 0.2,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flakes.forEach((flake) => {
        flake.y += flake.speedY;
        flake.x += flake.drift;

        if (flake.y > canvas.height) flake.y = -10;
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-50"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Orbes suaves alrededor de la pagina */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 120 + 60;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const color = bulbColors[i % bulbColors.length];
          return (
            <span
              key={i}
              className="absolute rounded-full blur-3xl opacity-20"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: color,
                animation: `float ${6 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ChristmasEffects;
