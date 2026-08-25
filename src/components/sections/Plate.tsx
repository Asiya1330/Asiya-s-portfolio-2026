"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Plate.module.css";

const STEPS = ["Architecture", "Build", "Ship", "Iterate"];

/**
 * A 260vh runway drives a sticky stage where a 40vw plate opens out to
 * full bleed.
 *
 * The image inside counter-scales as the frame grows, so the subject
 * holds still while the aperture opens around it. Scaling only the
 * frame would drag the picture with it and lose the effect.
 */
export function Plate() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        })
        .fromTo(
          `.${styles.frame}`,
          { width: "40vw", height: "22.5vw", borderRadius: 6 },
          { width: "100vw", height: "100vh", borderRadius: 0, ease: "none" },
          0,
        )
        .fromTo(
          `.${styles.image}`,
          { scale: 1.3 },
          { scale: 1, ease: "none" },
          0,
        )
        .fromTo(
          `.${styles.caption}`,
          { yPercent: 0, opacity: 1 },
          { yPercent: -40, opacity: 0.85, ease: "none" },
          0,
        )
        .fromTo(
          `.${styles.steps}`,
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, ease: "none" },
          0.35,
        );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className={styles.plate}
      data-section="Studio"
      data-theme="dark"
    >
      <div className={styles.sticky}>
        <div className={styles.caption}>
          <span className="idx">04</span>
          <h2 className={cx("display", "displayM")}>Built end to end</h2>
        </div>

        <figure className={styles.frame}>
          <Image
            src="/img/plate.webp"
            alt=""
            fill
            sizes="100vw"
            className={styles.image}
          />
          <span className={styles.scrim} aria-hidden="true" />
        </figure>

        <div className={styles.steps}>
          {STEPS.map((step, index) => (
            <Fragment key={step}>
              {index > 0 && <b aria-hidden="true" />}
              <span>{step}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
