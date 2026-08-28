import { siteContent } from "@/content/site-content";

import styles from "./care-section.module.css";

export function CareSection() {
  return (
    <section
      aria-labelledby="care-title"
      className={styles.care}
      id="visitas"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>
            Una finca que escucha antes de proponer
          </p>
          <h2 id="care-title">
            Cada grupo necesita su propia forma de vivir Orea.
          </h2>
        </header>

        <aside className={styles.scenario}>
          <p className={styles.scenarioKicker}>Un plan hecho a medida</p>
          <h3>Primero escuchamos. Después proponemos.</h3>
          <p>
            Una familia, un colegio y un campamento no necesitan lo mismo.
            Cuéntanos quién viene y qué busca; el equipo de Orea te ayudará a
            dar forma a la experiencia.
          </p>
          <a href="#contacto">Hablar con el equipo <span aria-hidden="true">↗</span></a>
        </aside>

        <ul className={styles.facts}>
          {siteContent.care.map((fact) => (
            <li key={fact.id}>
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
