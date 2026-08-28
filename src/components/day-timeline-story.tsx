import type { ReactNode } from "react";

import styles from "./day-timeline.module.css";

interface DayTimelineStoryProps {
  readonly children: ReactNode;
  readonly intro: ReactNode;
}

export function DayTimelineStory({ children, intro }: DayTimelineStoryProps) {
  return (
    <section
      aria-labelledby="day-title"
      className={styles.timeline}
      id="experiencia"
    >
      {intro}
      <div className={styles.story}>
        <div className={styles.dialColumn}>
          <div
            aria-hidden="true"
            className={styles.dial}
            data-testid="daylight-dial"
          >
            <div className={styles.dialGlow} />
            <div className={styles.dialFace}>
              <span className={styles.orbit} />
              <span className={styles.orbitInner} />
              <span className={styles.sun} />
            </div>
            <span className={styles.dialStart}>08:30</span>
            <span className={styles.dialMid}>14:00</span>
            <span className={styles.dialEnd}>22:15</span>
            <div className={styles.dialCenter}>
              <span>Un día</span>
              <strong>Orea</strong>
              <small>de sol a luna</small>
            </div>
          </div>
        </div>

        <div className={styles.routeColumn}>
          <div aria-hidden="true" className={styles.routeTrack}>
            <span className={styles.routeProgress} />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
