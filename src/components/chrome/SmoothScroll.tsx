"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Lenis, driven by GSAP's ticker rather than its own rAF loop.
 *
 * The wiring order is the whole trick: Lenis tells ScrollTrigger it
 * moved, and GSAP's ticker advances Lenis. Do it the other way round
 * and every scrub lags exactly one frame behind the scrollbar.
 *
 * With reduced motion the wrapper drops out entirely and the browser's
 * native scrolling is left alone.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // a scroll-driven page has to start at the top, or the first
    // reveal fires into an already-scrolled document
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // GSAP's ticker owns the loop — see GsapBridge
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.8,
      }}
    >
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}

/**
 * Connects Lenis to GSAP.
 *
 * This reads the instance through `useLenis`, which subscribes to
 * Lenis's own context, rather than through a ref on <ReactLenis>. A ref
 * is only populated once, and if the effect happens to run before that,
 * it bails and never retries — leaving `raf` uncalled forever. Lenis
 * still swallows wheel events in that state, so the page stops
 * responding to the wheel while the native scrollbar keeps working.
 * The hook re-runs when the instance appears, so it cannot miss it.
 */
function GsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = (time: number) => lenis.raf(time * 1000);
    const sync = () => ScrollTrigger.update();

    lenis.on("scroll", sync);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    if (process.env.NODE_ENV !== "production") {
      // handle for poking at scrolling from the console while tuning
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    }

    return () => {
      lenis.off("scroll", sync);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}
