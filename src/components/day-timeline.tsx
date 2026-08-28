import { siteContent } from "@/content/site-content";

import { DayTimelineMotion } from "./day-timeline-motion";
import styles from "./day-timeline.module.css";

const phaseLabels = {
  morning: "Mañana",
  midday: "Mediodía",
  afternoon: "Tarde",
  evening: "Noche",
} as const;

export function DayTimeline() {
  const intro = (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>De sol a luna · la experiencia completa</p>
      <div className={styles.introGrid}>
        <h2 id="day-title">
          Un día que tiene de todo. <span>Menos rutina.</span>
        </h2>
        <div>
          <p>
            Cada jornada cambia de actividades, pero conserva algo importante:
            un ritmo pensado para moverse, cuidarse, convivir y descansar.
          </p>
          <span className={styles.scrollHint}>
            <span aria-hidden="true">↓</span>
            Sigue la ruta
          </span>
        </div>
      </div>
    </header>
  );

  return (
    <DayTimelineMotion intro={intro}>
      <ol aria-label="Horario de un día en Orea Camp" className={styles.list}>
        {siteContent.timeline.map((item, index) => (
          <li className={styles.item} data-phase={item.phase} key={item.id}>
            <div className={styles.timeBlock}>
              <span aria-hidden="true" className={styles.itemIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <time dateTime={item.time}>{item.time}</time>
            </div>
            <div className={styles.itemCopy}>
              <span className={styles.phase}>{phaseLabels[item.phase]}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </DayTimelineMotion>
  );
}
