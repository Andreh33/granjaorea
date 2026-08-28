import { siteContent } from "@/content/site-content";
import {
  buildFaqJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import styles from "./page-sections.module.css";

const trustFacts = [
  {
    value: "Desde 1990",
    label: "acompañando experiencias en la naturaleza",
  },
  { value: "Equipo presente", label: "cuidado adaptado a cada grupo" },
  { value: "Con cita previa", label: "visitas familiares" },
  { value: "Ciudad Real", label: "en el entorno de La Atalaya" },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="Datos clave de Granja Escuela Orea" className={styles.trust}>
      <ul className={styles.trustList}>
        {trustFacts.map((fact) => (
          <li className={styles.trustItem} key={fact.label}>
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
          {siteContent.testimonials.map((testimonial) => (
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
