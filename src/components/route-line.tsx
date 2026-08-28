import styles from "./route-line.module.css";

export function RouteLine() {
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
      <path
        className={styles.mainPath}
        d="M-40 258C177 111 303 379 509 219C691 78 814 335 1011 203C1162 101 1297 175 1480 57"
        pathLength="1"
      />
      <circle
        className={styles.marker}
        cx="1011"
        cy="203"
        r="8"
      />
    </svg>
  );
}
