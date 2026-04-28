import Link from "next/link";

export default function AboutStrip() {
  return (
    <section className="bg-bg px-6 md:px-10 py-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-6xl text-accent tracking-wide">Built by Serge in Sarasota.</h2>
        <p className="mt-8 text-lg text-muted max-w-[65ch]">
          After years restoring exotics for private collectors, Serge opened SP Automotive to bring factory-grade collision repair to the cars most shops won&apos;t touch. Lamborghinis, McLarens, Audi R8s, BMW M-series. If it costs more than a house, it belongs here.
        </p>
        <Link href="/about" className="inline-block mt-8 text-accent border-b border-transparent hover:border-accent transition-colors uppercase tracking-[0.18em] text-sm">Read more →</Link>
      </div>
    </section>
  );
}
