"use client";
import { useEffect, useState } from "react";
import { BEATS } from "@/lib/process-narrative";
import ProcessBeat from "./ProcessBeat";
import ProcessNarrativeMobile from "./ProcessNarrativeMobile";

export default function ProcessNarrative() {
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
    setReady(true);
  }, []);

  if (!ready) {
    // Avoid SSR/CSR mismatch by deferring fallback decision until mounted.
    // Render the mobile shell as a safe default — replaced after mount on desktop.
    return <ProcessNarrativeMobile />;
  }

  if (reduced || isMobile) {
    return <ProcessNarrativeMobile />;
  }

  return (
    <section id="process" className="bg-bg">
      <div className="px-6 md:px-10 pt-24 pb-12">
        <p className="eyebrow">The Process</p>
        <h2 className="mt-4 display-lg">Six steps. One signature.</h2>
      </div>
      {BEATS.map((b) => (
        <ProcessBeat key={b.id} beat={b} />
      ))}
    </section>
  );
}
