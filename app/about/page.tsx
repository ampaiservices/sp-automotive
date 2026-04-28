import FinalCTA from "@/components/cta/FinalCTA";

export const metadata = {
  title: "About Serge",
  description: "After years restoring exotics for private collectors, Serge opened SP Automotive in Sarasota, FL.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-bg px-6 md:px-10 py-32 pt-40">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-7xl md:text-9xl text-accent tracking-wide">Serge</h1>
          <div className="mt-12 aspect-[3/2] border border-white/10 bg-surface" aria-hidden />
          {/* TODO: replace placeholder block with portrait when provided */}

          <div className="mt-16 space-y-8 text-lg text-text/90 max-w-[65ch]">
            <p>{/* PLACEHOLDER bio paragraph 1 */}Serge has spent the last decade restoring exotics for private collectors across Florida. Cars came to him after the bigger shops gave up.</p>
            <p>{/* PLACEHOLDER paragraph 2 */}SP Automotive exists because every Lamborghini, every McLaren, every R8 deserves to come back exactly the way it left the factory — and most shops can&apos;t deliver that.</p>
            <p>{/* PLACEHOLDER paragraph 3 */}Every job is signed off by Serge personally. No subcontractors. No shortcuts. No surprises.</p>
          </div>

          <h2 className="mt-24 font-display text-4xl text-accent tracking-wide">What I work on</h2>
          <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 text-text/90">
            {["Lamborghini","McLaren","Audi R8","BMW M-series","Ferrari","Porsche"].map((m) => (
              <li key={m} className="border border-white/10 px-4 py-3">{m}</li>
            ))}
          </ul>

          <h2 className="mt-24 font-display text-4xl text-accent tracking-wide">How I work</h2>
          <p className="mt-6 text-lg text-text/90 max-w-[65ch]">{/* PLACEHOLDER */}Forensic intake. Factory-spec process. Direct communication with the owner at every milestone.</p>

          <h2 className="mt-24 font-display text-4xl text-accent tracking-wide">Why this matters</h2>
          <p className="mt-6 text-lg text-text/90 max-w-[65ch]">{/* PLACEHOLDER */}Your car is more than transportation. It&apos;s a build. We treat it that way.</p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
