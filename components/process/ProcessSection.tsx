"use client";
import { useState } from "react";
import ProcessCard from "./ProcessCard";

const cards = [
  { title: "The Assessment", summary: "We document every detail of the damage.", detail: "Every restoration starts with a forensic walkthrough. We photograph, measure, and catalog every panel, every gap, every component. Insurance adjusters get a report they can defend. You get clarity on what your car needs." },
  { title: "The Disassembly", summary: "We strip the car to its frame.", detail: "Removing every body panel reveals what insurance estimates often miss — frame stress, hidden fractures, suspension misalignment. We see what others can't until they're already in too deep." },
  { title: "The Diagnosis", summary: "We find what others miss.", detail: "Every panel gets inspected at the carbon-weave level. We mark damage, plan repairs, and decide what gets restored versus replaced. Factory tolerances are the only standard." },
  { title: "The Paint", summary: "We refinish to factory spec.", detail: "Our booth runs on the same paint codes Lamborghini uses. Same primer process. Same clear coat depth. Same gloss level. When your car comes out, the only way to tell it was ever damaged is the carfax — and we can help with that too." },
  { title: "The Reassembly", summary: "We build it back, panel by panel.", detail: "Every panel gets torque-spec installation. Every gap gets measured. Every alignment gets verified against factory data. The car doesn't leave until it's right." },
  { title: "The Return", summary: "Your car comes home, better than new.", detail: "When you pick up your car, it's not just repaired — it's refreshed. We detail the interior, deliver a complete restoration record, and stand behind every weld with our written warranty. Welcome home." },
];

export default function ProcessSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="process" className="bg-bg px-6 md:px-10 py-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl text-accent tracking-wide mb-16">The Process</h2>
        <div className="space-y-4">
          {cards.map((c, i) => (
            <ProcessCard
              key={i}
              index={i}
              title={c.title}
              summary={c.summary}
              detail={c.detail}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
