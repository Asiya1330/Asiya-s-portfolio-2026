"use client";

import { useRef } from "react";

import { EASE, gsap, useGSAP } from "@/lib/gsap";
import styles from "./WhyMe.module.css";

/**
 * The rule draws left to right, then the row lifts.
 *
 * The rule is a `::before` sized by `--rule`, because a pseudo-element
 * cannot be targeted directly — but a custom property on the parent
 * can, and GSAP tweens those natively.
 */
export function WhyRow({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: scope.current, start: "top 88%" },
        })
        .fromTo(
          scope.current,
          { "--rule": "0%" },
          { "--rule": "100%", duration: 1.1, ease: "power2.inOut" },
          0,
        )
        .fromTo(
          scope.current!.querySelectorAll(`.${styles.animate}`),
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: EASE, stagger: 0.07 },
          0.12,
        );
    },
    { scope },
  );

  return (
    <div ref={scope} className={styles.row}>
      <span className={`${styles.num} ${styles.animate}`}>{index}</span>
      <h3 className={`${styles.title} ${styles.animate}`}>{title}</h3>
      <p className={`${styles.body} ${styles.animate}`}>{body}</p>
    </div>
  );
}
