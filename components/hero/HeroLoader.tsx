"use client";
import { useEffect, useState } from "react";

type Props = { progress: number };

// Loader screen shown while hero frames decode + minimum display window elapses.
// Uses PNG with a mask sweep as a placeholder draw effect.
// TODO: when /logos/sp-illustration.svg lands, swap PNG for inline SVG with stroke-dasharray animation.
export default function HeroLoader({ progress }: Props) {
  const [hasSvg, setHasSvg] = useState(false);

  useEffect(() => {
    // Probe for SVG file existence; if present, switch to SVG render path.
    fetch("/logos/sp-illustration.svg", { method: "HEAD" })
      .then((r) => setHasSvg(r.ok))
      .catch(() => setHasSvg(false));
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-bg gap-10 px-6">
      <div className="relative max-h-[55vh] w-auto">
        {hasSvg ? (
          <object
            type="image/svg+xml"
            data="/logos/sp-illustration.svg"
            className="block max-h-[55vh] w-auto hero-loader-svg"
            aria-label=""
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/logos/sp-illustration.png"
            alt=""
            className="block max-h-[55vh] w-auto hero-loader-mask"
          />
        )}
      </div>

      <div className="w-56 h-px bg-divider relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-200"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <p className="text-muted text-[10px] uppercase tracking-[0.4em]">Loading</p>

      <style>{`
        /* PNG fallback: animated mask sweep that fades the logo in left-to-right repeatedly. */
        .hero-loader-mask {
          -webkit-mask-image: linear-gradient(110deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.15) 100%);
          mask-image: linear-gradient(110deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 65%, rgba(0,0,0,0.15) 100%);
          -webkit-mask-size: 200% 100%;
          mask-size: 200% 100%;
          animation: heroLoaderSweep 3s ease-in-out infinite;
        }
        @keyframes heroLoaderSweep {
          0%   { -webkit-mask-position: -100% 0; mask-position: -100% 0; }
          100% { -webkit-mask-position:  100% 0; mask-position:  100% 0; }
        }

        /* SVG path-trace draw effect (used when /logos/sp-illustration.svg is present).
           The <object> embed gets its inner paths animated via this stylesheet because the
           SVG file inherits parent CSS only if it links to a stylesheet — so we ALSO
           recommend embedding stroke-dasharray styles inside the SVG file itself.
           This block is here as a parent-level hint; refine inside the SVG if needed. */
        .hero-loader-svg {
          animation: heroLoaderSvgFade 0.4s ease-out;
        }
        @keyframes heroLoaderSvgFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
