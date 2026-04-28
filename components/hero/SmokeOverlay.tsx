"use client";
import { forwardRef } from "react";

const SmokeOverlay = forwardRef<HTMLDivElement>(function SmokeOverlay(_, ref) {
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen">
      {/* TODO: replace with <video src="/hero-smoke.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" /> when asset arrives */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_60%)]"
        style={{ animation: "smokePulse 4s ease-in-out infinite" }}
      />
      <style>{`@keyframes smokePulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.1); } }`}</style>
    </div>
  );
});

export default SmokeOverlay;
