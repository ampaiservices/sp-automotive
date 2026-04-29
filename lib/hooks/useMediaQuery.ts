import { useCallback, useSyncExternalStore } from "react";

// SSR-safe media-query subscription. `serverDefault` controls what the server
// (and the first client render before hydration commits) sees — set it so the
// SSR output matches what mobile-first users should see if they're on a slow
// device that hasn't hydrated yet.
export function useMediaQuery(query: string, serverDefault = false): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => serverDefault);
}
