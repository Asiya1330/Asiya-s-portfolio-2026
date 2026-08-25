import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionLabel.module.css";

/** The numbered eyebrow that opens every section. */
export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <Reveal className={styles.label}>
      <span className="idx">{index}</span>
      <span className="label">{children}</span>
    </Reveal>
  );
}
