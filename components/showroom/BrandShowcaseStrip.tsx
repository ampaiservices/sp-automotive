"use client";

import {
  siAudi,
  siBmw,
  siFerrari,
  siLamborghini,
  siMclaren,
  siPorsche,
} from "simple-icons";

import { BRANDS } from "@/components/brand/brands-data";

// Continuously-scrolling brand ticker. Emblem + brand name per item, looped
// for seamless scrolling. CSS @keyframes only — no carousel libraries, no
// rAF. Honors prefers-reduced-motion.
//
// Emblems come from the `simple-icons` package (monochrome SVG path data,
// tree-shaken named imports). BMW M reuses the BMW emblem since simple-icons
// has no M-specific mark.

type Emblem = { path: string };

const BRAND_EMBLEMS: Record<string, Emblem> = {
  lamborghini: siLamborghini,
  mclaren: siMclaren,
  audi: siAudi,
  "bmw-m": siBmw,
  ferrari: siFerrari,
  porsche: siPorsche,
};

// Per-brand visual treatment for the marquee. Each label is pre-cased to the
// brand's actual wordmark casing (Audi is lowercase, BMW is all-caps, etc.)
// and the fontVar points at a CSS variable declared via next/font in
// app/layout.tsx. Ferrari renders italic to evoke the badge script.
//
// `mclaren` overrides emblemSize (~1.6× the others, anchoring the row) and
// scales its wordmark down a step since Michroma reads visually heavier than
// the other faces. `audi` scales its wordmark up a step — Outfit at default
// size reads quieter than the condensed faces around it.
type BrandStyle = {
  label: string;
  fontVar: string;
  italic?: boolean;
  emblemSize?: string;
  textSize?: string;
};

const BRAND_STYLES: Record<string, BrandStyle> = {
  lamborghini: { label: "Lamborghini", fontVar: "--font-lambo" },
  mclaren: {
    label: "McLaren",
    fontVar: "--font-mclaren",
    emblemSize: "h-12 w-12 md:h-20 md:w-20",
    textSize: "text-2xl md:text-4xl",
  },
  audi: {
    label: "audi",
    fontVar: "--font-audi",
    textSize: "text-4xl md:text-6xl",
  },
  "bmw-m": { label: "BMW", fontVar: "--font-bmw" },
  ferrari: { label: "Ferrari", fontVar: "--font-ferrari", italic: true },
  porsche: { label: "Porsche", fontVar: "--font-porsche" },
};

const DEFAULT_EMBLEM_SIZE = "h-8 w-8 md:h-12 md:w-12";
const DEFAULT_TEXT_SIZE = "text-3xl md:text-5xl";

export default function BrandShowcaseStrip() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section
      className="relative py-10 md:py-14 bg-ink/40 border-y border-divider overflow-hidden"
      aria-label="Brands we work on"
    >
      {/* Screen-reader fallback — the visual marquee is aria-hidden. */}
      <ul className="sr-only">
        {BRANDS.map((b) => (
          <li key={b.slug}>{b.name}</li>
        ))}
      </ul>

      <div aria-hidden className="relative">
        <div
          className="brand-strip-track flex items-center whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {items.map((b, i) => {
            const emblem = BRAND_EMBLEMS[b.brandKey];
            const style = BRAND_STYLES[b.brandKey];
            const emblemSize = style?.emblemSize ?? DEFAULT_EMBLEM_SIZE;
            const textSize = style?.textSize ?? DEFAULT_TEXT_SIZE;
            return (
              <div
                key={`${b.slug}-${i}`}
                className={`flex items-center gap-4 md:gap-6 px-8 md:px-14 ${textSize} tracking-wide text-bone`}
                style={
                  style
                    ? {
                        fontFamily: `var(${style.fontVar})`,
                        fontStyle: style.italic ? "italic" : undefined,
                      }
                    : undefined
                }
              >
                {emblem && (
                  <svg
                    viewBox="0 0 24 24"
                    className={`${emblemSize} shrink-0 fill-current`}
                    aria-hidden="true"
                  >
                    <path d={emblem.path} />
                  </svg>
                )}
                <span>{style?.label ?? b.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes brand-strip {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .brand-strip-track {
          animation: brand-strip 60s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-strip-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
