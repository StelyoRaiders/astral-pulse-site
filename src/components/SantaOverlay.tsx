import React from "react";

const SantaOverlay = () => {
  return (
    <>
      <style>
        {`
          @keyframes santa-bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
      <div
        className="pointer-events-none fixed z-10 flex flex-col items-center gap-1 text-center"
        style={{
          top: "8px",
          left: "12px",
        }}
      >
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcL2-I0N3sq2s5iNs0MATT870VR_xdvfuCnqY3ZcinCFzuOT2-4CUXoojRX1DzcAwJzPcp1-q0FiujKzwB3fjer4Aje1uGZK2ucwj-R86dLMl2662ioAVi0FTF4MTcwni_6EJC4zTQCTFQ/s1600/papa-noel.gif"
          alt="Papa Noel animado"
          className="w-12 h-12 drop-shadow-[0_0_10px_rgba(0,0,0,0.35)]"
          style={{ animation: "santa-bob 4.5s ease-in-out infinite" }}
        />
        <span className="text-[10px] text-foreground font-semibold tracking-wide bg-black/40 px-2 py-0.5 rounded">
          ¡Felices fiestas!
        </span>
      </div>
    </>
  );
};

export default SantaOverlay;
