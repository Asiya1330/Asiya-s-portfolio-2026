import Image from "next/image";

import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about, site, skillGroups } from "@/content";
import styles from "./About.module.css";

/**
 * A server component. Every animated piece inside is its own client
 * boundary, so the copy ships as static HTML and only the motion costs
 * JavaScript.
 */
export function About() {
  return (
    <section
      id="about"
      className={styles.about}
      data-section="About"
      data-theme="light"
    >
      <div className={styles.top}>
        <Parallax className={styles.media} amount={0.1}>
          <figure className={styles.frame}>
            <Image
              src="/img/about.webp"
              alt={site.name}
              fill
              sizes="(max-width: 1000px) 100vw, 34vw"
              className={styles.image}
            />
          </figure>
        </Parallax>

        <div className={styles.text}>
          <SectionLabel index="05">About</SectionLabel>
          <SplitLines lines={about.heading} className="displayL" />

          {about.paragraphs.map((paragraph) => (
            <Reveal as="p" key={paragraph.slice(0, 24)} className={styles.copy}>
              {paragraph}
            </Reveal>
          ))}

          <Reveal className={styles.actions}>
            <a className={styles.cv} href={site.cv} download data-hover>
              <Download />
              Download CV
              <span className={styles.pdf}>PDF</span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* --- skills, grouped so a client can find their one thing --- */}
      <div className={styles.skills}>
        {skillGroups.map((group) => (
          <Reveal key={group.id} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <ul className={styles.chips}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const Download = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" width="13" height="13">
    <path
      d="M8 1.5v9m0 0L4.5 7M8 10.5 11.5 7M2 13.5h12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
