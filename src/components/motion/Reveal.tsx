"use client";

import { createElement, useId, type ReactNode } from "react";

import { EASE, gsap, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  /** Any host element — the wrapper should never change the semantics. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Seconds to hold back, for hand-tuned sequencing within a block. */
  delay?: number;
  /** Travel distance in pixels. */
  y?: number;
}

/**
 * The workhorse fade-up. Everything that is not a heading uses this,
 * which is what keeps the page reading as one gesture rather than a
 * collection of separate effects.
 *
 * The element is addressed by a generated id rather than a ref: `as` is
 * polymorphic, so a ref passed through `createElement` cannot be proven
 * to land on a host element, and React's lint rules rightly object. An
 * id costs one attribute and keeps the DOM shape untouched.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 22,
}: RevealProps) {
  const id = useId();
  const selector = `[data-reveal="${id}"]`;

  useGSAP(
    () => {
      gsap.fromTo(
        selector,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: selector, start: "top 88%" },
        },
      );
    },
    { dependencies: [selector, delay, y] },
  );

  return createElement(as, { className, "data-reveal": id }, children);
}
