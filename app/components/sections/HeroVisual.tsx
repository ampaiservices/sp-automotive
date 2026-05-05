"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCursorProgress } from "@/app/hooks/useCursorProgress";

type Mode = "cursor" | "autoplay" | "static";

/**
 * Right-column visual: floating Porsche image as the base layer with the
 * exploded-view video overlaid on top, both `object-cover` so they fill the
 * entire parent area regardless of its aspect.
 *
 * The 16:9 video center-crops slightly when the parent column is narrower
 * than 16:9 (typical desktop 1920×1080 - 80px header → ~1.28 aspect right
 * column → ~140px cropped each side). On mobile the parent forces 16:9 so
 * no cropping happens.
 *
 * Cursor scrub is owned by `useCursorProgress`. Mode branches:
 *  - `cursor` (default desktop pointer) — hook drives video.currentTime
 *  - `autoplay` (touch / coarse pointer) — native muted forward loop
 *  - `static` (prefers-reduced-motion) — video unmounted, only the image renders
 *
 * SSR initial mode is `cursor` so server and client first paint match. The
 * effect below refines based on matchMedia after hydration.
 */
export function HeroVisual() {
  const [mode, setMode] = useState<Mode>("cursor");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Hook is called unconditionally (rules of hooks). It bails internally on
  // reduced-motion / coarse-pointer environments, so it's a no-op outside
  // cursor mode.
  //
  // Tuning the knobs:
  //   `reachX` / `reachY` — symmetric default reach on each axis (Chebyshev
  //     metric). Active rectangle = `2*reachX*halfW` × `2*reachY*halfH`,
  //     centered. Outside it: progress 0. At dead center: progress 1.
  //   `reachTop` / `reachBottom` / `reachLeft` / `reachRight` — per-side
  //     overrides for asymmetric coverage. `reachTop: 0.55` extends the
  //     active zone further upward (over the roofline / spoiler) without
  //     pulling the bottom edge down into empty space below the wheels.
  //   `lerp`            — per-frame smoothing for the rAF chase loop.
  //     0.2 ≈ ~250ms settle, ~100ms perceptual lag behind a swept cursor.
  //
  // The container now covers the right ~78% of the hero (left edge at 22%
  // of hero; right edge at 100%). On a 1920×1188 hero, container width ≈
  // 1498px, halfW ≈ 749px. The container's geometric center sits at 61% of
  // hero, but the visible car is shifted to 66.5% of hero via `object-
  // position` (see `objectPositionClass` below). Asymmetric reach values
  // pull the active rectangle's center toward the visible car — `reachLeft`
  // smaller (zone tightens on the left, away from the panel boundary),
  // `reachRight` larger (zone extends further toward the right edge of the
  // visible car). Net active rectangle is centered around 66% of hero —
  // matches where the visible Porsche actually sits.
  const { containerRef } = useCursorProgress({
    videoRef,
    reachX: 0.5, // base — overridden per-side below
    reachY: 0.4,
    reachLeft: 0.35,
    reachRight: 0.65,
    reachTop: 0.55,
    lerp: 0.2,
  });

  // Tailwind arbitrary value for `object-position`. Underscores become
  // spaces in the CSS value — `object-[33%_50%]` outputs
  // `object-position: 33% 50%`. With container 78% of hero and 16:9 source,
  // 33% shifts the visible content rightward enough that the car (centered
  // in the source) lands at ~66.5% of the hero. On mobile (<lg) we keep
  // default centered crop because the layout is stacked rather than
  // overlapped. */
  const objectPositionClass = "lg:object-[33%_50%]";

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const update = () => {
      if (mqReduce.matches) setMode("static");
      else if (mqCoarse.matches) setMode("autoplay");
      else setMode("cursor");
    };
    update();
    mqReduce.addEventListener("change", update);
    mqCoarse.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqCoarse.removeEventListener("change", update);
    };
  }, []);

  // Drive native playback for autoplay mode; cursor mode owns playback via
  // useCursorProgress (manual pause + currentTime scrub).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (mode === "autoplay") {
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.play().catch(() => {
        // Autoplay can be blocked despite muted+playsInline — fall back is
        // the static image showing through, no further action needed.
      });
    } else {
      v.pause();
    }
  }, [mode]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <Image
        src="/images/hero-floating.jpeg"
        alt="Black Porsche 911 GT3 RS floating on a glowing platform"
        fill
        sizes="(min-width: 1024px) 78vw, 100vw"
        preload
        className={`pointer-events-none select-none object-cover ${objectPositionClass}`}
      />
      {mode !== "static" && (
        <video
          ref={videoRef}
          src="/videos/hero-exploded.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${objectPositionClass}`}
        />
      )}
    </div>
  );
}
