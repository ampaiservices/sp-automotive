import PhoneCTA from "@/components/ui/PhoneCTA";

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-bg flex flex-col items-center text-center px-6 pt-32 pb-32">
      <p className="eyebrow">Got photos of the damage?</p>
      <h2 className="mt-3 display-md max-w-3xl">Send them. We&apos;ll tell you what it&apos;ll take.</h2>
      <div className="mt-6"><PhoneCTA size="lg" /></div>
      <p className="mt-3 text-sm text-muted">Or text photos to the same number.</p>
    </section>
  );
}
