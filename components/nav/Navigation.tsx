"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import PhoneCTA from "@/components/ui/PhoneCTA";

const links = [
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md border-b border-divider">
      <nav className="flex items-center justify-between px-6 md:px-10 h-16">
        <Link href="/" aria-label="SP Automotive home" className="flex items-center">
          <Image
            src="/logos/sp-mark.jpeg"
            alt="SP Automotive"
            width={160}
            height={40}
            priority
            className="h-8 w-auto invert contrast-200"
          />
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm uppercase tracking-[0.18em] text-text hover:text-accent transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="hidden md:block"><PhoneCTA /></div>
        <button className="md:hidden text-accent" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-6 w-6" /></button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-bg flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-accent"><X className="h-7 w-7" /></button>
          </div>
          <ul className="flex flex-col items-center gap-8 mt-16">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-3xl text-text">{l.label}</Link>
              </li>
            ))}
            <li className="mt-8"><PhoneCTA /></li>
          </ul>
        </div>
      )}
    </header>
  );
}
