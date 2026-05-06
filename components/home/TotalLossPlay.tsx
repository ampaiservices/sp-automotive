import RevealWords from "@/components/effects/RevealWords";
import Surface from "@/components/ui/Surface";

export default function TotalLossPlay() {
  return (
    <section
      className="relative min-h-[100svh] w-full flex items-center px-6 md:px-10 py-32"
      aria-labelledby="total-loss-heading"
    >
      <Surface
        variant="solid"
        className="max-w-3xl mx-auto rounded-md py-20 px-6 md:px-12"
      >
        <p className="eyebrow">01 / The total-loss play</p>
        <h2 id="total-loss-heading" className="mt-4 display-md">
          <RevealWords>70% of value. The math turns.</RevealWords>
        </h2>
        <p className="mt-8 lead max-w-[60ch]">
          When the cost to repair crosses 70% of what the car is worth, the
          carrier owes you the car — not a patched copy of it. Settled in full.
          And on cars that have appreciated since you bought them, often
          $10–20k above what you paid.
        </p>
        <p className="mt-6 lead max-w-[60ch] text-muted">
          We document the damage. We make the case. The carrier writes the
          check.
        </p>
      </Surface>
    </section>
  );
}
