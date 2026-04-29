"use client";
import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.8, smoothWheel: true });
    // Expose for Navigation anchor links to call lenis.scrollTo
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    function raf(time: number) { lenis.raf(time * 1000); }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return <>{children}</>;
}
