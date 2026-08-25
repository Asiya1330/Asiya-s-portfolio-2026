"use client";

import { useRef } from "react";

import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import styles from "./ScrollProgress.module.css";

/**
 * Reading position. Driven by a transform rather than a width so it
 * stays on the compositor and never triggers layout.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const quickScale = gsap.quickTo(bar.current, "scaleX", {
      duration: 0.2,
      ease: "none",
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => quickScale(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className={styles.track} aria-hidden="true">
      <span ref={bar} className={styles.bar} />
    </div>
  );
}
