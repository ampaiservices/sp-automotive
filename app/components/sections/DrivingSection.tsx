"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * DrivingSection — three-column section that will eventually have the
 * bird's-eye Porsche driving down the center column on scroll. This pass:
 * compact layout (~110vh tall on desktop), real bird's-eye image as the
 * sticky placeholder, simplified flat-dark road awaiting the user's own
 * road artwork.
 *
 * Desktop layout (lg+):
 *   ┌─────────┬─────────────┬─────────┐
 *   │ insur-  │   road      │ services│
 *   │ ance    │   (sticky   │  card   │
 *   │ card    │    bird's-  │         │
 *   │         │    eye      │         │
 *   │         │    porsche) │         │
 *   │ ~28%    │   ~36%      │  ~28%   │
 *   └─────────┴─────────────┴─────────┘
 *   total height: ~110vh — just over a fullscreen so there's a touch of
 *   scroll runway for the future GSAP-driven car movement, but nowhere
 *   near the previous 250vh.
 *
 * Mobile (<lg): stacks insurance card → bird's-eye + road snippet → services
 * card.
 *
 * Stacking: the section is `relative z-0` (low z) so the SmokyTransition
 * above it (`z-20`) can use a negative bottom-margin to overlap the top
 * of this section. The sticky bird's-eye car renders BEHIND the smoke in
 * that overlap zone — it appears to drive out of the cloud as the user
 * scrolls past the transition.
 */

const insuranceContent = [
  "Specialists in exotic and rental vehicle claims. When the cost to repair exceeds 70% of your car's value, totaling out is often the smarter move — and we'll help you get paid in full, with the potential for an additional $10,000–$20,000 above your purchase price depending on how the market has shifted.",
  "We handle the insurance side so you don't have to. Most body shops pocket the profit and forget about the owner. We fight to make sure you walk away paid in full — and ahead.",
  "Your car stays in our enclosed, secure facility for the entire repair process. Totaled or not, your vehicle is protected from the moment it arrives.",
  "Direct billing with every major carrier — Geico, State Farm, Progressive, Allstate, USAA, Liberty Mutual, AAA. You pay your deductible; we handle everything else, including supplements when hidden damage shows up after the teardown.",
  "When the carrier's actual cash value offer comes in low, we file the dispute on your behalf. Recent comparable listings, mileage adjustments, market appreciation — the paperwork sits on our side of the desk, not yours.",
];

const servicesContent = [
  "We come to you. Mobile estimates available based on your location and the extent of damage — saving you a tow and a trip.",
  "Estimates typically completed within 1–2 days. Once approved, repairs begin immediately.",
  "Open Monday through Saturday. Talk to a real human, not a call center.",
  "In-house spray booth tuned for the demanding finishes exotic manufacturers use — multi-stage candies, color-shifting metallics, raw-carbon clears. Porsche, Lamborghini, Ferrari, McLaren, Aston Martin, Bentley are routine work for us.",
  "OEM and OEM-equivalent parts only. Every fastener, every bracket, every panel sourced to factory spec — because what holds your car together matters as much as what shows on the surface.",
];

export function DrivingSection() {
  return (
    <section
      id="services"
      aria-label="Insurance and services"
      className="relative z-0 w-full bg-gradient-to-b from-white via-[#FAFBFC] to-[#F4F5F7] lg:min-h-[110vh]"
    >
      <div
        className="
          mx-auto grid w-full max-w-[1600px]
          grid-cols-1 gap-y-12 px-6 py-16
          sm:px-10
          lg:grid-cols-[28%_36%_28%] lg:gap-x-[4%] lg:gap-y-0 lg:px-12 lg:py-0
        "
      >
        <ContentCard heading="Insurance Done Right" blocks={insuranceContent} />

        <CenterColumn />

        <ContentCard
          heading="Body Work & Mobile Estimates"
          blocks={servicesContent}
        />
      </div>
    </section>
  );
}

/**
 * One side card — heading on top, a wrapper with the 3 motion-revealed text
 * blocks below. Two separate spacings:
 *   • heading → first block: ~3 lines of body text (`mt-12` mobile / `lg:mt-20`)
 *   • block → block: ~1–2 lines (`gap-6` mobile / `lg:gap-8`)
 *
 * Earlier versions used a single `flex gap-[15vh]` on the aside which spread
 * the heading and all blocks the same huge distance apart — visually fine
 * for scroll-runway pacing but disconnected the heading from its content.
 * The two-tier spacing puts the heading close to its body while the blocks
 * still breathe between each other.
 */
function ContentCard({
  heading,
  blocks,
}: {
  heading: string;
  blocks: string[];
}) {
  return (
    <aside
      className="
        flex flex-col
        rounded-2xl border border-charcoal/10 bg-off-white p-8 shadow-sm
        lg:my-[5vh] lg:p-10
      "
    >
      <h3 className="text-3xl font-bold tracking-tight text-black lg:text-4xl">
        {heading}
      </h3>

      <div className="mt-12 flex flex-col gap-6 lg:mt-20 lg:gap-8">
        {blocks.map((text, i) => (
          <RevealBlock key={i} text={text} delay={i * 0.08} />
        ))}
      </div>
    </aside>
  );
}

/**
 * One revealable text block: thin accent line above, body copy below. Fades
 * up on scroll-into-view via Motion's `whileInView`. Skipped under
 * prefers-reduced-motion.
 */
function RevealBlock({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="flex flex-col gap-4"
    >
      <span aria-hidden className="block h-px w-12 bg-black/30" />
      <p className="text-base leading-relaxed text-charcoal lg:text-lg">
        {text}
      </p>
    </motion.div>
  );
}

/**
 * Center column — flat dark road backdrop with the bird's-eye Porsche image
 * as a sticky placeholder. The road is intentionally minimal (no lane
 * markings) until the user provides their own road artwork; we'll swap the
 * `<Road>` body for an `<Image>` of that asset when it arrives.
 *
 * Sticky pattern: `top: 50%; transform: translateY(-50%)` keeps the car
 * vertically centered in the viewport once the column's natural top crosses
 * 50vh, until the column's bottom passes that line.
 */
function CenterColumn() {
  return (
    <>
      {/* Desktop: full-height road backdrop with sticky bird's-eye car */}
      <div className="relative hidden lg:block">
        <Road />
        <div className="sticky top-1/2 z-10 mx-auto h-[460px] w-[260px] -translate-y-1/2 overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40">
          <Image
            src="/images/birds-eye.jpeg"
            alt="Bird's-eye view of the Porsche"
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Mobile: short static placeholder so the visual concept reads */}
      <div className="relative flex h-[60vh] items-center justify-center lg:hidden">
        <Road />
        <div className="relative z-10 h-[340px] w-[190px] overflow-hidden rounded-[1.5rem] shadow-2xl shadow-black/40">
          <Image
            src="/images/birds-eye.jpeg"
            alt="Bird's-eye view of the Porsche"
            fill
            sizes="190px"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}

/**
 * Road backdrop — flat dark asphalt strip behind the sticky car. Lane
 * markings have been removed pending the user's own road image; this is a
 * neutral placeholder. Top/bottom mask gradients fade the strip into the
 * surrounding section so it doesn't terminate with a hard edge.
 */
function Road() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[#1F2024]" />
    </div>
  );
}
