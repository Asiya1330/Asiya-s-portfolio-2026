import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { availability, site, socials, upworkSummary } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer
      className={styles.foot}
      data-section="Footer"
      data-theme="dark"
    >
      <Reveal className={styles.pill}>
        <span className={styles.dot} aria-hidden="true" />
        {availability.long}
        <span className={styles.pillDetail}>{availability.detail}</span>
      </Reveal>

      <a
        className={styles.cta}
        href={`mailto:${site.email}`}
        data-hover
        data-cursor-text="Write"
      >
        <SplitLines
          lines={["Let's build", "something."]}
          className={cx("displayXl", styles.ctaHeading)}
        />
        <span className={styles.mail}>{site.email}</span>
      </a>

      <div className={styles.grid}>
        <div>
          <span className="label">Elsewhere</span>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              data-hover
            >
              {social.label}
            </a>
          ))}
          <a href={site.cv} download data-hover>
            CV (PDF)
          </a>
        </div>

        <div>
          <span className="label">Based in</span>
          <p>
            {site.location}
            <br />
            {site.timezone}
          </p>
        </div>

        <div>
          <span className="label">On Upwork</span>
          <p>
            {upworkSummary.badge} — top 1%
            <br />
            {upworkSummary.rating} over {upworkSummary.reviewCount} reviews
            <br />
            {upworkSummary.jobSuccess} job success
          </p>
        </div>
      </div>

      <div className={styles.base}>
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <a href="#top" data-hover>
          Back to top
        </a>
      </div>
    </footer>
  );
}
