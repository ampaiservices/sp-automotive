import PhoneCTA from "@/components/ui/PhoneCTA";
import ParticleField from "@/components/effects/ParticleField";

export default function FinalCTA() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/showroom/aventador-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/showroom/aventador.mp4" type="video/mp4" />
        <source src="/showroom/aventador.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/70" />
      <ParticleField count={70} color="255, 255, 255" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted">Got photos of the damage?</p>
        <h2 className="mt-6 font-display text-5xl md:text-8xl text-accent tracking-wide max-w-5xl">Send them. We&apos;ll tell you what it&apos;ll take.</h2>
        <div className="mt-10"><PhoneCTA size="lg" /></div>
        <p className="mt-6 text-sm text-muted">Or text photos to the same number.</p>
      </div>
    </section>
  );
}
