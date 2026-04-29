"use client";
import { useEffect, useRef, useState } from "react";

// Desktop-only custom cursor: a small ring that follows the mouse, with a soft
// radial spotlight behind it on dark surfaces. Grows when hovering interactive
// elements (anchors, buttons). Hidden on coarse pointers (touch).

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // Skip on coarse pointers (touch) or reduced motion
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarse || isReduced) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;
    if (!dot || !ring || !spotlight) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      // Dot tracks instantly
      dot!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      spotlight!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    }

    function tick() {
      // Ring lerps toward target for that springy feel
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [role='button'], input, textarea, label");
      setHover(!!interactive);
    }

    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[60]"
        style={{
          width: "640px",
          height: "640px",
          marginLeft: "-320px",
          marginTop: "-320px",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[70] rounded-full border border-accent/70 transition-[width,height,margin,opacity] duration-200"
        style={{
          width: hover ? "44px" : "28px",
          height: hover ? "44px" : "28px",
          marginLeft: hover ? "-22px" : "-14px",
          marginTop: hover ? "-22px" : "-14px",
          opacity: hover ? 0.95 : 0.5,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[71] w-1 h-1 -ml-0.5 -mt-0.5 rounded-full bg-accent"
      />
      <style>{`@media (pointer: fine) { html, body { cursor: none; } html, body * { cursor: none !important; } }`}</style>
    </>
  );
}
