import RevealWords from "@/components/effects/RevealWords";
import Surface from "@/components/ui/Surface";
import PhoneCTA from "@/components/ui/PhoneCTA";
import SmsCTA from "@/components/ui/SmsCTA";

export default function BodyworkAndEstimates() {
  return (
    <section
      className="relative min-h-[100svh] w-full flex items-center px-6 md:px-10 py-32"
      aria-labelledby="bodywork-estimates-heading"
    >
      <Surface
        variant="solid"
        className="max-w-3xl mx-auto rounded-md py-20 px-6 md:px-12"
      >
        <p className="eyebrow">04 / Estimate without the haul</p>
        <h2 id="bodywork-estimates-heading" className="mt-4 display-md">
          <RevealWords>We come to you.</RevealWords>
        </h2>
        <p className="mt-8 lead max-w-[60ch]">
          Cars that can&apos;t move don&apos;t have to. We bring the estimate
          to your driveway, your garage, your storage unit — wherever the car
          is. One to two days from the call to the written number.
        </p>
        <p className="mt-6 lead max-w-[60ch] text-muted">
          Six days a week. Monday through Saturday.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <PhoneCTA size="lg" location="bodywork-estimates" />
          <SmsCTA location="bodywork-estimates" />
        </div>
      </Surface>
    </section>
  );
}
