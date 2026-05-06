import RevealWords from "@/components/effects/RevealWords";
import Surface from "@/components/ui/Surface";

export default function StorageBlock() {
  return (
    <section
      className="relative min-h-[100svh] w-full flex items-center px-6 md:px-10 py-32"
      aria-labelledby="storage-heading"
    >
      <Surface
        variant="solid"
        className="max-w-3xl mx-auto rounded-md py-20 px-6 md:px-12"
      >
        <p className="eyebrow">03 / Indoor storage</p>
        <h2 id="storage-heading" className="mt-4 display-md">
          <RevealWords>Inside. Always.</RevealWords>
        </h2>
        <p className="mt-8 lead max-w-[60ch]">
          Every car lives behind a locked roll-up — totaled, mid-job, awaiting
          parts, ready for pickup. Climate controlled. Monitored. Keys with
          Serge, not on a board.
        </p>
        <p className="mt-6 lead max-w-[60ch] text-muted">
          If overflow ever forces a different arrangement, you&apos;ll know
          before it happens.
        </p>
      </Surface>
    </section>
  );
}
