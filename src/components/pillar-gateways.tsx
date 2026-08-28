import Image from "next/image";

import { siteContent } from "@/content/site-content";

import styles from "./pillar-gateways.module.css";

export function PillarGateways() {
  return (
    <section aria-labelledby="pillars-title" className={styles.section} id="pilares">
      <header className={styles.intro}>
        <p>Tres maneras de vivir Orea</p>
        <h2 id="pillars-title">Elige por dónde empezar.</h2>
      </header>
      <div className={styles.grid}>
        {siteContent.pillars.map((pillar) => (
          <article
            className={styles.gateway}
            data-pillar={pillar.id}
            data-tone={pillar.tone}
            key={pillar.id}
          >
            <Image
              alt={pillar.imageAlt}
              className={styles.image}
              fill
              quality={82}
              sizes="(max-width: 760px) 100vw, 33vw"
              src={pillar.image}
              style={{ objectPosition: pillar.focalPoint }}
            />
            <div className={styles.copy}>
              <p>{pillar.eyebrow}</p>
              <h3>{pillar.label}</h3>
              <span>{pillar.detail}</span>
              <a href={pillar.href}>{pillar.ctaLabel}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
