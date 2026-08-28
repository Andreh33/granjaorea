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
              Tu próxima historia en Orea <span>empieza aquí.</span>
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
              quality={82}
              src="/images/orea/stock-celebration.jpg"
            />
            <figcaption>
              <span>Muchas historias · un mismo lugar</span>
              <strong>Orea se vive todo el año</strong>
            </figcaption>
          </figure>
        </div>
      </section>

      <footer className={styles.footer} data-site-footer>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <span>OREA</span>
            <strong>Naturaleza · aprendizaje · convivencia</strong>
          </div>
          <address>
            {organization.address.street}
            <br />
            {organization.address.locality} · {organization.address.region}
            <br />
            <a href={`mailto:${organization.email}`}>{organization.email}</a>
          </address>
          <nav aria-label="Redes sociales">
            {Object.entries(organization.social).map(([name, href]) => (
              <a href={href} key={name} rel="noreferrer" target="_blank">
                {name}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>
        <div className={styles.legal}>
          <span>© {siteContent.season.year} {organization.legalName}</span>
          <div>
            <a
              href="https://www.granjaorea.com/Web/contenido/aviso-legal"
              rel="noreferrer"
              target="_blank"
            >
              Aviso legal
            </a>
            <a
              href="https://www.granjaorea.com/Web/contenido/politica-de-privacidad-y-proteccion-de-datos"
              rel="noreferrer"
              target="_blank"
            >
              Privacidad
            </a>
            <a
              href="https://www.granjaorea.com/Web/contenido/politica-de-cookies"
              rel="noreferrer"
              target="_blank"
            >
              Cookies
            </a>
          </div>
        </div>
      </footer>

      <MobileStickyCta href={closingWhatsAppUrl} />
    </>
  );
}
