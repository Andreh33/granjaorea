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
          <p>Antes de venir a Orea</p>
          <h2 id="faq-title">
            Venir con las ideas <span>claras.</span>
          </h2>
          <p>
            Visitas, grupos, celebraciones y verano: aquí resolvemos lo
            esencial. Si falta algo, por WhatsApp contesta una persona del
            equipo Orea.
          </p>
        </header>
        <FaqAccordion items={siteContent.faq} />
      </div>
    </section>
  );
}
