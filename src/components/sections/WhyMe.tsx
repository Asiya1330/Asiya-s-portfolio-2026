import { SplitLines } from "@/components/motion/SplitLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reasons } from "@/content";
import { cx } from "@/lib/cx";
import { WhyRow } from "./WhyRow";
import styles from "./WhyMe.module.css";

export function WhyMe() {
  return (
    <section className={styles.why} data-section="Why me" data-theme="light">
      <div className={cx("shell", styles.head)}>
        <SectionLabel index="06">Why choose me</SectionLabel>
        <SplitLines
          lines={["Four reasons clients", "come back"]}
          className="displayL"
        />
      </div>

      <div className={cx("shell", styles.rows)}>
        {reasons.map((reason, index) => (
          <WhyRow
            key={reason.id}
            index={String(index + 1).padStart(2, "0")}
            title={reason.title}
            body={reason.body}
          />
        ))}
      </div>
    </section>
  );
}
