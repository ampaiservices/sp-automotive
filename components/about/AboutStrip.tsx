import Link from "next/link";

export default function AboutStrip() {
  return (
    <section className="bg-bg px-6 md:px-10 py-32">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow">The man on the work</p>
        <h2 className="mt-4 display-md">Built by Serge in Sarasota.</h2>
        <p className="mt-8 lead max-w-[65ch]">
          If your car is worth more than most houses, the dealer&apos;s body shop is not the answer.
          Serge built SP Automotive in Sarasota for the cars they won&apos;t touch —{" "}
          <Link href="/lamborghini-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">Lamborghinis</Link>,{" "}
          <Link href="/mclaren-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">McLarens</Link>,{" "}
          <Link href="/audi-r8-collision-repair-sarasota" className="text-accent border-b border-transparent hover:border-accent transition-colors">R8s</Link>,
          BMW M. Forensic intake. Factory-spec repair. One signature on every job: his.
        </p>
        <Link
          href="/about"
          className="inline-block mt-10 text-accent border-b border-accent/30 hover:border-accent transition-colors uppercase tracking-[0.18em] text-sm"
        >
          Read more →
        </Link>
      </div>
    </section>
  );
}
