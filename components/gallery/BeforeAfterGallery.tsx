import Image from "next/image";

const pairs = [
  { id: 1, caption: "Lamborghini Huracán — front-end collision" },
  { id: 2, caption: "McLaren 720S — rear quarter rebuild" },
  { id: 3, caption: "Audi R8 — full repaint to spec" },
  { id: 4, caption: "BMW M4 — frame correction" },
];

export default function BeforeAfterGallery() {
  return (
    <section id="work" className="bg-bg px-6 md:px-10 py-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl text-accent tracking-wide mb-16">The Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pairs.map((p) => (
            <figure key={p.id}>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
                <div className="relative aspect-[4/3] border border-white/10 hover:border-accent transition-colors">
                  <Image
                    src={`/before-after/0${p.id}-before.jpg`}
                    alt={`${p.caption} — before repair`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div aria-hidden className="flex items-center justify-center text-accent font-display text-lg">VS</div>
                <div className="relative aspect-[4/3] border border-white/10 hover:border-accent transition-colors">
                  <Image
                    src={`/before-after/0${p.id}-after.jpg`}
                    alt={`${p.caption} — after repair`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <figcaption className="mt-4 text-sm text-muted">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
