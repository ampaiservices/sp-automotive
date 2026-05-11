"use client";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// Ambient looping backdrop tucked behind the section 07 ("The signature")
// glass card. Renders the source clip at 0.4x with `mix-blend-mode: screen`
// over the page's dark gradient so it reads as a soft chromatic halo
// around the card rather than a discrete colored panel. A radial mask
// concentrates the glow near the card's footprint and fades the video to
// transparent at the section edges, keeping the chapter mark and copy
// from competing with bright pixels.
//
// Pattern notes
// - Muted + playsInline + autoPlay loop — the looping pattern matches the
//   `playbackRate` knob the user requested; HTML5 video has no
//   `playbackRate` attribute, so we set it imperatively after mount.
// - `useMediaQuery` keeps SSR and the first client paint in sync, then
//   honors prefers-reduced-motion by short-circuiting the <video> entirely
//   (a darkened section with no motion is the correct fallback here).
// - iOS Safari sometimes ignores `autoPlay` even on a muted video until a
//   manual `play()` after `loadeddata`; we nudge it once.

export default function AboutBackdropVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.4;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener("loadeddata", tryPlay, { once: true });
    return () => {
      v.removeEventListener("loadeddata", tryPlay);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        // Radial fade centered on the card so the glow is brightest behind
        // the body copy and tapers to transparent at the section edges.
        maskImage:
          "radial-gradient(ellipse 70% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 65% at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0) 85%)",
      }}
    >
      {reduced ? null : (
        <video
          ref={videoRef}
          src="/sections/ch07-signature-glow.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{ mixBlendMode: "screen" }}
        />
      )}
    </div>
  );
}
