import Image from "next/image";

import { siteContent } from "@/content/site-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { HeroEntrance } from "./hero-entrance";
import { RouteLine } from "./route-line";
import styles from "./hero.module.css";

const heroWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero que me aviséis cuando publiquéis las fechas de Orea Camp 2027.",
);

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} id="inicio">
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.copy}>
          <HeroEntrance delay={0.05}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.eyebrowMark} />
              {siteContent.hero.eyebrow}
            </p>
          </HeroEntrance>

          <HeroEntrance delay={0.12}>
            <h1 className={styles.title} id="hero-title">
              <span>El verano en el que </span>
              <span>empiezan a volver </span>
              <span className={styles.titleAccent}>distintos</span>
            </h1>
          </HeroEntrance>

          <HeroEntrance delay={0.2}>
            <p className={styles.description}>{siteContent.hero.description}</p>
          </HeroEntrance>

          <HeroEntrance className={styles.actionWrap} delay={0.28}>
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href={heroWhatsAppUrl}
                rel="noreferrer"
                target="_blank"
              >
                Avísame por WhatsApp
                <span aria-hidden="true" className={styles.actionArrow}>
                  ↗
                </span>
              </a>
              <a className={styles.secondaryAction} href="#experiencia">
                Recorre un día en Orea
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.status}>
              <span aria-hidden="true" className={styles.statusDot} />
              Temporada 2027 en preparación
            </p>
          </HeroEntrance>
        </div>

        <HeroEntrance className={styles.visual} delay={0.16}>
          <figure className={styles.figure}>
            <Image
              alt="Niñas y niños explorando un arroyo en el entorno natural de Orea Camp"
              className={styles.image}
              fill
              preload
              sizes="(max-width: 760px) 100vw, 51vw"
              src="/images/orea/hero-orea.jpg"
            />
            <div aria-hidden="true" className={styles.imageWash} />
            <figcaption className={styles.caption}>
              <span>En plena naturaleza</span>
              <strong>La Atalaya · Ciudad Real</strong>
            </figcaption>
            <div aria-hidden="true" className={styles.imageIndex}>
              01
              <span>/</span>
              OREA
            </div>
          </figure>
        </HeroEntrance>
      </div>
      <RouteLine />
    </section>
  );
}
