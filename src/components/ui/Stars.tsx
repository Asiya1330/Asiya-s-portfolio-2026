import styles from "./Stars.module.css";

/**
 * Five stars with a partial fill for the fraction, so 4.8 does not get
 * rounded up to a flat five. The number is exposed to assistive tech;
 * the stars themselves are decoration.
 */
export function Stars({ score, max = 5 }: { score: number; max?: number }) {
  const pct = Math.max(0, Math.min(1, score / max)) * 100;

  return (
    <span className={styles.stars} role="img" aria-label={`${score} out of ${max}`}>
      <span className={styles.track} aria-hidden="true">
        {"★".repeat(max)}
      </span>
      <span className={styles.fill} style={{ width: `${pct}%` }} aria-hidden="true">
        {"★".repeat(max)}
      </span>
    </span>
  );
}
