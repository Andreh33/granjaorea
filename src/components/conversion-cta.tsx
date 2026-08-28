import Image from "next/image";

import { siteContent } from "@/content/site-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import { MobileStickyCta } from "./mobile-sticky-cta";
import styles from "./conversion-cta.module.css";

const closingWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero preparar una experiencia en Granja Escuela Orea.",
);

export function ConversionCta() {
  const { organization } = siteContent;

  return (
    <>
      <section
        aria-labelledby="closing-title"
        className={styles.closing}
        id="contacto"
      >
        <div className={styles.closingGrid}>
          <div className={styles.copy}>
            <p>El siguiente paso es una conversación</p>
            <h2 id="closing-title">
              ¿Granja, hípica o campamento?{" "}
              <span>Cuéntanos qué estás buscando.</span>
            </h2>
            <p>
              Cuéntanos si sois una familia, un colegio, un grupo o si buscas
              campamento. Te responderá una persona del equipo Orea, sin
              formularios interminables.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.primaryAction}
                href={closingWhatsAppUrl}
                rel="noreferrer"
                target="_blank"
              >
                Escribir por WhatsApp
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className={styles.phoneAction}
                href={`tel:+${organization.phoneE164}`}
              >
                <small>Llamar ahora</small>
                {organization.phoneDisplay}
              </a>
            </div>
          </div>

          <figure className={styles.photo}>
            <Image
              alt="Niños compartiendo un juego al aire libre"
              className={styles.photoImage}
              fill
              sizes="(max-width: 760px) 100vw, 48vw"
              quality={75}
              src="/images/orea/stock-celebration.jpg"
            />
            <figcaption>
              <span>Muchas historias · un mismo lugar</span>
              <strong>Orea se vive todo el año</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <MobileStickyCta href={closingWhatsAppUrl} />
    </>
  );
}
