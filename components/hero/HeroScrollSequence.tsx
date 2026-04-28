"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FRAMES, BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import SmokeOverlay from "./SmokeOverlay";
import HeroLoader from "./HeroLoader";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MIN_LOAD_MS = 4000;
// Pixels of scroll required to advance through ONE full cycle of all frames.
// Roughly one viewport height = one cycle. Lower = faster cycling.
const PIXELS_PER_CYCLE = 1200;

export default function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const playheadRef = useRef(0); // virtual frame counter; cycles via modulo
  const [activeBeat, setActiveBeat] = useState(0);
  const [beatOpacity, setBeatOpacity] = useState(1);
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const [exited, setExited] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (reduced || isMobile) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    // Load all frames + enforce min 4s display time
    let loadedCount = 0;
    const framesPromise = new Promise<void>((resolve) => {
      for (let i = 0; i < FRAMES.length; i++) {
        const img = new Image();
        img.src = FRAMES[i];
        img.onload = () => {
          loadedCount++;
          setLoadProgress(loadedCount / FRAMES.length);
          if (loadedCount === FRAMES.length) resolve();
        };
        framesRef.current.push(img);
      }
    });
    const minTimePromise = new Promise<void>((r) => setTimeout(r, MIN_LOAD_MS));

    Promise.all([framesPromise, minTimePromise]).then(() => {
      setFramesReady(true);
      render();
      // Set up infinite-loop pin: very large `end` so the user can't naturally scroll past.
      // Click "Enter" releases the pin (see handleEnter).
      triggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=99999",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const scrolled = self.scroll() - self.start; // px scrolled into the pin
          const playhead = (scrolled / PIXELS_PER_CYCLE) * FRAMES.length;
          playheadRef.current = playhead;
          render();
        },
      });

      if (smokeRef.current) {
        gsap.to(smokeRef.current, {
          opacity: 0.6,
          ease: "sine.inOut",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=" + PIXELS_PER_CYCLE * 2, scrub: true },
        });
      }
    });

    function render() {
      // Wrap playhead via modulo for infinite cycling
      const wrapped = ((playheadRef.current % FRAMES.length) + FRAMES.length) % FRAMES.length;
      const idx = Math.min(FRAMES.length - 1, Math.floor(wrapped));
      const img = framesRef.current[idx];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ca = canvas.width / canvas.height;
      const ia = img.width / img.height;
      let dw, dh, dx, dy;
      if (ia > ca) {
        dh = canvas.height;
        dw = canvas.height * ia;
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        dw = canvas.width;
        dh = canvas.width / ia;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);

      // Beat math on the wrapped playhead
      const progress = wrapped / FRAMES.length;
      const segment = 1 / BEAT_COUNT;
      const seg = Math.min(BEAT_COUNT - 1, Math.floor(progress / segment));
      const within = (progress - seg * segment) / segment;
      const op = Math.sin(within * Math.PI);
      setActiveBeat(seg);
      setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
      setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);
    }

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced, isMobile]);

  function handleEnter() {
    setExited(true);
    if (triggerRef.current) {
      triggerRef.current.kill(true); // true = revert pin spacer immediately
      triggerRef.current = null;
    }
    // Scroll smoothly to the section after the hero
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FRAMES[FRAMES.length - 1]} alt="" className="absolute inset-0 w-full h-full object-cover" />
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
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <SmokeOverlay ref={smokeRef} />
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
