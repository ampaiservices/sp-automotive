import PhoneCTA from "@/components/ui/PhoneCTA";
import ParticleField from "@/components/effects/ParticleField";

// Ambient-dark FinalCTA: no video (the Aventador video is reserved for the hero
// only). Two slow-drifting radial-gradient "blobs" + a particle field create
// atmosphere without reusing footage.

export default function FinalCTA() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050506]">
      {/* Ambient gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
          animation: "finalcta-blob-a 16s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[800px] h-[800px] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 60%)",
          animation: "finalcta-blob-b 22s ease-in-out infinite",
        }}
      />

      <ParticleField count={80} color="255, 255, 255" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted">Got photos of the damage?</p>
        <h2 className="mt-6 font-display text-5xl md:text-8xl text-accent tracking-wide max-w-5xl">
          Send them. We&apos;ll tell you what it&apos;ll take.
        </h2>
        <div className="mt-10"><PhoneCTA size="lg" /></div>
        <p className="mt-6 text-sm text-muted">Or text photos to the same number.</p>
      </div>

      <style>{`
        @keyframes finalcta-blob-a {
          0%,100% { transform: translate(0, 0) scale(1); }
          50%     { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes finalcta-blob-b {
          0%,100% { transform: translate(0, 0) scale(1); }
          50%     { transform: translate(-50px, -30px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
