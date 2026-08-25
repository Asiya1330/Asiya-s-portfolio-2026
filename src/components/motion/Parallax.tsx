"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the element's height to travel across the viewport. */
  amount?: number;
}

/**
 * Drifts its child against the scroll. Scrubbed, so it is tied to the
 * scrollbar rather than played on a trigger.
 */
export function Parallax({ children, className, amount = 0.1 }: ParallaxProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = scope.current?.firstElementChild;
      if (!target) return;

      gsap.fromTo(
        target,
        { yPercent: -amount * 100 },
        {
          yPercent: amount * 100,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
