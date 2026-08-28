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
          <p className={styles.eyebrow}>Lo que no cambia aunque cambie el plan</p>
          <h2 id="care-title">
            Una experiencia bien cuidada <span>empieza mucho antes</span> de
            llegar.
          </h2>
        </header>

        <aside className={styles.scenario}>
          <span aria-hidden="true" className={styles.scenarioIndex}>
            Un plan hecho a medida
          </span>
          <h3>Primero escuchamos. Después proponemos.</h3>
          <p>
            Una familia, un colegio y un campamento no necesitan lo mismo.
            Cuéntanos quién viene y qué busca; el equipo de Orea te ayudará a
            dar forma a la experiencia.
          </p>
          <a href="#contacto">Hablar con el equipo <span aria-hidden="true">↗</span></a>
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
