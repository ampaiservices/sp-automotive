"use client";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// Pinned stat-reveal section: three short headlines fade in sequentially as
// the user scrolls through. Sits between the brand showroom marquee and the
// before-after gallery — gives a quiet, deliberate beat after the busy
// marquee before the work itself.
//
// Implementation mirrors HeroSequence: 200vh outer with 100vh sticky inner,
// passive scroll + RAF, direct DOM mutation, no React re-renders per tick.
// Reduced-motion users see all three lines static.

const LINES = [
  { number: "01", text: "One paint booth." },
  { number: "02", text: "One owner." },
  { number: "03", text: "One signature." },
] as const;

export default function StatReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    function apply() {
      rafId = 0;
      const rect = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section!.offsetHeight - vh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = scrolled / total;

      // Overlapping windows so the reveal feels continuous, not staccato.
      // Line i reveals from i*0.3 to i*0.3+0.4 (40% of scroll, 30% step).
      for (let i = 0; i < LINES.length; i++) {
        const start = i * 0.3;
        const end = start + 0.4;
        const lineP = Math.max(0, Math.min(1, (p - start) / (end - start)));
        const el = lineRefs.current[i];
        if (!el) continue;
        el.style.opacity = String(lineP);
        el.style.transform = `translateY(${(1 - lineP) * 24}px)`;
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
    return (
      <section className="relative bg-bg py-32 px-6 md:px-10 border-t border-divider">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {LINES.map((l) => (
            <div key={l.number}>
              <p className="eyebrow">{l.number}</p>
              <h2 className="mt-3 display-lg">{l.text}</h2>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-bg border-t border-divider">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {LINES.map((l, i) => (
            <div
              key={l.number}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="will-change-[transform,opacity]"
              style={{ opacity: 0, transform: "translateY(24px)" }}
            >
              <p className="eyebrow">{l.number}</p>
              <h2 className="mt-3 display-lg">{l.text}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
