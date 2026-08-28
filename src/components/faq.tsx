import { siteContent } from "@/content/site-content";

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
          <h2 id="faq-title">Venir con las ideas claras.</h2>
          <p>
            Visitas, grupos, celebraciones y verano: aquí resolvemos lo
            esencial. Si falta algo, por WhatsApp contesta una persona del
            equipo Orea.
          </p>
        </header>
        <div className={styles.list}>
          {siteContent.faq.map((item) => (
            <details className={styles.item} key={item.id}>
              <summary>
                <span>{item.question}</span>
                <span aria-hidden="true" className={styles.icon} />
              </summary>
              <div className={styles.panel}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
