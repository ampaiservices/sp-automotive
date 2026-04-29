import PhoneCTA from "@/components/ui/PhoneCTA";
import RevealWords from "@/components/effects/RevealWords";

export default function FinalCTA() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg flex flex-col items-center justify-center text-center px-6">
      <p className="eyebrow">07 / Got photos of the damage?</p>
      <h2 className="mt-5 display-lg max-w-5xl">
        <RevealWords>Send them. We&apos;ll tell you what it&apos;ll take.</RevealWords>
      </h2>
      <div className="mt-10"><PhoneCTA size="lg" /></div>
      <p className="mt-6 text-sm text-muted">Or text photos to the same number.</p>
    </section>
  );
}
