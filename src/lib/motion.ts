"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries as an external store.
 *
 * `useSyncExternalStore` is the right tool here rather than
 * useState + useEffect: it subscribes without a synchronous setState
 * inside an effect, and it takes an explicit server snapshot, so SSR
 * and the first client render agree.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // the server cannot know; assume the richer default
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}
