import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { calendly, site } from "@/content";
import { cx } from "@/lib/cx";
import { CalendlyPanel } from "./CalendlyPanel";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

/**
 * Two ways in, side by side, because clients split cleanly into two
 * groups: the ones who want a slot in the diary now, and the ones who
 * want to send a brief and think about it. Forcing either down the
 * other's path costs enquiries.
 *
 * The email address stays visible regardless — some people will always
 * prefer their own mail client, and hiding it reads as evasive.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className={cx("shell", styles.contact)}
      data-section="Contact"
      data-theme="light"
    >
      <div className={styles.head}>
        <SectionLabel index="09">Start a project</SectionLabel>
        <SplitLines
          lines={["Book a call, or", "send me the brief"]}
          className="displayL"
        />
        <Reveal as="p" className={styles.lede}>
          Either reaches me directly. I reply to everything within one
          business day, including the ones I turn down.
        </Reveal>
      </div>

      <div className={styles.grid}>
        <CalendlyPanel />
        <ContactForm />
      </div>

      <Reveal className={styles.direct}>
        Prefer your own mail client?{" "}
        <a href={`mailto:${site.email}`} data-hover>
          {site.email}
        </a>
        {calendly.url === "" && (
          <em className={styles.setup}>
            Calendly link not set — add NEXT_PUBLIC_CALENDLY_URL to enable
            booking.
          </em>
        )}
      </Reveal>
    </section>
  );
}
