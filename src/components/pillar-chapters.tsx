import Image from "next/image";

import { siteContent, type PillarId } from "@/content/site-content";

import styles from "./pillar-chapters.module.css";

const chapterActions = {
  granja: { href: "#contacto", label: "Preparar una visita" },
  hipica: { href: "#contacto", label: "Consultar la propuesta hípica" },
  campamentos: { href: "#temporada", label: "Calcular el campamento" },
} as const satisfies Record<PillarId, { href: string; label: string }>;

export function PillarChapters() {
  return (
    <section aria-label="Experiencias de Orea" className={styles.section}>
      {siteContent.pillars.map((pillar) => {
        const action = chapterActions[pillar.id];

        return (
          <article
            className={styles.chapter}
            data-tone={pillar.tone}
            id={pillar.id}
            key={pillar.id}
          >
            <div className={styles.media}>
              <Image
                alt={pillar.imageAlt}
                className={styles.image}
                fill
                loading="lazy"
                quality={82}
                sizes="(max-width: 760px) 100vw, 50vw"
                src={pillar.image}
                style={{ objectPosition: pillar.focalPoint }}
              />
            </div>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>{pillar.eyebrow}</p>
              <h2>{pillar.headline}</h2>
              <p className={styles.summary}>{pillar.summary}</p>
              <p className={styles.detail}>{pillar.detail}</p>
              <a href={action.href}>{action.label}</a>
            </div>
          </article>
        );
      })}
    </section>
  );
}
