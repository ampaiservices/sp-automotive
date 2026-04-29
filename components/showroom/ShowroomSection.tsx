"use client";

const BRANDS = [
  "Lamborghini",
  "McLaren",
  "Audi R8",
  "BMW M",
  "Ferrari",
  "Porsche",
  "Mercedes-AMG",
  "Aston Martin",
];

// Slim brand-marquee strip. Replaces the earlier full-bleed video Showroom so
// the Aventador studio video is reserved for the hero (single, not repeated).

export default function ShowroomSection() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="relative py-12 md:py-16 bg-bg border-y border-divider overflow-hidden" aria-label="Brands we work on">
      <div className="px-6 md:px-10 mb-6 md:mb-8 flex items-baseline justify-between max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">We work on</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted/70 hidden md:block">
          and the cars older than this list
        </p>
      </div>
      <div className="relative">
        <div
          className="flex whitespace-nowrap items-center"
          style={{
            animation: "showroom-marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {items.map((b, i) => (
            <div
              key={i}
              className="flex items-center px-8 md:px-12 text-3xl md:text-6xl font-display tracking-wide text-accent uppercase"
            >
              <span>{b}</span>
              <span className="ml-8 md:ml-12 text-muted/60">·</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>
      <style>{`
        @keyframes showroom-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
