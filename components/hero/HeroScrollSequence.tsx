"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAMES, BEAT_COUNT } from "@/lib/hero-frames";
import { BeatCopy, BEATS } from "./HeroBeats";
import HeroMobileFallback from "./HeroMobileFallback";
import SmokeOverlay from "./SmokeOverlay";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
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
  }, []);

  useEffect(() => {
    if (reduced || isMobile) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap 2x for perf
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
    resize();
    window.addEventListener("resize", resize);

    let loaded = 0;
    const obj = { frame: 0 };
    for (let i = 0; i < FRAMES.length; i++) {
      const img = new Image();
      img.src = FRAMES[i];
      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / FRAMES.length);
        if (loaded === FRAMES.length) { setFramesReady(true); render(); }
      };
      framesRef.current.push(img);
    }

    function render() {
      const idx = Math.min(FRAMES.length - 1, Math.floor(obj.frame));
      const img = framesRef.current[idx];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // object-cover math: scale image to fully cover canvas; center; crop overflow
      const ca = canvas.width / canvas.height;
      const ia = img.width / img.height;
      let dw, dh, dx, dy;
      if (ia > ca) {
        // image wider than canvas — fit by height, crop sides
        dh = canvas.height;
        dw = canvas.height * ia;
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        // image taller relative — fit by width, crop top/bottom
        dw = canvas.width;
        dh = canvas.width / ia;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);

      // Beat fade — sin curve within each beat segment, hold final beat solid
      const progress = obj.frame / Math.max(1, FRAMES.length - 1);
      const segment = 1 / BEAT_COUNT;
      const seg = Math.min(BEAT_COUNT - 1, Math.floor(progress / segment));
      const within = (progress - seg * segment) / segment;
      const op = Math.sin(within * Math.PI);
      setActiveBeat(seg);
      setBeatOpacity(seg === BEAT_COUNT - 1 ? 1 : op);
      // CTA staggered reveal — only on final beat after ~15% in (≈600ms after headline lands)
      setCtaOpacity(seg === BEAT_COUNT - 1 && within > 0.15 ? 1 : 0);
    }

    gsap.to(obj, {
      frame: FRAMES.length - 1,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 0.5, pin: true },
      onUpdate: render,
    });

    if (smokeRef.current) {
      gsap.to(smokeRef.current, {
        opacity: 0.6,
        ease: "sine.inOut",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: true },
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced, isMobile]);

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
    <section ref={containerRef} className="relative h-[800vh] bg-bg">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <SmokeOverlay ref={smokeRef} />
        {!framesReady && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg gap-8 px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/sp-illustration.png"
              alt=""
              className="max-h-[55vh] w-auto object-contain animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <div className="w-48 h-px bg-divider relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-200" style={{ width: `${Math.round(loadProgress * 100)}%` }} />
            </div>
          </div>
        )}
        <BeatCopy index={activeBeat} opacity={beatOpacity} ctaOpacity={ctaOpacity} />
        {framesReady && <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted text-xs uppercase tracking-[0.3em] animate-pulse">scroll</div>}
      </div>
    </section>
  );
}
