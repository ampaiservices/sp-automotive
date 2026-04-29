import PhoneCTA from "@/components/ui/PhoneCTA";
import type { Brand } from "./brands-data";

export default function BrandHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative bg-bg pt-32 md:pt-44 pb-20 md:pb-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">{brand.eyebrow}</p>
        <h1 className="mt-5 font-display text-[3.25rem] md:text-[7.5rem] text-accent tracking-tight leading-[0.92]">
          {brand.headline}
        </h1>
        <p className="mt-8 max-w-3xl text-lg md:text-xl text-text/85">{brand.intro}</p>
        <div className="mt-10">
          <PhoneCTA size="lg" />
        </div>
      </div>
    </section>
  );
}
