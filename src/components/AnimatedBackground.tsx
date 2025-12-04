import { useEffect, useRef } from "react";

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

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar tamano del canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const colors = [
      "rgba(255, 153, 0, 0.5)", // primary
      "rgba(255, 204, 0, 0.4)", // secondary
      "rgba(82, 183, 136, 0.35)", // gta-green
      "rgba(51, 153, 204, 0.35)", // gta-blue
    ];

    const particles: Particle[] = [];
    const particleCount = 90;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.speedX * (delta / 16);
        particle.y += particle.speedY * (delta / 16);

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        particle.phase += particle.twinkleSpeed * delta;
        const twinkle = 0.5 + 0.5 * Math.sin(particle.phase);
        const currentOpacity = Math.min(1, particle.opacity * (0.6 + twinkle * 0.8));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${currentOpacity})`);
        ctx.fill();

        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color.replace(
              /[\d.]+\)$/g,
              `${(1 - distance / 150) * currentOpacity * 0.25})`
            );
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default AnimatedBackground;
