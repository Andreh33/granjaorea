import { siteContent } from "@/content/site-content";
import {
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

import styles from "./page-sections.module.css";

const trustFacts = [
  { value: "1990", label: "acompañando veranos" },
  { value: "6–16", label: "años · grupos por edad" },
  { value: "Ciudad Real", label: "en el parque de La Atalaya" },
  { value: "2 h", label: "aprox. desde Madrid" },
] as const;

const seasonWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero recibir información de la temporada 2027 de Orea Camp.",
);

export function TrustStrip() {
  return (
    <section aria-label="Datos clave de Orea Camp" className={styles.trust}>
      <ul className={styles.trustList}>
        {trustFacts.map((fact, index) => (
          <li className={styles.trustItem} key={fact.label}>
            <span aria-hidden="true" className={styles.trustIndex}>
              0{index + 1}
            </span>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SeasonPanel() {
  return (
    <section
      aria-labelledby="season-title"
      className={styles.season}
      id="temporada"
    >
      <div className={styles.seasonGrid}>
        <div className={styles.seasonStamp} aria-hidden="true">
          <span>20</span>
          <strong>27</strong>
        </div>
        <div className={styles.seasonCopy}>
          <p className={styles.eyebrow}>{siteContent.season.eyebrow}</p>
          <h2 id="season-title">Temporada {siteContent.season.year}</h2>
          <p className={styles.seasonMessage}>{siteContent.season.message}</p>
          <p className={styles.seasonDescription}>
            {siteContent.season.description}
          </p>
        </div>
        <div className={styles.seasonAction}>
          <a href={seasonWhatsAppUrl} rel="noreferrer" target="_blank">
            Quiero que me aviséis
            <span aria-hidden="true">↗</span>
          </a>
          <p>Sin compromiso · respuesta personal del equipo Orea</p>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className={styles.testimonials}
    >
      <div className={styles.testimonialsShell}>
        <header className={styles.testimonialsIntro}>
          <p className={styles.eyebrow}>Lo cuentan sus familias</p>
          <h2 id="testimonials-title">
            La tranquilidad también vuelve a casa.
          </h2>
          <p>
            Testimonios compartidos directamente con Orea; no proceden de una
            plataforma externa de reseñas.
          </p>
        </header>
        <div className={styles.quotes}>
          {siteContent.testimonials.map((testimonial, index) => (
            <figure className={styles.quote} key={testimonial.id}>
              <span aria-hidden="true" className={styles.quoteMark}>
                “
              </span>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span data-testid="testimonial-context">
                  {testimonial.context}
                </span>
              </figcaption>
              <span aria-hidden="true" className={styles.quoteIndex}>
                0{index + 1}
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StructuredData() {
  const schemas = [
    buildOrganizationJsonLd(),
    buildWebsiteJsonLd(),
    buildFaqJsonLd(),
  ];

  return schemas.map((schema) => (
    <script
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      key={schema["@type"]}
      type="application/ld+json"
    />
  ));
}
