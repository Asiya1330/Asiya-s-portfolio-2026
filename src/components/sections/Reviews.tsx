import { Reveal } from "@/components/motion/Reveal";
import { ScrollMarquee } from "@/components/motion/ScrollMarquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Stars";
import { reviews, upworkProfile, upworkSummary } from "@/content";
import { cx } from "@/lib/cx";
import styles from "./Reviews.module.css";

/**
 * A server component — only the marquee and the reveals are client.
 *
 * Cards rather than one pinned quote at a time: a visitor deciding
 * whether to email should be able to read all of the feedback in one
 * glance, not scroll through it one screen per quote.
 *
 * Upwork publishes no client avatars on a public profile, so the
 * monogram is a real initial rather than a stock face standing in for
 * someone who never agreed to appear here.
 */
export function Reviews() {
  return (
    <section className={styles.reviews} data-section="Reviews" data-theme="dark">
      <div className={cx("shell", styles.head)}>
        <SectionLabel index="07">Client feedback</SectionLabel>
      </div>

      <ScrollMarquee
        lines={["Some nice words from my clients", "Some nice words from my clients"]}
      />

      <div className={cx("shell", styles.body)}>
        <div className={styles.grid}>
          {reviews.map((review) => (
            <Reveal key={review.id} as="figure" className={styles.card}>
              <Stars score={review.score} />
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(review.author)}
                </span>
                <span className={styles.who}>
                  <b>{review.author}</b>
                  <span>{review.project}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.foot}>
          <a
            className={styles.verify}
            href={upworkProfile}
            target="_blank"
            rel="noreferrer noopener"
            data-hover
            data-cursor-text="Verify"
          >
            <Stars score={upworkSummary.rating} />
            <b>{upworkSummary.rating}</b>
            <span>
              across {upworkSummary.reviewCount} reviews · {upworkSummary.badge} ·{" "}
              {upworkSummary.jobSuccess} job success
            </span>
          </a>
          <span className={styles.footNote}>Verified on Upwork</span>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * "Rami S." -> RS, "Devworks.io" -> D. Split on whitespace only: a
 * company name is one word, and splitting its domain suffix off turns
 * Devworks.io into "DI", which is nobody's initials.
 */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
