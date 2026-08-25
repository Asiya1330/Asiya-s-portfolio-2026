"use client";

import { useRef } from "react";

import { marqueeItems } from "@/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import styles from "./Marquee.module.css";

/**
 * Infinite ticker whose speed leans into scroll velocity, so the strip
 * feels attached to the page rather than playing beside it.
 *
 * The loop never resets: a modifier wraps `x` with a modulo, so the
 * tween runs forever without a visible jump. The list is rendered twice
 * for that reason — the second copy is what the first wraps into.
 */
export function Marquee() {
  const scope = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!track.current) return;
      const half = track.current.scrollWidth / 2;

      const loop = gsap.to(track.current, {
        x: -half,
        duration: 22,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: string) => parseFloat(x) % half),
        },
      });

      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            5,
            1 + Math.abs(self.getVelocity()) / 1200,
          );
          gsap.to(loop, { timeScale: boost, duration: 0.5, overwrite: true });
        },
      });

      return () => {
        trigger.kill();
        loop.kill();
      };
    },
    { scope },
  );

  return (
    <section ref={scope} className={styles.marquee} aria-hidden="true">
      <div ref={track} className={styles.track}>
        {[0, 1].map((copy) =>
          marqueeItems.map((item) => (
            <span key={`${copy}-${item}`}>
              {item}
              <b>·</b>
            </span>
          )),
        )}
      </div>
    </section>
  );
}
