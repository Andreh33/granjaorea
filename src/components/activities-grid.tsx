import Image from "next/image";

import { siteContent } from "@/content/site-content";

import { ActivityTilt } from "./activity-tilt";
import styles from "./activities-grid.module.css";

export function ActivitiesGrid() {
  return (
    <section
      aria-labelledby="activities-title"
      className={styles.activities}
      id="actividades"
    >
      <header className={styles.intro}>
        <p className={styles.eyebrow}>No es mirar · es probar</p>
        <div className={styles.introGrid}>
          <h2 id="activities-title">
            Coleccionan <span>primeras veces.</span>
          </h2>
          <p>
            Aquí cada actividad es una excusa para descubrir una capacidad:
            cuidar, confiar, atreverse, expresarse o contar con el grupo.
          </p>
        </div>
      </header>

      <div className={styles.grid}>
        {siteContent.activities.map((activity, index) => {
          const titleId = `activity-${activity.id}`;

          return (
            <ActivityTilt
              ariaLabelledby={titleId}
              className={styles.card}
              key={activity.id}
            >
              <figure className={styles.figure}>
                <div className={styles.imageFrame}>
                  <Image
                    alt={activity.imageAlt}
                    className={styles.image}
                    fill
                    sizes="(max-width: 720px) 100vw, (max-width: 1050px) 50vw, 46vw"
                    src={activity.image}
                    style={{ objectPosition: activity.focalPoint }}
                  />
                  <div aria-hidden="true" className={styles.imageShade} />
                  <span aria-hidden="true" className={styles.cardIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className={styles.caption}>
                  <p>{activity.eyebrow}</p>
                  <h3 id={titleId}>{activity.title}</h3>
                  <span>{activity.description}</span>
                </figcaption>
              </figure>
            </ActivityTilt>
          );
        })}
      </div>
    </section>
  );
}
