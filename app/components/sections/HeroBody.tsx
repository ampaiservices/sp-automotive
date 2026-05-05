"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Subhead + CTA + tel link. Lives inside the now-fully-black left column,
 * so all text is light and the CTA is inverted (white-on-black) to remain
 * visible against the dark background. Cascade entrance: subhead at +200ms,
 * CTA group at +400ms (matched to HeroHeading's 0ms entry). Skipped under
 * prefers-reduced-motion.
 */
export function HeroBody() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <div className="flex max-w-md flex-col gap-6">
      <motion.p
        {...fade(0.2)}
        className="text-base leading-relaxed text-white/75 sm:text-lg lg:text-xl"
      >
        We work directly with your insurance company to handle your repair from
        start to finish &mdash; so you don&rsquo;t have to.
      </motion.p>

      <motion.div
        {...fade(0.4)}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
      >
        <button
          type="button"
          className="rounded-md bg-white px-6 py-3.5 font-medium text-black transition-colors hover:bg-off-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cool-blue"
        >
          Get a Free Estimate
        </button>
        <a
          href="tel:5551234567"
          className="text-white/80 underline-offset-4 hover:text-white hover:underline focus-visible:underline focus-visible:outline-none"
        >
          Or call us: (555) 123-4567
        </a>
      </motion.div>
    </div>
  );
}
