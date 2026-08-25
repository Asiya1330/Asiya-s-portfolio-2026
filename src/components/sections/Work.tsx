"use client";

import Image from "next/image";
import { useRef } from "react";

import { SplitLines } from "@/components/motion/SplitLines";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  clientProjects,
  clientSiteStack,
  featuredProjects,
  productProjects,
} from "@/content";
import type { Project } from "@/content/types";
import { gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Work.module.css";

/**
 * Three tiers, because fourteen equal cards is a wall rather than a
 * portfolio. The four builds worth reading about get the sticky stack,
 * the smaller products get a grid, and the client sites get a list —
 * worth showing, not worth a screen each.
 */
export function Work() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // scoped query: gsap.utils.toArray on a string searches the whole
      // document, which would also match a second instance of this section
      const cards = Array.from(
        scope.current?.querySelectorAll<HTMLElement>(`.${styles.card}`) ?? [],
      );

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;

        gsap.to(card.querySelector(`.${styles.inner}`), {
          scale: 0.93,
          opacity: 0.42,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top 90%",
            end: "top 25%",
            scrub: true,
          },
        });
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="work"
      className={styles.work}
      data-section="Work"
      data-theme="dark"
    >
      <div className={cx("shell", styles.head)}>
        <SectionLabel index="03">Selected work</SectionLabel>
        <SplitLines
          lines={["Shipped,", "and still running"]}
          className="displayL"
        />
      </div>

      {/* --- featured: sticky stack ------------------------------- */}
      <div className={styles.stack}>
        {featuredProjects.map((project, index) => (
          <article
            key={project.slug}
            className={styles.card}
            style={{ "--i": index } as React.CSSProperties}
          >
            <div className={styles.inner}>
              <div className={styles.text}>
                <span className={styles.num}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={cx("display", "displayS", styles.title)}>
                  {project.title}
                </h3>
                <p>{project.blurb}</p>

                <Badges project={project} />

                {project.stack.length > 0 && (
                  <ul className={styles.tags}>
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}

                <a
                  className={styles.visit}
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-hover
                  data-cursor-text="Visit"
                >
                  {project.domain}
                  <Arrow />
                </a>
              </div>

              <a
                className={styles.shot}
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${project.title}`}
                data-hover
                data-cursor-text="Visit"
              >
                <Shot project={project} sizes="(max-width: 1000px) 90vw, 46vw" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* --- products: grid --------------------------------------- */}
      <div className={cx("shell", styles.block)}>
        <Reveal className={styles.subhead}>
          <span className="label">Also built</span>
        </Reveal>

        <div className={styles.grid}>
          {productProjects.map((project) => (
            <Reveal key={project.slug} as="article" className={styles.tile}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                data-hover
                data-cursor-text="Visit"
              >
                <span className={styles.tileShot}>
                  <Shot
                    project={project}
                    sizes="(max-width: 1000px) 90vw, 30vw"
                  />
                </span>
                <span className={styles.tileBody}>
                  <b>{project.title}</b>
                  <span className={styles.tileBlurb}>{project.blurb}</span>
                  {project.stack.length > 0 && (
                    <span className={styles.tileStack}>
                      {project.stack.join(" · ")}
                    </span>
                  )}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --- client sites: list ----------------------------------- */}
      <div className={cx("shell", styles.block)}>
        <Reveal className={styles.subhead}>
          <span className="label">Client sites</span>
          <span className={styles.subnote}>{clientSiteStack.join(" · ")}</span>
        </Reveal>

        <ul className={styles.clients}>
          {clientProjects.map((project) => (
            <li key={project.slug}>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                data-hover
                data-cursor-text="Visit"
              >
                <span className={styles.clientShot}>
                  <Shot project={project} sizes="220px" />
                </span>
                <span className={styles.clientName}>{project.title}</span>
                <span className={styles.clientBlurb}>{project.blurb}</span>
                <span className={styles.clientDomain}>{project.domain}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Shot({ project, sizes }: { project: Project; sizes: string }) {
  if (!project.image) return <span className={styles.noShot} />;
  return (
    <Image
      src={project.image}
      alt={`${project.title} — screenshot`}
      fill
      sizes={sizes}
      className={styles.image}
    />
  );
}

function Badges({ project }: { project: Project }) {
  if (!project.ai && !project.payments && !project.gated) return null;
  return (
    <ul className={styles.badges}>
      {project.ai && <li className={styles.ai}>AI</li>}
      {project.payments && <li>Payments</li>}
      {project.gated && <li className={styles.muted}>Login required</li>}
    </ul>
  );
}

const Arrow = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    fill="none"
    className={styles.arrow}
  >
    <path
      d="M3 13L13 3M13 3H5.5M13 3v7.5"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);
