"use client";
import { useEffect, useRef, useState } from "react";
import { BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroLoader from "./HeroLoader";
import PhoneCTA from "@/components/ui/PhoneCTA";

const MIN_LOAD_MS = 4000;
const VIDEO_SRC = "/hero-clips/sequence.mp4";

export default function HeroScrollSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeBeat, setActiveBeat] = useState(0);
  const [beatOpacity, setBeatOpacity] = useState(1);
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (reduced || isMobile) return;
    const video = videoRef.current!;

    const onProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        setLoadProgress(
          Math.min(1, video.buffered.end(video.buffered.length - 1) / video.duration)
        );
      }
    };
    const onCanPlayThrough = () => setLoadProgress(1);

    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.load();

    const videoPromise = new Promise<void>((resolve) => {
      if (video.readyState >= 3) return resolve();
      const handler = () => { video.removeEventListener("canplaythrough", handler); resolve(); };
      video.addEventListener("canplaythrough", handler);
    });
    const minTimePromise = new Promise<void>((r) => setTimeout(r, MIN_LOAD_MS));

    let timeUpdateHandler: (() => void) | null = null;

    Promise.all([videoPromise, minTimePromise]).then(() => {
      setFramesReady(true);
      // autoplay (muted ensures it's allowed by browsers)
      video.play().catch(() => { /* if blocked, user will trigger via interaction; fine */ });

      // Beat copy timed to video playback (no scroll dependency)
      timeUpdateHandler = () => {
        const duration = video.duration || 1;
        const progress = video.currentTime / duration;
        const segment = 1 / BEAT_COUNT;
        const seg = Math.min(BEAT_COUNT - 1, Math.floor(progress / segment));
        const within = (progress - seg * segment) / segment;
        const op = Math.sin(within * Math.PI);
        setActiveBeat(seg);
        setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
        setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);
      };
      video.addEventListener("timeupdate", timeUpdateHandler);
    });

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      if (timeUpdateHandler) video.removeEventListener("timeupdate", timeUpdateHandler);
    };
  }, [reduced, isMobile]);

  if (reduced) {
    return (
      <section className="relative min-h-screen bg-bg flex items-center justify-center overflow-hidden">
        <video src={VIDEO_SRC} autoPlay muted playsInline loop className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 text-center px-6">
          <h2 className="font-display text-5xl md:text-7xl text-accent tracking-wide">{BEATS[BEAT_COUNT - 1].copy}</h2>
          <div className="mt-8"><PhoneCTA size="lg" /></div>
        </div>
      </section>
    );
  }
  if (isMobile) return <HeroMobileFallback />;

  return (
    <section className="relative h-screen bg-bg overflow-hidden">
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster="/hero-frames/01-wreck.webp"
        muted
        playsInline
        loop
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {!framesReady && <HeroLoader progress={loadProgress} />}
      {framesReady && (
        <>
          <BeatCopy index={activeBeat} opacity={beatOpacity} ctaOpacity={ctaOpacity} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-[10px] uppercase tracking-[0.3em] animate-pulse">scroll</div>
        </>
      )}
    </section>
  );
}
