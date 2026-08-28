import { siteContent } from "@/content/site-content";

import { FaqAccordion } from "./faq-accordion";
import styles from "./faq.module.css";

export function Faq() {
  return (
    <section
      aria-labelledby="faq-title"
      className={styles.faq}
      id="preguntas"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p>Antes de hacer la mochila</p>
          <h2 id="faq-title">
            Preguntar también es <span>cuidar.</span>
          </h2>
          <p>
            Respuestas claras para decidir con calma. Si falta algo, al otro
            lado de WhatsApp contesta una persona del equipo Orea.
          </p>
        </header>
        <FaqAccordion items={siteContent.faq} />
      </div>
    </section>
  );
}
