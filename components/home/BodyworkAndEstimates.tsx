import CornerSection from "./CornerSection";
import SectionParallaxImage from "@/components/effects/SectionParallaxImage";
import PhoneCTA from "@/components/ui/PhoneCTA";
import SmsCTA from "@/components/ui/SmsCTA";

export default function BodyworkAndEstimates() {
  return (
    <div className="relative isolate overflow-hidden">
      <SectionParallaxImage
        src="/sections/ch06-urus-stripped.jpg"
        alt="Black Lamborghini Urus mid-restoration with front fender removed in SP Automotive's hex-neon detail bay, Sarasota"
        objectPosition="center 65%"
      />
      <CornerSection
        chapterNumber="04"
        eyebrow="Estimate without the haul"
        headingId="bodywork-estimates-heading"
        scrubTime={24}
        animation="tilt"
        headline={"We come to you."}
        body={
          <>
            <p>
              Cars that can&apos;t move don&apos;t have to. We bring the estimate
              to your driveway, your garage, your storage unit — wherever the
              car is. One to two days from the call to the written number.
            </p>
            <p className="mt-6 text-graphite">
              Monday through Saturday.
            </p>
          </>
        }
        cta={
          <>
            <PhoneCTA size="lg" location="bodywork-estimates" />
            <SmsCTA location="bodywork-estimates" />
          </>
        }
      />
    </div>
  );
}
