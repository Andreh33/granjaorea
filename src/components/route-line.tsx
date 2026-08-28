"use client";

import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";

import styles from "./route-line.module.css";

export function RouteLine() {
  const pathControls = useAnimationControls();
  const markerControls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    void pathControls.start({
      pathLength: [0, 1],
      transition: { duration: 1.55, ease: [0.65, 0, 0.35, 1] },
    });
    void markerControls.start({
      opacity: [0, 1],
      scale: [0.5, 1],
      transition: { delay: 1.15, duration: 0.45 },
    });
  }, [markerControls, pathControls, shouldReduceMotion]);

  return (
    <svg
      aria-hidden="true"
      className={styles.route}
      preserveAspectRatio="none"
      viewBox="0 0 1440 420"
    >
      <path
        className={styles.contour}
        d="M-40 224C160 83 287 355 494 191C674 48 780 311 978 182C1135 80 1255 164 1480 24"
      />
      <path
        className={styles.contourMuted}
        d="M-40 295C188 154 310 406 523 248C708 111 847 357 1038 225C1173 132 1328 187 1480 95"
      />
      <motion.path
        animate={pathControls}
        className={styles.mainPath}
        d="M-40 258C177 111 303 379 509 219C691 78 814 335 1011 203C1162 101 1297 175 1480 57"
        initial={false}
      />
      <motion.circle
        animate={markerControls}
        className={styles.marker}
        cx="1011"
        cy="203"
        initial={false}
        r="8"
      />
    </svg>
  );
}
