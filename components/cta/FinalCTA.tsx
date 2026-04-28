import PhoneCTA from "@/components/ui/PhoneCTA";

export default function FinalCTA() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg">
      {/* Use poster as fallback; once /hero-360-rotation.mp4 is dropped in, the video plays. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero-frames/06-reveal.webp" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <video
        src="/hero-360-rotation.mp4"
        poster="/hero-frames/06-reveal.webp"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted">Got photos of the damage?</p>
        <h2 className="mt-6 font-display text-5xl md:text-8xl text-accent tracking-wide max-w-5xl">Send them. We&apos;ll tell you what it&apos;ll take.</h2>
        <div className="mt-10"><PhoneCTA size="lg" /></div>
        <p className="mt-6 text-sm text-muted">Or text photos to the same number.</p>
      </div>
    </section>
  );
}
