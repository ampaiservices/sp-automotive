"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroLoader from "./HeroLoader";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MIN_LOAD_MS = 4000;
// pixels of scroll required to play the video once front-to-back
const PIXELS_PER_LOOP = 6000;
// fraction of each cycle that holds the FIRST frame on-screen before scrubbing begins
// (gives the user a moment to register the wreck before motion starts)
const HOLD_FRACTION = 0.12;
const VIDEO_SRC = "/hero-clips/sequence.mp4";

export default function HeroScrollSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const [beatOpacity, setBeatOpacity] = useState(1);
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [loopFadeOpacity, setLoopFadeOpacity] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const [exited, setExited] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
    // Force scroll to top on mount: prevents browser from restoring a deep scroll position
    // (which lands the user inside the pin-spacer and looks like the page jumped to the gallery)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // Strip any anchor hash (#process / #work) so it doesn't auto-scroll past the hero
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
    const onLoadedMetadata = () => setLoadProgress((p) => Math.max(p, 0.1));
    const onCanPlayThrough = () => setLoadProgress(1);

    video.addEventListener("progress", onProgress);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplaythrough", onCanPlayThrough);

    // start eager preload
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
      // Make sure we start the pin from scrollTop = 0 so the hero pins immediately
      window.scrollTo(0, 0);

      triggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=99999",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const scrolled = self.scroll() - self.start;
          const cycleProgress = scrolled / PIXELS_PER_LOOP;
          const cyclePos = ((cycleProgress % 1) + 1) % 1; // 0..1 within current cycle
          // Hold frame 0 for the first HOLD_FRACTION of each cycle, then scrub through the rest
          const wrapped =
            cyclePos < HOLD_FRACTION ? 0 : (cyclePos - HOLD_FRACTION) / (1 - HOLD_FRACTION);
          video.currentTime = wrapped * duration;

          // Beat math (mapped onto the 0..1 wrapped progress)
          const segment = 1 / BEAT_COUNT;
          const seg = Math.min(BEAT_COUNT - 1, Math.floor(wrapped / segment));
          const within = (wrapped - seg * segment) / segment;
          const op = Math.sin(within * Math.PI);
          setActiveBeat(seg);
          setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
          setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);

          // Loop fade-to-black: hide the hard cut from "fixed car showroom" → "wreck garage"
          // Fade up in last 6% of cycle, fade down in first 6%.
          const FADE_ZONE = 0.06;
          let fade = 0;
          if (wrapped > 1 - FADE_ZONE) fade = (wrapped - (1 - FADE_ZONE)) / FADE_ZONE;
          else if (wrapped < FADE_ZONE) fade = 1 - wrapped / FADE_ZONE;
          setLoopFadeOpacity(fade);
        },
      });
      // Recompute trigger geometry now that pin spacer exists
      ScrollTrigger.refresh();
    });

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      // Only kill OUR trigger so we don't nuke other ScrollTriggers in the page (FinalCTA etc.)
      triggerRef.current?.kill(true);
      triggerRef.current = null;
    };
  }, [reduced, isMobile]);

  function handleEnter() {
    setExited(true);
    if (triggerRef.current) {
      triggerRef.current.kill(true);
      triggerRef.current = null;
    }
    requestAnimationFrame(() => {
      const heroEl = containerRef.current;
      if (!heroEl) return;
      const target = heroEl.offsetTop + heroEl.offsetHeight;
      gsap.to(window, { duration: 1.2, scrollTo: { y: target, autoKill: false }, ease: "power2.inOut" });
    });
  }

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
    <section ref={containerRef} className="relative h-screen bg-bg">
      <div className="h-screen w-full overflow-hidden relative">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Loop fade overlay — masks the hard cut at video loop boundary */}
        <div className="absolute inset-0 bg-bg pointer-events-none" style={{ opacity: loopFadeOpacity }} />
        {!framesReady && <HeroLoader progress={loadProgress} />}
        {framesReady && !exited && (
          <>
            <BeatCopy index={activeBeat} opacity={beatOpacity} ctaOpacity={ctaOpacity} />
            <button
              onClick={handleEnter}
              className="absolute bottom-8 right-8 z-10 inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/30 hover:border-accent text-text/80 hover:text-accent text-xs uppercase tracking-[0.3em] transition-colors backdrop-blur-sm bg-black/30"
              aria-label="Enter the site"
            >
              Enter →
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted text-[10px] uppercase tracking-[0.3em] animate-pulse">scroll · or enter →</div>
          </>
        )}
      </div>
    </section>
  );
}
