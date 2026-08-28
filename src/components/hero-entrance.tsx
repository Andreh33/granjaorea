import type { CSSProperties, ReactNode } from "react";

import styles from "./hero-entrance.module.css";

interface HeroEntranceProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
}

export function HeroEntrance({
  children,
  className,
  delay = 0,
}: HeroEntranceProps) {
  const style = {
    "--entrance-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div
      className={`${styles.entrance} ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
