"use client";
import { useEffect, useRef } from "react";

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

export default function ShowroomSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Browsers require a play() trigger after metadata is loaded for some autoplay policies
    v.play().catch(() => {/* swallow autoplay rejection */});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg" aria-label="Cars we restore">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/showroom/aventador-poster.webp"
      >
        <source src="/showroom/aventador.mp4" type="video/mp4" />
        <source src="/showroom/aventador.webm" type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/85" />

      <div className="relative z-10 h-full flex flex-col justify-between py-20">
        <div className="px-6 md:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Our work</p>
          <h2 className="mt-3 font-display text-5xl md:text-8xl text-accent tracking-wide leading-[0.9] max-w-4xl">
            Cars most shops won&rsquo;t touch.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-text/80 max-w-xl">
            If it costs more than a house, it belongs here. Forensic intake, factory-spec process, one signature on the work.
          </p>
        </div>

        <BrandMarquee />
      </div>
    </section>
  );
}

function BrandMarquee() {
  // Duplicate the list once so the keyframe-translated track loops seamlessly
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 backdrop-blur-sm bg-black/30">
      <div
        className="flex whitespace-nowrap items-center"
        style={{
          animation: "showroom-marquee 36s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((b, i) => (
          <div
            key={i}
            className="flex items-center px-10 py-6 text-3xl md:text-5xl font-display tracking-wide text-accent uppercase"
          >
            <span>{b}</span>
            <span className="ml-10 text-muted">·</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes showroom-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
