"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroLoader from "./HeroLoader";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger);

const MIN_LOAD_MS = 4000;
// fraction of the section that holds the FIRST frame on screen before scrubbing begins
const HOLD_FRACTION = 0.12;
const VIDEO_SRC = "/hero-clips/sequence.mp4";

export default function HeroScrollSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [beatOpacity, setBeatOpacity] = useState(1);
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (reduced || isMobile) return;
    const video = videoRef.current!;

    const onProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        setLoadProgress(Math.min(1, buffered / video.duration));
      }
    };
    const onLoadedMetadata = () => {
      setLoadProgress((p) => Math.max(p, 0.1));
      try { video.currentTime = 0; } catch {}
    };
    const onCanPlayThrough = () => setLoadProgress(1);

    video.addEventListener("progress", onProgress);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.load();

    const videoPromise = new Promise<void>((resolve) => {
      if (video.readyState >= 3) return resolve();
      const handler = () => { video.removeEventListener("canplaythrough", handler); resolve(); };
      video.addEventListener("canplaythrough", handler);
    });
    const minTimePromise = new Promise<void>((r) => setTimeout(r, MIN_LOAD_MS));

    Promise.all([videoPromise, minTimePromise]).then(() => {
      setFramesReady(true);
      const duration = video.duration || 30;

      // Single play-through pin: scrub video.currentTime as user scrolls through the section.
      const obj = { progress: 0 };
      gsap.to(obj, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          onRefreshInit: (self) => { triggerRef.current = self; },
        },
        onUpdate: () => {
          const cyclePos = obj.progress; // 0..1 across the section
          // Hold frame 0 for the first HOLD_FRACTION, then scrub through video for the rest
          const wrapped =
            cyclePos < HOLD_FRACTION ? 0 : (cyclePos - HOLD_FRACTION) / (1 - HOLD_FRACTION);
          // Clamp away from the very end — some browsers (and certain MP4 encodes) flash black
          // when currentTime exactly equals duration. Holding the last meaningful frame instead.
          const target = Math.min(wrapped * duration, duration - 0.1);
          video.currentTime = target;

          const segment = 1 / BEAT_COUNT;
          const seg = Math.min(BEAT_COUNT - 1, Math.floor(wrapped / segment));
          const within = (wrapped - seg * segment) / segment;
          const op = Math.sin(within * Math.PI);
          setActiveBeat(seg);
          setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
          setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);
        },
      });
    });

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      triggerRef.current?.kill(true);
      triggerRef.current = null;
    };
  }, [reduced, isMobile]);

  if (reduced) {
    return (
      <section className="relative min-h-screen bg-bg flex items-center justify-center">
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
    <section ref={containerRef} className="relative h-[400vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster="/hero-frames/01-wreck.webp"
          muted
          playsInline
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
      </div>
    </section>
  );
}
