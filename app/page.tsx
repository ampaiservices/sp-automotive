import HeroScrollSequence from "@/components/hero/HeroScrollSequence";
import ProcessSection from "@/components/process/ProcessSection";
import BeforeAfterGallery from "@/components/gallery/BeforeAfterGallery";
import AboutStrip from "@/components/about/AboutStrip";
import FinalCTA from "@/components/cta/FinalCTA";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">SP Automotive Collision &amp; Repair — factory-grade collision repair for exotic cars in Sarasota, FL</h1>
      <HeroScrollSequence />
      <ProcessSection />
      <BeforeAfterGallery />
      <AboutStrip />
      <FinalCTA />
    </>
  );
}
