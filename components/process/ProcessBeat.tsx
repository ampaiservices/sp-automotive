"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Beat, Overlay } from "@/lib/process-narrative";
import PhoneCTA from "@/components/ui/PhoneCTA";

gsap.registerPlugin(ScrollTrigger);

// Each beat pins for this many vh of scroll; user "earns" the reveal.
const PIN_DISTANCE_VH = 200;

// Smooth 0..1 reveal that opens after `revealAt` and completes within ~0.25
function revealOpacity(progress: number, revealAt: number): number {
  return Math.max(0, Math.min(1, (progress - revealAt) * 4));
}

export default function ProcessBeat({ beat }: { beat: Beat }) {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obj = { p: 0 };
    const tween = gsap.to(obj, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (PIN_DISTANCE_VH / 100)}`,
        scrub: 0.5,
        pin: true,
        onRefreshInit: (self) => { triggerRef.current = self; },
      },
      onUpdate: () => setProgress(obj.p),
    });

    return () => {
      tween.kill();
      triggerRef.current?.kill(true);
      triggerRef.current = null;
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-bg">
      <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-12 gap-6 px-6 md:px-10 py-16">
        <div className="md:col-span-4 flex flex-col justify-center">
          <p className="eyebrow">{beat.eyebrow}</p>
          <h3 className="mt-4 display-lg">{beat.title}</h3>
          <p className="mt-6 lead max-w-md">{beat.copy}</p>
          {beat.showCta && (
            <div
              className="mt-8"
              style={{ opacity: revealOpacity(progress, 0.3), transition: "opacity 200ms" }}
            >
              <PhoneCTA size="lg" />
            </div>
          )}
        </div>

        <div className="md:col-span-8 relative hidden md:block">
          <OverlayLayer beat={beat} progress={progress} />
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted text-[10px] uppercase tracking-[0.3em]"
        style={{ opacity: 1 - progress }}
      >
        scroll
      </div>
    </section>
  );
}

function OverlayLayer({ beat, progress }: { beat: Beat; progress: number }) {
  // Paint layers stack vertically; everything else is positioned absolutely on the beat image.
  if (beat.id === "paint") {
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-end pr-6 gap-4">
        {beat.overlays.map((ov, i) => {
          if (ov.kind !== "layer") return null;
          const op = revealOpacity(progress, ov.revealAt);
          return (
            <div
              key={i}
              className="flex items-baseline gap-4 will-change-transform"
              style={{
                opacity: op,
                transform: `translateY(${(1 - op) * 12}px)`,
              }}
            >
              <span className="font-display text-3xl md:text-4xl text-accent tracking-wide">{ov.label}</span>
              <span className="text-sm uppercase tracking-[0.18em] text-muted">{ov.thickness}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      {beat.overlays.map((ov, i) => (
        <OverlayItem key={i} overlay={ov} progress={progress} />
      ))}
    </div>
  );
}

function OverlayItem({ overlay, progress }: { overlay: Overlay; progress: number }) {
  const op = revealOpacity(progress, overlay.revealAt);
  if (op <= 0) return null;

  if (overlay.kind === "callout") {
    return (
      <div
        className="absolute"
        style={{
          left: `${overlay.x}%`,
          top: `${overlay.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: op,
        }}
      >
        <Marker />
        <div className="ml-8 -mt-3">
          <div className="font-display text-3xl md:text-4xl text-accent tracking-wide leading-none">
            {overlay.text}
          </div>
          {overlay.sub && (
            <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted whitespace-nowrap">
              {overlay.sub}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (overlay.kind === "panel") {
    return (
      <div
        className="absolute will-change-transform"
        style={{
          left: `${overlay.x}%`,
          top: `${overlay.y}%`,
          transform: `translate(-50%, calc(-50% + ${(1 - op) * 16}px))`,
          opacity: op,
        }}
      >
        <Marker />
        <div className="ml-8 -mt-3 text-base md:text-lg uppercase tracking-[0.22em] text-accent whitespace-nowrap">
          {overlay.label}
        </div>
      </div>
    );
  }

  if (overlay.kind === "torque") {
    return (
      <div
        className="absolute"
        style={{
          left: `${overlay.x}%`,
          top: `${overlay.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: op,
        }}
      >
        <Marker />
        <div className="ml-8 -mt-3">
          <div className="font-display text-2xl md:text-3xl text-accent tracking-wide leading-none">
            {overlay.spec}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted">torque-spec</div>
        </div>
      </div>
    );
  }

  if (overlay.kind === "gap") {
    return (
      <div
        className="absolute"
        style={{
          left: `${overlay.x}%`,
          top: `${overlay.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: op,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-accent" />
          <div className="font-display text-xl text-accent tracking-wide whitespace-nowrap">
            {overlay.measurement}
          </div>
          <div className="h-px w-12 bg-accent" />
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted text-center">gap</div>
      </div>
    );
  }

  return null;
}

function Marker() {
  return (
    <span className="block w-3 h-3 rounded-full bg-accent ring-4 ring-accent/15" />
  );
}
