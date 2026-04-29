"use client";
import { useState, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PhoneCTA from "@/components/ui/PhoneCTA";
import type Lenis from "lenis";

const links = [
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Programmatic navigation that plays nicely with the hero ScrollTrigger pin.
  // For anchor links on the home page: kill any active triggers first, then smooth-scroll.
  // For full route changes: just navigate (component unmount handles trigger cleanup).
  function handleClick(href: string) {
    return (e: MouseEvent) => {
      setOpen(false);
      const isAnchor = href.includes("#");
      const onHome = pathname === "/";

      if (isAnchor && onHome) {
        e.preventDefault();
        // Kill active scroll triggers (the hero pin) so anchor scroll isn't fighting it
        ScrollTrigger.getAll().forEach((t) => t.kill(true));
        const id = href.split("#")[1];
        const target = id ? document.getElementById(id) : null;
        const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
        // Defer one frame so the kill() reflows DOM before we measure scroll position
        requestAnimationFrame(() => {
          if (lenis && target) lenis.scrollTo(target, { duration: 1 });
          else if (target) target.scrollIntoView({ behavior: "smooth" });
        });
      } else if (isAnchor && !onHome) {
        // Anchor link clicked from another page: navigate home first, then scroll
        e.preventDefault();
        router.push(href);
      }
      // For non-anchor links, let Next.js Link handle normally
    };
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md border-b border-divider">
      <nav className="flex items-center px-6 md:px-10 h-20">
        <div className="flex-1 flex justify-start">
          <Link href="/" aria-label="SP Automotive home" className="flex items-center">
            <Image
              src="/logos/sp-mark.png"
              alt="SP Automotive"
              width={654}
              height={241}
              priority
              className="h-12 w-auto invert"
            />
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={handleClick(l.href)}
                className="text-sm uppercase tracking-[0.18em] text-text hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-1 flex justify-end items-center">
          <div className="hidden md:block"><PhoneCTA /></div>
          <button className="md:hidden text-accent" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-6 w-6" /></button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-bg flex flex-col">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-accent"><X className="h-7 w-7" /></button>
          </div>
          <ul className="flex flex-col items-center gap-8 mt-16">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={handleClick(l.href)}
                  className="font-display text-3xl text-text"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-8"><PhoneCTA /></li>
          </ul>
        </div>
      )}
    </header>
  );
}
