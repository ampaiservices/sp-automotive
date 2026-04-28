"use client";
import PhoneCTA from "@/components/ui/PhoneCTA";

export const BEATS = [
  { copy: "It happens to the best of us." },
  { copy: "Then it comes to us." },
  { copy: "Every flaw — found." },
  { copy: "Every detail — restored." },
  { copy: "Every panel — perfect." },
  { copy: "Welcome home.", reveal: true },
];

export function BeatCopy({ index, opacity, ctaOpacity = 1 }: { index: number; opacity: number; ctaOpacity?: number }) {
  const b = BEATS[index];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-col items-center text-center px-6" style={{ opacity }}>
      <h2 className="font-display text-4xl md:text-6xl text-accent tracking-wide max-w-3xl">{b.copy}</h2>
      {b.reveal && (
        <div className="pointer-events-auto mt-8" style={{ opacity: ctaOpacity, transition: "opacity 600ms ease-out" }}>
          <PhoneCTA size="lg" />
        </div>
      )}
    </div>
  );
}
