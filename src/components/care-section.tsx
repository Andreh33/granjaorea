import { siteContent } from "@/content/site-content";

import styles from "./care-section.module.css";

export function CareSection() {
  return (
    <section
      aria-labelledby="care-title"
      className={styles.care}
      id="cuidados"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>La parte que más importa a las familias</p>
          <h2 id="care-title">
            La aventura crece cuando <span>todo lo importante</span> está cuidado.
          </h2>
        </header>

        <aside className={styles.scenario}>
          <span aria-hidden="true" className={styles.scenarioIndex}>
            Caso real
          </span>
          <h3>¿Y si echa de menos casa?</h3>
          <p>
            Es habitual, sobre todo al principio. El equipo acompaña, ayuda a
            entrar en el grupo y contacta con la familia cuando la situación lo
            requiere.
          </p>
        </aside>

        <ul className={styles.facts}>
          {siteContent.care.map((fact, index) => (
            <li key={fact.id}>
              <span aria-hidden="true" className={styles.factIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
