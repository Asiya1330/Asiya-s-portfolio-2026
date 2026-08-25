"use client";

import { useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Flips `data-theme` on <body> as each section crosses mid-viewport.
 *
 * Sections declare their own theme in markup (`data-theme` on the
 * <section>), so adding a section never means editing this file. The
 * colour crossfade itself is the CSS transition on <body>.
 */
export function ThemeFlipper() {
  useGSAP(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("[data-section][data-theme]");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive && section.dataset.theme) {
            document.body.dataset.theme = section.dataset.theme;
          }
        },
      });
    });
  }, []);

  return null;
}
