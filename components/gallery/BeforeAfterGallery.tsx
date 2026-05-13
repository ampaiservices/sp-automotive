import RevealWords from "@/components/effects/RevealWords";
import { CardStack, type CardStackItem } from "./CardStack";

// Section 06 — Selected work. A 3D fan-stack carousel of completed exotic
// repairs. All photos shot in the SP detail bays. Brand-page links match
// the existing /{brand}-collision-repair-sarasota routes.

const works: CardStackItem[] = [
  {
    id: 1,
    title: "Lamborghini Huracán EVO Spyder",
    description: "Showroom-prep finish",
    imageSrc: "/work-gallery/01-huracan-evo-spyder.jpg",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 2,
    title: "Lamborghini Urus",
    description: "Carbon-fiber matte refinish",
    imageSrc: "/work-gallery/02-urus-matte-side.jpg",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 3,
    title: "Porsche Cayman GT4",
    description: "Paint correction + ceramic",
    imageSrc: "/work-gallery/03-cayman-gt4-studio.jpg",
    href: "/porsche-collision-repair-sarasota",
  },
  {
    id: 4,
    title: "Ford F-150 Shelby",
    description: "Custom paint & detailing",
    imageSrc: "/work-gallery/04-f150-shelby.jpg",
  },
  {
    id: 5,
    title: "Lamborghini Urus",
    description: "Front-end collision intake",
    imageSrc: "/work-gallery/05-urus-damaged-outside.jpg",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 6,
    title: "Porsche Cayman GT4",
    description: "Track-day reset",
    imageSrc: "/work-gallery/06-cayman-gt4-shop.jpg",
    href: "/porsche-collision-repair-sarasota",
  },
  {
    id: 7,
    title: "Lamborghini Urus",
    description: "Mid-rebuild — body in",
    imageSrc: "/work-gallery/07-urus-damaged-shop.jpg",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 8,
    title: "Lamborghini Urus",
    description: "Detail bay portrait",
    imageSrc: "/work-gallery/08-urus-matte-front.png",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 9,
    title: "Twin Uruses",
    description: "Same car — before and after",
    imageSrc: "/work-gallery/09-uruses-outside.jpg",
    href: "/lamborghini-collision-repair-sarasota",
  },
  {
    id: 10,
    title: "Porsche Cayman GT4",
    description: "Paint match + clear coat",
    imageSrc: "/work-gallery/10-cayman-gt4-small.png",
    href: "/porsche-collision-repair-sarasota",
  },
];

export default function BeforeAfterGallery() {
  return (
    <section
      id="work"
      className="bag-section relative overflow-hidden px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 scroll-mt-32"
    >
      {/* Subtle red breathing glow behind the carousel. Two stacked
          radial-gradient layers: a wide warm bed + a tighter ember core
          that pulses via opacity over ~8s. Pure CSS, no Three.js — pauses
          via prefers-reduced-motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200, 40, 29, 0.16) 0%, rgba(200, 40, 29, 0.08) 40%, rgba(200, 40, 29, 0) 75%)",
        }}
      />
      <div
        aria-hidden
        className="bag-pulse pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 50% 50%, rgba(200, 40, 29, 0.35) 0%, rgba(200, 40, 29, 0.18) 35%, rgba(200, 40, 29, 0) 70%)",
        }}
      />
      <style>{`
        @keyframes bag-breathing {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50%      { opacity: 0.85; transform: scale(1.08); }
        }
        .bag-pulse {
          animation: bag-breathing 8s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .bag-pulse { animation: none; opacity: 0.6; }
        }
      `}</style>
      <div className="relative z-10 mb-8 md:mb-10">
        <div className="font-display text-bone leading-none tracking-[-0.02em] text-3xl md:text-5xl">
          06
        </div>
        <p className="eyebrow mt-2">/ Selected work</p>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="display-lg mb-6 md:mb-8 text-center">
          <RevealWords>What came back better than new.</RevealWords>
        </h2>
        <CardStack
          items={works}
          maxVisible={7}
          cardWidth={760}
          cardHeight={480}
          loop
          autoAdvance
          intervalMs={4200}
          pauseOnHover
          showDots
        />
      </div>
    </section>
  );
}
