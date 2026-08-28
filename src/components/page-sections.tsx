import { siteContent } from "@/content/site-content";
import {
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import styles from "./page-sections.module.css";

const trustFacts = [
  { value: "1990", label: "acompañando veranos" },
  { value: "6–16", label: "años · grupos por edad" },
  { value: "Ciudad Real", label: "en el parque de La Atalaya" },
  { value: "2 h", label: "aprox. desde Madrid" },
] as const;

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
