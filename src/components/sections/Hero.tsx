"use client";

import Image from "next/image";
import { useRef } from "react";

import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { heroAccentLine, heroHeading, site, stats } from "@/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Hero.module.css";

/**
 * Two columns, full viewport height. The media column runs edge to edge
 * and top to bottom, sitting under the fixed nav on purpose.
 *
 * On the way out the image only creeps while the type column leaves
 * faster — the difference between the two is what reads as depth.
 */
export function Hero() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const track = {
        trigger: section.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      } as const;

      gsap.fromTo(
        `.${styles.image}`,
        { scale: 1, yPercent: 0 },
        { scale: 1.18, yPercent: -5, ease: "none", scrollTrigger: track },
      );

      gsap.fromTo(
        `.${styles.col}`,
        { yPercent: 0 },
        { yPercent: 11, ease: "none", scrollTrigger: track },
      );

      gsap.fromTo(
        `.${styles.caption}`,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: { ...track, end: "40% top" },
        },
      );
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      className={styles.hero}
      data-section="Index"
      data-theme="light"
    >
      <div className={styles.col}>
        <Reveal className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {site.eyebrow}
        </Reveal>

        <SplitLines
          as="h1"
          lines={heroHeading}
          accentIndex={heroAccentLine}
          className={cx("displayXl", styles.heading)}
          playOnMount
        />

        <Reveal className={styles.actions}>
          <ButtonLink href="#work">See selected work</ButtonLink>
          <ButtonLink href="#contact" variant="plain">
            Book an intro call
          </ButtonLink>
        </Reveal>

        <div className={styles.meta}>
          {stats.map((stat) => (
            <Reveal key={stat.label} className={styles.stat}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>

      <figure className={styles.media}>
        <Image
          src="/img/hero.webp"
          alt={`${site.name}, ${site.role}`}
          fill
          priority
          sizes="(max-width: 1000px) 100vw, 44vw"
          className={styles.image}
        />
        <figcaption className={styles.caption}>
          <span>{site.name}</span>
          <span>Full-stack / AI</span>
        </figcaption>
      </figure>
    </section>
  );
}
