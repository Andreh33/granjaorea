import { siteContent } from "@/content/site-content";

import { ExperienceCard } from "./experience-card";
import styles from "./year-round-experiences.module.css";

export function YearRoundExperiences() {
  return (
    <section
      aria-labelledby="experiences-title"
      className={styles.section}
      id="experiencias"
    >
      <div className={styles.orbit} aria-hidden="true">
        <span>OREA</span>
        <span>365</span>
      </div>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Una finca. Muchas historias.</p>
          <h2 id="experiences-title">
            Cuatro formas de <span>vivir Orea.</span>
          </h2>
          <p className={styles.lede}>
            No hay una rutina cerrada para todos. Cada visita se construye
            alrededor de las personas, el momento del año y aquello que quieren
            descubrir juntas.
          </p>
        </header>

        <div className={styles.grid}>
          {siteContent.experiences.map((experience) => (
            <ExperienceCard experience={experience} key={experience.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
