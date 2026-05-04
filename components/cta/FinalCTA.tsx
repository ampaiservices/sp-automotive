import PhoneCTA from "@/components/ui/PhoneCTA";
import SmsCTA from "@/components/ui/SmsCTA";

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-bg flex flex-col items-center text-center px-6 pt-32 pb-32">
      <p className="eyebrow">Got photos of the damage?</p>
      <h2 className="mt-3 display-md max-w-3xl">Send them. We&apos;ll tell you what it&apos;ll take.</h2>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <PhoneCTA size="lg" location="final-cta" />
        <SmsCTA location="final-cta" />
      </div>
    </section>
  );
}
