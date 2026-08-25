"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./ScrollMarquee.module.css";

interface ScrollMarqueeProps {
  /** Two lines that travel in opposite directions. */
  lines: readonly [string, string];
  /** How far each row travels, as a share of one repetition. */
  travel?: number;
}

const REPEATS = 4;

/**
 * Two bands of oversized type that slide past each other as the page
 * scrolls — the second one against the first, which is what makes the
 * movement register rather than reading as a static headline.
 *
 * Scrubbed, so it is tied to the scrollbar: scroll up and it runs
 * backwards. The phrase is repeated so neither row can run out of text
 * mid-travel, and `xPercent` is used rather than pixels so the distance
 * stays proportional at any viewport.
 */
export function ScrollMarquee({ lines, travel = 25 }: ScrollMarqueeProps) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = scope.current?.querySelectorAll(`.${styles.row}`);
      if (!rows) return;

      const track = {
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      } as const;

      gsap.fromTo(
        rows[0],
        { xPercent: 0 },
        { xPercent: -travel, ease: "none", scrollTrigger: track },
      );
      gsap.fromTo(
        rows[1],
        { xPercent: -travel },
        { xPercent: 0, ease: "none", scrollTrigger: track },
      );
    },
    { scope },
  );

  return (
    <div ref={scope} className={styles.marquee} aria-hidden="true">
      {lines.map((line, index) => (
        <div key={index} className={styles.band}>
          <div className={cx(styles.row, index === 1 && styles.accent)}>
            {Array.from({ length: REPEATS }, (_, copy) => (
              <span key={copy}>{line}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
