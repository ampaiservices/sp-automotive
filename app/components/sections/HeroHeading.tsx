"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * H1 for the hero. Lives inside the black-background block on the left
 * column, so text is white. Entrance fade+slide on mount, skipped under
 * prefers-reduced-motion.
 */
export function HeroHeading() {
  const reduce = useReducedMotion();
  const props = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" as const },
      };

  return (
    <motion.h1
      {...props}
      className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
    >
      Crashed? We&rsquo;ve Got You Covered.
    </motion.h1>
  );
}
