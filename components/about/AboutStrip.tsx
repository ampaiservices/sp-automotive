import Link from "next/link";

// Pivot from "you found the right shop" (already covered in hero + AboutStory)
// to the proof-of-craft angle: what the shop is, what it isn't, what it
// touches. Earns the "Read more" click instead of restating the welcome.
export default function AboutStrip() {
  return (
    <section className="bg-bg px-6 md:px-10 py-32">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow">No subcontractors. No shortcuts.</p>
        <h2 className="mt-4 display-md">One shop. One signature. Every weld.</h2>
        <p className="mt-8 lead max-w-[65ch]">
          SP Automotive is Serge — start to finish. He documents the intake himself.
          He runs the booth. He measures the gaps. The cars he&apos;s built his name on —{" "}
          <Link href="/lamborghini-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">Lamborghinis</Link>,{" "}
          <Link href="/mclaren-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">McLarens</Link>,{" "}
          <Link href="/audi-r8-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">R8s</Link>,
          BMW M — leave the same way they came in: with one set of fingerprints on the work.
        </p>
        <Link
          href="/about"
          className="inline-block mt-10 text-accent border-b border-accent/30 hover:border-accent transition-colors uppercase tracking-[0.18em] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Read more about Serge →
        </Link>
      </div>
    </section>
  );
}
