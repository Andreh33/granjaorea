import Image from "next/image";

import { siteContent } from "@/content/site-content";

import { HeroEntrance } from "./hero-entrance";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="inicio">
      <div className={styles.shell}>
        <div className={styles.copyPanel}>
          <HeroEntrance delay={0.05}>
            <p className={styles.eyebrow}>{siteContent.hero.eyebrow}</p>
          </HeroEntrance>

          <h1 className={styles.title} id="hero-title">
            {siteContent.hero.title}
          </h1>

          <HeroEntrance delay={0.2}>
            <p className={styles.description}>{siteContent.hero.description}</p>
          </HeroEntrance>

          <HeroEntrance className={styles.actionWrap} delay={0.28}>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="#pilares">
                Elegir una experiencia
              </a>
              <a className={styles.secondaryAction} href="#temporada">
                Ver campamentos 2027
              </a>
            </div>
          </HeroEntrance>
        </div>

        <div className={styles.photoPanel}>
          <Image
            alt="Dos niños recorriendo juntos un sendero entre árboles"
            className={styles.backgroundImage}
            fill
            preload
            quality={90}
            sizes="100vw"
            src="/images/orea/stock-trail.jpg"
          />
        </div>
      </div>
    </section>
  );
}
