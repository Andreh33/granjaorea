"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import styles from "./day-timeline.module.css";

interface DayTimelineMotionProps {
  readonly children: ReactNode;
  readonly intro: ReactNode;
}

export function DayTimelineMotion({ children, intro }: DayTimelineMotionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.35,
  });
  const dialRotation = useTransform(progress, [0, 1], [-68, 64]);
  const sunX = useTransform(progress, [0, 0.5, 1], [-88, 0, 88]);
  const sunY = useTransform(progress, [0, 0.5, 1], [54, -76, 42]);
  const glowOpacity = useTransform(progress, [0, 0.48, 1], [0.28, 0.8, 0.18]);

  return (
    <section
      aria-labelledby="day-title"
      className={styles.timeline}
      id="experiencia"
      ref={sectionRef}
    >
      {intro}
      <div className={styles.story}>
        <div className={styles.dialColumn}>
          <div
            aria-hidden="true"
            className={styles.dial}
            data-testid="daylight-dial"
          >
            <motion.div
              className={styles.dialGlow}
              style={{ opacity: shouldReduceMotion ? 0.5 : glowOpacity }}
            />
            <motion.div
              className={styles.dialFace}
              style={{ rotate: shouldReduceMotion ? 0 : dialRotation }}
            >
              <span className={styles.orbit} />
              <span className={styles.orbitInner} />
              <motion.span
                className={styles.sun}
                style={
                  shouldReduceMotion
                    ? undefined
                    : { x: sunX, y: sunY }
                }
              />
            </motion.div>
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
            <motion.span
              className={styles.routeProgress}
              style={{ scaleY: shouldReduceMotion ? 1 : progress }}
            />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
