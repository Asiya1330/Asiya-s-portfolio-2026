"use client";

import { useEffect, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useHasFinePointer, usePrefersReducedMotion } from "@/lib/motion";
import styles from "./Cursor.module.css";

/**
 * The custom cursor.
 *
 * Only renders on a precise pointer, and only then does it add the class
 * that hides the native one — so a touch device, or a browser where this
 * never mounts, is never left without a pointer at all.
 *
 * Hover targets opt in with `data-hover` and can name themselves with
 * `data-cursor-text`. Listeners are delegated, so anything rendered
 * later is picked up without re-binding.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const finePointer = useHasFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("hasCursor");
    return () => document.body.classList.remove("hasCursor");
  }, [enabled]);

  useGSAP(
    () => {
      if (!enabled) return;

      const moveX = gsap.quickTo(dot.current, "x", {
        duration: 0.35,
        ease: "power3",
      });
      const moveY = gsap.quickTo(dot.current, "y", {
        duration: 0.35,
        ease: "power3",
      });

      const onMove = (event: MouseEvent) => {
        moveX(event.clientX);
        moveY(event.clientY);
      };

      const setHover = (event: MouseEvent, active: boolean) => {
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-hover]",
        );
        if (!target) return;
        dot.current?.classList.toggle(styles.isBig, active);
        if (label.current) {
          label.current.textContent = active
            ? (target.dataset.cursorText ?? "")
            : "";
        }
      };

      const onOver = (event: MouseEvent) => setHover(event, true);
      const onOut = (event: MouseEvent) => setHover(event, false);

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <div ref={dot} className={styles.cursor} aria-hidden="true">
      <span ref={label} className={styles.label} />
    </div>
  );
}
