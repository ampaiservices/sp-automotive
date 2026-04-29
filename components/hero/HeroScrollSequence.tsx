"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAMES, BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import HeroLoader from "./HeroLoader";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger);

const MIN_LOAD_MS = 4000;
// fraction of the section that holds the FIRST frame on screen before scrubbing begins
const HOLD_FRACTION = 0.10;
// total scroll length in vh for the full hero play-through
const PIN_DISTANCE_VH = 350;

export default function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
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

    // Load all frames in parallel; track progress
    let loaded = 0;
    const obj = { progress: 0 };
    const loadPromises: Promise<void>[] = [];

    framesRef.current = FRAMES.map((src) => {
      const img = new Image();
      const p = new Promise<void>((resolve) => {
        img.onload = () => {
          loaded++;
          setLoadProgress(loaded / FRAMES.length);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadProgress(loaded / FRAMES.length);
          resolve(); // resolve even on error so loading can complete
        };
      });
      img.src = src;
      loadPromises.push(p);
      return img;
    });

    const framesPromise = Promise.all(loadPromises);
    const minTimePromise = new Promise<void>((r) => setTimeout(r, MIN_LOAD_MS));

    function drawCover(img: HTMLImageElement) {
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
    }

    function render() {
      const cyclePos = obj.progress;
      const wrapped =
        cyclePos < HOLD_FRACTION ? 0 : (cyclePos - HOLD_FRACTION) / (1 - HOLD_FRACTION);
      const idx = Math.min(FRAMES.length - 1, Math.floor(wrapped * (FRAMES.length - 1)));
      const img = framesRef.current[idx];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCover(img);
      }

      // Beat math
      const segment = 1 / BEAT_COUNT;
      const seg = Math.min(BEAT_COUNT - 1, Math.floor(wrapped / segment));
      const within = (wrapped - seg * segment) / segment;
      const op = Math.sin(within * Math.PI);
      setActiveBeat(seg);
      setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
      setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);
    }

    Promise.all([framesPromise, minTimePromise]).then(() => {
      setFramesReady(true);
      render(); // initial draw of frame 0

      gsap.to(obj, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (PIN_DISTANCE_VH / 100)}`,
          scrub: 0.3,
          pin: true,
          onRefreshInit: (self) => { triggerRef.current = self; },
        },
        onUpdate: render,
      });
    });

    return () => {
      window.removeEventListener("resize", resize);
      triggerRef.current?.kill(true);
      triggerRef.current = null;
    };
  }, [reduced, isMobile]);

  if (reduced) {
    return (
      <section className="relative min-h-screen bg-bg flex items-center justify-center overflow-hidden">
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
    <section ref={containerRef} className="relative h-screen bg-bg overflow-hidden">
      <div className="h-screen w-full overflow-hidden relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
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
