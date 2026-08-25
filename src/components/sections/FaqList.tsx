"use client";

import { useId, useRef, useState } from "react";

import type { Faq } from "@/content/types";
import { EASE, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { cx } from "@/lib/cx";
import styles from "./Faq.module.css";

/**
 * One-at-a-time accordion.
 *
 * Panels animate from a measured height to `auto` rather than toggling
 * `display`, and `ScrollTrigger.refresh()` runs on completion — the
 * page grew, so every trigger below this point has moved.
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  useGSAP(
    () => {
      const rows = Array.from(
        scope.current?.querySelectorAll<HTMLElement>(`.${styles.row}`) ?? [],
      );
      gsap.set(rows, { opacity: 0 });

      ScrollTrigger.batch(rows, {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: EASE,
              stagger: 0.08,
              overwrite: true,
            },
          ),
      });
    },
    { scope },
  );

  const toggle = (id: string, panel: HTMLDivElement | null) => {
    const closing = open === id;
    setOpen(closing ? null : id);

    const panels =
      scope.current?.querySelectorAll<HTMLElement>(`.${styles.panel}`) ?? [];
    gsap.to(panels, { height: 0, duration: 0.55, ease: EASE });

    if (!closing && panel) {
      gsap.to(panel, {
        height: "auto",
        duration: 0.65,
        ease: EASE,
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  };

  return (
    <div ref={scope} className={styles.list}>
      {items.map((item) => (
        <FaqRow
          key={item.id}
          item={item}
          baseId={baseId}
          isOpen={open === item.id}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}

function FaqRow({
  item,
  baseId,
  isOpen,
  onToggle,
}: {
  item: Faq;
  baseId: string;
  isOpen: boolean;
  onToggle: (id: string, panel: HTMLDivElement | null) => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const panelId = `${baseId}-${item.id}`;

  return (
    <div className={cx(styles.row, isOpen && styles.isOpen)}>
      <button
        type="button"
        className={styles.question}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(item.id, panel.current)}
        data-hover
      >
        <span>{item.question}</span>
        <i className={styles.icon} aria-hidden="true" />
      </button>

      <div ref={panel} id={panelId} className={styles.panel} role="region">
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
