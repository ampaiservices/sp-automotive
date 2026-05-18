import { useCallback, useEffect, useRef } from "react";

// Stable viewport-height accessor for scroll/layout math.
//
// iOS Safari's address bar collapses and expands during scroll, which makes
// reading `window.innerHeight` inside a RAF/scroll handler unstable: each
// frame can see a different value while the toolbar animates, and any math
// that depends on it (parallax dwell windows, sticky thresholds, GSAP
// ScrollTrigger end positions) drifts. This hook decouples those reads from
// scroll by caching innerHeight in a ref and updating it only on real
// resize/orientation events, not on every scroll frame.
//
// API: returns a stable `getVh()` accessor — callable inside RAF loops, GSAP
// scrollTrigger `end: () => …` callbacks, or anywhere a current snapshot is
// needed without subscribing to re-renders.
export function useViewportHeight(): () => number {
  const vhRef = useRef<number>(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const update = () => {
      vhRef.current = window.innerHeight;
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return useCallback(() => vhRef.current, []);
}
