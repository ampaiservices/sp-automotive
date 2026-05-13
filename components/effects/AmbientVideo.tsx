"use client";
import Image from "next/image";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

// Ambient autoplay backdrop. Renders a muted, looping `<video>` filling
// its parent (which must be `position: relative`), or — when the user
// has set `prefers-reduced-motion: reduce` — a static poster `<Image>`
// in the same slot.
//
// WCAG 2.2.2: auto-playing motion longer than 5s must not start at all
// for users who have expressed the reduced-motion preference. Mirrors
// the reduced-motion swap pattern used by SectionScrubVideo so the two
// stay consistent.
//
// SSR: matches SectionScrubVideo's serverDefault (false). The server
// ships the video element; reduced-motion clients swap to the poster
// after hydration.

type Props = {
  /** Path under /public, e.g. "/chapter-clips/05-workshop.mp4". */
  src: string;
  /** Poster image (first frame). Shown before the video loads, and as
   *  the sole rendered layer in reduced-motion mode. */
  poster: string;
  /** Optional override for the absolute-fill wrapper classes. */
  className?: string;
};

const DEFAULT_WRAPPER =
  "pointer-events-none absolute inset-0 overflow-hidden";

export default function AmbientVideo({ src, poster, className }: Props) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wrapperClass = className ?? DEFAULT_WRAPPER;

  if (reduced) {
    return (
      <div aria-hidden className={wrapperClass}>
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div aria-hidden className={wrapperClass}>
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
