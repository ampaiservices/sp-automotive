"use client";
import { useEffect, useRef, useState } from "react";
import PhoneCTA from "@/components/ui/PhoneCTA";

// Autoplay studio-video hero. Replaces the prior scroll-scrub HeroScrollSequence.
// Pattern (UX skill — Video-First Hero): 60% dark overlay on video, white text,
// brand-accent CTA, autoplay muted, captions for a11y, compress for perf.

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {/* swallow autoplay rejection */});
    // Stagger overlay reveal for a beat after first frame paints
    const t = setTimeout(() => setRevealed(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-bg"
      aria-label="Cars we restore"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-clips/cinematic-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-clips/cinematic.mp4" type="video/mp4" />
        <source src="/hero-clips/cinematic.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />

      <div
        className="relative z-10 h-full flex flex-col justify-end items-start px-6 md:px-10 pb-24 md:pb-32 transition-opacity duration-700"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-muted">
          Sarasota, FL · Exotic Collision
        </p>
        <h2 className="mt-4 font-display text-6xl md:text-9xl text-accent tracking-tight leading-[0.88] max-w-[12ch]">
          Where exotics come home.
        </h2>
        <p className="mt-6 max-w-xl text-lg md:text-xl text-text/85">
          Factory-correct collision repair for Lamborghini, McLaren, Audi R8, and BMW M.
          Forensic intake. Torque-spec rebuild. One signature on the work.
        </p>
        <div className="mt-10">
          <PhoneCTA size="lg" />
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted text-[10px] uppercase tracking-[0.3em] animate-pulse"
      >
        scroll
      </div>
    </section>
  );
}
