"use client";
import { useState } from "react";
import PhoneCTA from "@/components/ui/PhoneCTA";
import Button from "@/components/ui/Button";

// Note: cannot use `export const metadata` in a client component.
// Page-level metadata is inherited from app/layout.tsx for now; revisit post-v1 if /contact needs custom OG.

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    console.log({ name, phone, car, desc, files: files ? Array.from(files).map((f) => f.name) : [] });
    setSent(true);
  }

  const inputCls = "w-full bg-surface border border-white/10 focus:border-accent outline-none px-4 py-3 text-text placeholder:text-muted transition-colors";

  return (
    <section className="bg-bg px-6 md:px-10 py-32 pt-40">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-5xl md:text-7xl text-accent tracking-wide">Talk to Serge directly.</h1>
        <div className="mt-8"><PhoneCTA size="lg" /></div>

        {!sent ? (
          <div className="mt-16 space-y-6">
            <input className={inputCls} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={inputCls} type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input className={inputCls} placeholder="Car make / model" value={car} onChange={(e) => setCar(e.target.value)} />
            <textarea className={inputCls} rows={5} placeholder="Brief description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input className={`${inputCls} file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-accent file:text-bg file:cursor-pointer`} type="file" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
            <Button variant="primary" onClick={handleSubmit}>Send to Serge</Button>
          </div>
        ) : (
          <div className="mt-16 border border-accent p-8">
            <p className="font-display text-2xl text-accent">We got it.</p>
            <p className="mt-3 text-muted">Serge will be in touch within 24 hours.</p>
          </div>
        )}
      </div>
    </section>
  );
}
