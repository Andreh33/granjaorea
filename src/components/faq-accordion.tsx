import type { FaqItem } from "@/content/site-content";

import styles from "./faq.module.css";

interface FaqAccordionProps {
  readonly items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <details className={styles.item} key={item.id}>
          <summary>
            <span aria-hidden="true" className={styles.index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.question}</span>
            <span aria-hidden="true" className={styles.icon} />
          </summary>
          <div className={styles.panel}>
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
