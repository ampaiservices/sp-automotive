"use client";
import { motion } from "framer-motion";
import { PUBLISHED_TESTIMONIALS, type Testimonial } from "./testimonials-data";
import RevealWords from "@/components/effects/RevealWords";

type Props = {
  brand?: string;          // Filter to a specific brand (used on brand pages)
  heading?: string;        // Override the section heading
};

export default function TestimonialsSection({ brand, heading = "From the owners." }: Props) {
  const items: Testimonial[] = brand
    ? PUBLISHED_TESTIMONIALS.filter((t) => t.brand === brand)
    : PUBLISHED_TESTIMONIALS;

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="bg-bg px-6 md:px-10 py-32 border-t border-divider">
      <div className="max-w-7xl mx-auto">
        <p className="eyebrow">04 / Trust</p>
        <h2 className="mt-4 display-lg"><RevealWords>{heading}</RevealWords></h2>

        <ul className="mt-16 space-y-16 max-w-3xl">
          {items.map((t, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            >
              <blockquote className="font-display text-3xl md:text-5xl text-text/95 tracking-wide leading-tight">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-px w-10 bg-accent" />
                <div className="text-xs uppercase tracking-[0.22em] text-muted">
                  {t.author} <span className="text-accent">·</span> {t.car}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
