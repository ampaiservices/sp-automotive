import { HeroHeading } from "./HeroHeading";
import { HeroBody } from "./HeroBody";
import { HeroVisual } from "./HeroVisual";

/**
 * Hero — fills the viewport (plus 10% on desktop) below the header.
 *
 * ## Desktop (lg+)
 *
 * The video covers the **entire hero width** as the background; the black
 * text panel is layered on top of the left ~35% with a feathered right edge.
 * That's what lets the boundary between text and image fade smoothly:
 *
 *   ┌────────────────────────────────────────────────┐
 *   │ ▓▓▓▓▓▓▓ ▓░░·    ←─── video underneath ────→    │
 *   │ ▓▓▓▓▓▓▓ ▓░░·                                   │
 *   │ ▓ HEAD  ▓░░·                                   │
 *   │ ▓▓▓▓▓▓▓ ▓░░·   Porsche                         │
 *   │ ▓▓▓▓▓▓▓ ▓░░·                                   │
 *   │ ▓ BODY  ▓░░·                                   │
 *   │ ▓▓▓▓▓▓▓ ▓░░·                                   │
 *   └────────────────────────────────────────────────┘
 *      ↑          ↑
 *      solid      gradient fade zone (~10% of hero width)
 *      black      lives INSIDE the panel, dissolves into the
 *      panel     video underneath
 *
 * The panel itself uses a `linear-gradient` background going from solid
 * black on its left to fully transparent on its right. Where the panel is
 * transparent, the video (positioned absolutely behind it at z-0) shows
 * through. Net effect: the panel doesn't end at a hard vertical line — it
 * dissolves into the image over the rightmost ~30% of its own width, all
 * within the panel's footprint. The image area is never obscured beyond
 * what the panel actually overlaps.
 *
 * ## Mobile (<lg)
 *
 * Stacked: aspect-video Porsche on top, full-width black text panel below.
 * No overlap, no horizontal boundary to soften.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-label="Hero"
      // `flex-1` so it can grow; `min-h-svh` mobile-safe floor; +10% on
      // desktop for a substantial hero that scrolls past as one full screen.
      className="relative flex-1 min-h-svh lg:min-h-[110vh]"
    >
      {/* ============================================================
          MOBILE LAYOUT (<lg): visual on top, black panel below.
          ============================================================ */}
      <div className="flex flex-col lg:hidden">
        <div className="relative aspect-video w-full bg-black">
          <HeroVisual />
        </div>
        <div className="flex flex-col justify-around gap-12 bg-black px-6 py-12 sm:px-10">
          <HeroHeading />
          <HeroBody />
        </div>
      </div>

      {/* ============================================================
          DESKTOP LAYOUT (lg+): video as full-hero background, black
          panel as gradient overlay on the left.
          ============================================================ */}

      {/* Video — covers the right ~78% of the hero on desktop (from 22% of
          hero width to the right edge). The 22% left offset is what keeps
          the video extending behind the panel's right-edge fade zone, so
          the panel can dissolve into the video instead of into nothing.
          The container's geometric center is at 61% of hero; HeroVisual
          uses an `object-position` shift to land the visible car at exactly
          66.5% of hero (= center of the right 2/3 area, where the car was
          before the layered restructure). */}
      <div className="absolute inset-y-0 right-0 hidden bg-black lg:left-[22%] lg:block">
        <HeroVisual />
      </div>

      {/* Black text panel — overlay on the left ~35% of the hero. The
          gradient background gives it a hard solid-black left side and a
          feathered right edge that dissolves into the video underneath. The
          longer fade zone (panel width × 30% = ~10.5% of hero width) is
          entirely within the panel's footprint, so the visible Porsche
          image to the right is untouched. */}
      <div
        className="
          absolute inset-y-0 left-0 z-20 hidden
          w-[35%] flex-col justify-around p-12 xl:px-16
          lg:flex
        "
        style={{
          background:
            "linear-gradient(to right, #000 0%, #000 70%, rgba(0,0,0,0.55) 88%, rgba(0,0,0,0.2) 96%, transparent 100%)",
        }}
      >
        <HeroHeading />
        <HeroBody />
      </div>
    </section>
  );
}
