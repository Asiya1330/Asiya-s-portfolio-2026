import { SplitLines } from "@/components/motion/SplitLines";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { faqs } from "@/content";
import { cx } from "@/lib/cx";
import { FaqList } from "./FaqList";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section
      id="faq"
      className={cx("shell", styles.faq)}
      data-section="FAQ"
      data-theme="light"
    >
      <div className={styles.head}>
        <SectionLabel index="08">FAQ</SectionLabel>
        <SplitLines lines={["Good to know"]} className="displayL" />
      </div>

      <FaqList items={faqs} />
    </section>
  );
}
