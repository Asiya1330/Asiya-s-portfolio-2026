"use client";

import { useState } from "react";

import { availability, navLinks, site } from "@/content";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Nav.module.css";

export function Nav() {
  const [stuck, setStuck] = useState(false);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 60,
      end: "max",
      onToggle: (self) => setStuck(self.isActive),
    });
    return () => trigger.kill();
  }, []);

  return (
    <header className={cx(styles.nav, stuck && styles.stuck)}>
      <a className={styles.logo} href="#top" data-hover>
        <span className={styles.mark} aria-hidden="true" />
        {site.name}
      </a>

      <nav className={styles.links} aria-label="Sections">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-hover>
            {link.label}
          </a>
        ))}
      </nav>

      <a className={styles.cta} href="#contact" data-hover>
        <span className={styles.dot} aria-hidden="true" />
        {availability.short}
      </a>
    </header>
  );
}
