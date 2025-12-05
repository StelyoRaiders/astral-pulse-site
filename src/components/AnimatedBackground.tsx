import { useEffect, useRef, memo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  phase: number;
  twinkleSpeed: number;
  color: string;
}

const AnimatedBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Reducir resolución del canvas para mejor rendimiento
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    
    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    
    // Debounce resize
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(setCanvasSize, 150);
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(255, 153, 0, 0.7)",
      "rgba(255, 204, 0, 0.6)",
      "rgba(82, 183, 136, 0.55)",
      "rgba(51, 153, 204, 0.55)",
    ];

    // Reducir partículas de 220 a 80 para mejor rendimiento
    const particleCount = 80;
    const particles: Particle[] = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    let lastTime = performance.now();
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      const elapsed = time - lastTime;
      if (elapsed < frameInterval) return;
      
      lastTime = time - (elapsed % frameInterval);
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Solo dibujar partículas, sin líneas de conexión (elimina O(n²))
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvasWidth) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvasHeight) particle.speedY *= -1;

        particle.phase += particle.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(particle.phase);
        const currentOpacity = particle.opacity * (0.6 + twinkle * 0.8);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${currentOpacity})`);
        ctx.fill();
      }
    };

    animate(performance.now());

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ mixBlendMode: "screen", willChange: "transform" }}
    />
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
