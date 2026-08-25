"use client";

import { useRef } from "react";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { statement } from "@/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Statement.module.css";

const WORDS = statement.split(/\s+/);

/**
 * Words resolve one at a time against the scrollbar.
 *
 * Splitting happens at module scope rather than by mutating innerHTML,
 * so the full sentence is in the server-rendered HTML and stays
 * selectable and readable to crawlers.
 */
export function Statement() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(`.${styles.word}`, {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={styles.statement}
      data-section="Approach"
      data-theme="light"
    >
      <SectionLabel index="02">Approach</SectionLabel>
      <p className={cx("display", "displayL", styles.body)}>
        {WORDS.map((word, index) => (
          <span key={`${word}-${index}`} className={styles.word}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
