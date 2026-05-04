"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// A six-frame scroll-driven recap of a repair: wreck → strip → diagnose →
// paint → reassemble → reveal. Sits between HeroVideo and ShowroomSection.
//
// Performance notes:
// - 200vh section with a 100vh sticky inner container. User scrolls 100vh of
//   distance to advance through all six frames (~17vh per transition).
// - Frame swapping is paint-only (opacity). No layout, no JS for the pin —
//   `position: sticky` does the pin natively.
// - Scroll handler is passive + RAF-throttled, mutates DOM directly so no
//   React re-renders fire per scroll tick.
// - Reduced-motion users see the final "reveal" frame statically.

const FRAMES = [
  { src: "/hero-frames/01-wreck.webp", caption: "Wreck" },
  { src: "/hero-frames/02-explosion.webp", caption: "Strip" },
  { src: "/hero-frames/03-damaged-panel.webp", caption: "Diagnose" },
  { src: "/hero-frames/04-painted-panel.webp", caption: "Paint" },
  { src: "/hero-frames/05-reassembly.webp", caption: "Reassemble" },
  { src: "/hero-frames/06-reveal.webp", caption: "Return" },
] as const;

export default function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let lastIdx = -1;
    const nFrames = FRAMES.length;
    const window_ = nFrames > 1 ? 1 / (nFrames - 1) : 1;

    function apply() {
      rafId = 0;
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section!.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = scrolled / total;

      for (let i = 0; i < nFrames; i++) {
        const el = frameRefs.current[i];
        if (!el) continue;
        const center = i * window_;
        const dist = Math.abs(p - center);
        const op = Math.max(0, 1 - dist / window_);
        el.style.opacity = String(op);
      }

      const idx = Math.round(p * (nFrames - 1));
      if (idx !== lastIdx) {
        lastIdx = idx;
        const cap = captionRef.current;
        if (cap) {
          const num = String(idx + 1).padStart(2, "0");
          cap.textContent = `${num} / ${FRAMES[idx].caption}`;
        }
      }
    }

    function onScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  if (reduced) {
    const last = FRAMES[FRAMES.length - 1];
    return (
      <section className="relative h-screen w-full overflow-hidden bg-bg">
        <Image src={last.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-hidden
      className="relative h-[200vh] w-full bg-bg"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {FRAMES.map((f, i) => (
          <div
            key={f.src}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-[opacity]"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={f.src}
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p
            ref={captionRef}
            className="font-display text-xl md:text-2xl text-accent tracking-[0.3em] uppercase"
          >
            01 / Wreck
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted">
            Six steps. One signature.
          </p>
        </div>
      </div>
    </section>
  );
}
