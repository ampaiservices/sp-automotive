"use client";
import { BEATS } from "@/lib/process-narrative";
import ProcessBeat from "./ProcessBeat";
import ProcessNarrativeMobile from "./ProcessNarrativeMobile";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function ProcessNarrative({ as: Heading = "h1" }: { as?: "h1" | "h2" } = {}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  // Server snapshot is `true` so SSR (and the first client render before
  // hydration) renders the mobile shell as a safe default — matches the
  // previous behavior, swaps to desktop after hydration on wide viewports.
  const isMobile = useMediaQuery("(max-width: 767px)", true);

  if (reduced || isMobile) {
    return <ProcessNarrativeMobile as={Heading} />;
  }

  return (
    <section id="process" className="bg-bg">
      <div className="px-6 md:px-10 pt-32 pb-0 text-center max-w-5xl mx-auto">
        <Heading className="display-lg uppercase">The Process</Heading>
        <p className="mt-3 lead text-muted">Six steps. One signature.</p>
      </div>
      {BEATS.map((b) => (
        <ProcessBeat key={b.id} beat={b} />
      ))}
    </section>
  );
}
