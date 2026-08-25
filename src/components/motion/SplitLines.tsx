"use client";

import { createElement, useId } from "react";

import { EASE, gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./SplitLines.module.css";

interface SplitLinesProps {
  /** Pre-split copy — where a heading breaks is an editorial decision. */
  lines: readonly string[];
  /** Index of the line rendered as the italic accent, if any. */
  accentIndex?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Hero headings play on mount; everything else waits for scroll. */
  playOnMount?: boolean;
}

/**
 * Masked line reveal: each line sits in an overflow-hidden box and rises
 * out of it.
 *
 * The pre-state is opacity, never a transform. GSAP parses an existing
 * CSS transform into its own pixel `y` and then stacks `yPercent` on top
 * of it, so a `translateY(105%)` start state would never animate back to
 * zero — the lines would simply stay hidden.
 */
export function SplitLines({
  lines,
  accentIndex,
  as = "h2",
  className,
  playOnMount = false,
}: SplitLinesProps) {
  const id = useId();
  const root = `[data-split="${id}"]`;
  const inners = `${root} .${styles.inner}`;

  useGSAP(
    () => {
      gsap.set(inners, { yPercent: 105, opacity: 1 });

      gsap.to(inners, {
        yPercent: 0,
        duration: playOnMount ? 1.4 : 1.25,
        ease: EASE,
        stagger: 0.08,
        delay: playOnMount ? 0.15 : 0,
        scrollTrigger: playOnMount ? undefined : { trigger: root, start: "top 85%" },
      });
    },
    { dependencies: [inners, root, playOnMount] },
  );

  return createElement(
    as,
    { className: cx("display", className), "data-split": id },
    lines.map((line, index) => (
      <span key={line} className={styles.line}>
        <i className={styles.inner} data-reveal>
          {index === accentIndex ? <em>{line}</em> : line}
        </i>
      </span>
    )),
  );
}
