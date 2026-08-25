"use client";

import Script from "next/script";
import { useState } from "react";

import { calendly } from "@/content";
import styles from "./Contact.module.css";

/**
 * Calendly's inline widget, loaded only when a URL is configured and
 * only once the visitor asks for it.
 *
 * Their embed script is ~90KB and sets cookies, so pulling it in on
 * every page load would cost every visitor for a feature most will not
 * use. Clicking the button loads it; until then this is just markup.
 */
export function CalendlyPanel() {
  const [open, setOpen] = useState(false);
  const configured = calendly.url !== "";

  return (
    <div className={styles.panel}>
      <span className="label">Book a slot</span>
      <h3 className={styles.panelTitle}>{calendly.label}</h3>
      <p className={styles.panelNote}>{calendly.note}</p>

      {!configured && (
        <p className={styles.disabled}>
          Booking opens once the Calendly link is connected. Use the form
          instead and I will send times.
        </p>
      )}

      {configured && !open && (
        <button
          type="button"
          className={styles.bookBtn}
          onClick={() => setOpen(true)}
          data-hover
        >
          See available times
        </button>
      )}

      {configured && open && (
        <>
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
          <link
            rel="stylesheet"
            href="https://assets.calendly.com/assets/external/widget.css"
          />
          <div
            className={`calendly-inline-widget ${styles.embed}`}
            data-url={`${calendly.url}?hide_gdpr_banner=1&background_color=e7e2dc&text_color=0c0b10&primary_color=5b4be8`}
          />
        </>
      )}
    </div>
  );
}
