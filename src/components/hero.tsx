import Image from "next/image";

import { siteContent } from "@/content/site-content";

import { HeroEntrance } from "./hero-entrance";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="inicio">
      <Image
        alt=""
        className={styles.backgroundImage}
        fill
        preload
        quality={90}
        sizes="100vw"
        src="/images/orea/stock-trail.jpg"
      />
      <div aria-hidden="true" className={styles.backgroundWash} />
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.copy}>
          <HeroEntrance delay={0.05}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.eyebrowMark} />
              {siteContent.hero.eyebrow}
            </p>
          </HeroEntrance>

          <h1 className={styles.title} id="hero-title">
            <span>Naturaleza </span>
            <span>para vivirla. </span>
            <span className={styles.titleAccent}>Todo el año.</span>
          </h1>

          <HeroEntrance delay={0.2}>
            <p className={styles.description}>{siteContent.hero.description}</p>
          </HeroEntrance>

          <HeroEntrance className={styles.actionWrap} delay={0.28}>
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href="#temporada"
              >
                Calcular campamento
                <span aria-hidden="true" className={styles.actionArrow}>
                  ↓
                </span>
              </a>
              <a className={styles.secondaryAction} href="#experiencias">
                Descubrir experiencias
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <ul className={styles.heroFacts} aria-label="Datos clave de Orea">
              {siteContent.hero.facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </HeroEntrance>
        </div>
        <p className={styles.locationStamp}>La Atalaya · Ciudad Real · 38.98° N</p>
      </div>
    </section>
  );
}
