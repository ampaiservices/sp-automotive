"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhoneCTA from "@/components/ui/PhoneCTA";
import RevealWords from "@/components/effects/RevealWords";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// Autoplay studio-video hero. Replaces the prior scroll-scrub HeroScrollSequence.
// Pattern (UX skill — Video-First Hero): 60% dark overlay on video, white text,
// brand-accent CTA, autoplay muted, compress for perf.
// Reduced-motion users get a static poster instead of the autoplaying video.

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const v = videoRef.current;
    if (v && !reduced) {
      v.play().catch(() => {/* swallow autoplay rejection */});
    }
    const t = setTimeout(() => setRevealed(true), 250);
    return () => {
      clearTimeout(t);
      v?.pause();
    };
  }, [reduced]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-bg"
      aria-label="Cars we restore"
    >
      {reduced ? (
        <Image
          src="/hero-clips/cinematic-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-clips/cinematic-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src="/hero-clips/cinematic.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />

      <div
        className="relative z-10 h-full flex flex-col justify-end items-start px-6 md:px-10 pb-24 md:pb-32 transition-opacity duration-700"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <p className="eyebrow">01 / Sarasota, FL · Exotic Collision</p>
        <h2 className="mt-5 display-xl max-w-[12ch]">
          <RevealWords>Where exotics come home.</RevealWords>
        </h2>
        <p className="mt-7 max-w-xl lead">
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
