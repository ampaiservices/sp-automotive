"use client";
import { useState } from "react";
import PhoneCTA from "@/components/ui/PhoneCTA";
import Button from "@/components/ui/Button";

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

  const labelCls = "block text-xs uppercase tracking-[0.22em] text-muted mb-2";
  const inputCls =
    "w-full bg-surface border border-white/10 focus:border-accent focus-visible:outline-2 focus-visible:outline focus-visible:outline-accent focus-visible:outline-offset-2 px-4 py-3 text-text placeholder:text-muted transition-colors";

  return (
    <section className="bg-bg px-6 md:px-10 py-32 pt-40">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-4 display-lg">Talk to Serge directly.</h1>
        <div className="mt-8"><PhoneCTA size="lg" location="contact" /></div>

        {!sent ? (
          <div className="mt-16 space-y-6">
            <div>
              <label htmlFor="name" className={labelCls}>Name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                className={inputCls}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inputCls}
                placeholder="(941) 555-0123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="car" className={labelCls}>Car make / model</label>
              <input
                id="car"
                name="car"
                autoComplete="off"
                className={inputCls}
                placeholder="e.g., 2022 Aventador SVJ"
                value={car}
                onChange={(e) => setCar(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="desc" className={labelCls}>Brief description</label>
              <textarea
                id="desc"
                name="desc"
                rows={5}
                className={inputCls}
                placeholder="What happened? Where's the damage?"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="files" className={labelCls}>Photos (optional)</label>
              <input
                id="files"
                name="files"
                type="file"
                accept="image/*"
                multiple
                className={`${inputCls} file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-accent file:text-bg file:cursor-pointer`}
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
            <Button variant="primary" onClick={handleSubmit}>Send to Serge</Button>
          </div>
        ) : (
          <div className="mt-16 border border-accent p-8" role="status" aria-live="polite">
            <p className="font-display text-2xl text-accent">We got it.</p>
            <p className="mt-3 text-muted">Serge will be in touch within 24 hours.</p>
          </div>
        )}
      </div>
    </section>
  );
}
