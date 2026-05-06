import RevealWords from "@/components/effects/RevealWords";
import Surface from "@/components/ui/Surface";

export default function InsuranceHandling() {
  return (
    <section
      className="relative min-h-[100svh] w-full flex items-center px-6 md:px-10 py-32"
      aria-labelledby="insurance-handling-heading"
    >
      <Surface
        variant="solid"
        className="max-w-3xl mx-auto rounded-md py-20 px-6 md:px-12"
      >
        <p className="eyebrow">02 / We handle the carrier</p>
        <h2 id="insurance-handling-heading" className="mt-4 display-md">
          <RevealWords>We fight the file. You stay out of it.</RevealWords>
        </h2>
        <p className="mt-8 lead max-w-[60ch]">
          Most body shops file the claim, take the margin, hand you the keys.
          Different math here. We document, supplement, negotiate — adjuster to
          estimator, line item to line item — until the carrier pays for the
          car you actually own.
        </p>
        <p className="mt-6 lead max-w-[60ch] text-muted">
          You don&apos;t see the friction. You see the result.
        </p>
      </Surface>
    </section>
  );
}
