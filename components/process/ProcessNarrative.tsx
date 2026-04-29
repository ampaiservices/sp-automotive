"use client";
import { BEATS } from "@/lib/process-narrative";
import ProcessBeat from "./ProcessBeat";
import ProcessNarrativeMobile from "./ProcessNarrativeMobile";
import RevealWords from "@/components/effects/RevealWords";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function ProcessNarrative() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Server snapshot is `true` so SSR (and the first client render before
  // hydration) renders the mobile shell as a safe default — matches the
  // previous behavior, swaps to desktop after hydration on wide viewports.
  const isMobile = useMediaQuery("(max-width: 767px)", true);

  if (reduced || isMobile) {
    return <ProcessNarrativeMobile />;
  }

  return (
    <section id="process" className="bg-bg">
      <div className="px-6 md:px-10 pt-24 pb-12">
        <p className="eyebrow">03 / The Process</p>
        <h2 className="mt-4 display-lg">
          <RevealWords>Six steps. One signature.</RevealWords>
        </h2>
      </div>
      {BEATS.map((b) => (
        <ProcessBeat key={b.id} beat={b} />
      ))}
    </section>
  );
}
