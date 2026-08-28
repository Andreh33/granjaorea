"use client";

import { useState } from "react";

import type { FaqItem } from "@/content/site-content";

import styles from "./faq.module.css";

interface FaqAccordionProps {
  readonly items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const buttonId = `faq-button-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div className={styles.item} key={item.id}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                id={buttonId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                type="button"
              >
                <span aria-hidden="true" className={styles.index}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item.question}</span>
                <span aria-hidden="true" className={styles.icon}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              aria-hidden={!isOpen}
              aria-labelledby={buttonId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              id={panelId}
              role="region"
            >
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
