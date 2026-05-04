import HeroVideo from "@/components/hero/HeroVideo";
import HeroSequence from "@/components/hero/HeroSequence";
import BeforeAfterGallery from "@/components/gallery/BeforeAfterGallery";
import ShowroomSection from "@/components/showroom/ShowroomSection";
import StatReveal from "@/components/home/StatReveal";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import VideoTestimonials from "@/components/testimonials/VideoTestimonials";
import AboutStrip from "@/components/about/AboutStrip";
import FinalCTA from "@/components/cta/FinalCTA";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">SP Automotive Collision &amp; Repair — factory-grade collision repair for exotic cars in Sarasota, FL</h1>
      <HeroVideo />
      <HeroSequence />
      <ShowroomSection />
      <StatReveal />
      <BeforeAfterGallery />
      <TestimonialsSection />
      <AboutStrip />
      <VideoTestimonials />
      <FinalCTA />
    </>
  );
}
