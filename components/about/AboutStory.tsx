// Owner-letter voice — the bio is written in second person, addressed to the
// owner who just crashed. Edit any paragraph; structure stays the same.

export default function AboutStory() {
  return (
    <section className="bg-bg px-6 md:px-10 py-24 md:py-32 border-t border-divider">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow">A note from Serge</p>
        <h2 className="mt-4 display-md">You called the right shop.</h2>

        <div className="editorial mt-12 space-y-7 max-w-[65ch] text-lg">
          <p>
            Your insurance company is going to push you toward the cheapest body shop on their
            list. I&apos;m not on that list. There&apos;s a reason for that — and it&apos;s the
            same reason you ended up here.
          </p>
          <p>
            I&apos;ve spent the last decade restoring exotics for private collectors across
            Florida. Cars came to me after the bigger shops gave up — Aventadors with
            misaligned clamshells, McLarens with carbon-tub damage the dealer wouldn&apos;t touch,
            R8 V10s that needed paint matched in a booth that didn&apos;t exist within a
            three-hour drive. I learned what factory-correct actually means by being told
            &ldquo;close enough&rdquo; and refusing it.
          </p>
          <p>
            SP Automotive exists because every Lamborghini, every McLaren, every R8, every BMW M
            deserves to come back exactly the way it left the factory. Most shops can&apos;t
            deliver that. Some don&apos;t even try.
          </p>

          <blockquote className="border-l-2 border-accent pl-6 my-12 font-display text-2xl md:text-3xl text-accent leading-[1.15]">
            Forensic intake. Factory-spec process.
            One signature on every job — mine.
          </blockquote>

          <p>
            Here&apos;s how it works when you bring me your car. We document everything in the
            first walkthrough — every panel, every gap, every component, photographed and
            measured. Your insurance adjuster gets a report they can defend. You get clarity
            on what your car actually needs.
          </p>
          <p>
            Then we strip it. Every panel comes off. We see what insurance estimates miss —
            frame stress, hidden fractures, suspension misalignment, the things only
            disassembly reveals. The plan changes if it has to. We tell you when it does.
          </p>
          <p>
            Paint is mixed in a booth that runs the same codes the factory uses. Same primer
            process. Same clear coat depth. Same gloss. Layered — not sprayed — so the only way
            to tell your car was ever damaged is the carfax. We can help with that too.
          </p>
          <p>
            Reassembly is to torque-spec. Every gap measured against factory data. Every
            alignment verified. The car doesn&apos;t leave my shop until it&apos;s right.
          </p>
          <p>
            No subcontractors. No shortcuts. No surprises on the invoice. When you pick up your
            car, you get a complete restoration record and a written warranty backed by the
            person who did the work.
          </p>
          <p className="text-text">
            Your car is more than transportation. It&apos;s a build. I treat it that way.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
          {["Lamborghini", "McLaren", "Audi R8", "BMW M", "Ferrari", "Porsche"].map((m) => (
            <div key={m} className="border border-white/10 px-4 py-3 text-sm text-text/85">
              {m}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          If you don&apos;t see your model — call. We&apos;ve worked on cars older than this list.
        </p>
      </div>
    </section>
  );
}
