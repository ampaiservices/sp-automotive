"use client";
import { motion } from "framer-motion";
import { BEATS } from "./HeroBeats";
import { FRAMES, BEAT_COUNT, FRAMES_PER_BEAT } from "@/lib/hero-frames";
import PhoneCTA from "@/components/ui/PhoneCTA";

// Pick one representative frame per beat (start of each beat segment)
const beatFrames = Array.from({ length: BEAT_COUNT }, (_, i) =>
  FRAMES[Math.min(FRAMES.length - 1, i * FRAMES_PER_BEAT)]
);

export default function HeroMobileFallback() {
  return (
    <section className="bg-bg">
      {BEATS.map((b, i) => (
        <motion.div
          key={i}
          className="relative h-screen w-full flex items-end justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={beatFrames[i]} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 mb-16 px-6 text-center">
            <h2 className="font-display text-4xl text-accent tracking-wide">{b.copy}</h2>
            {b.reveal && <div className="mt-6"><PhoneCTA /></div>}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
