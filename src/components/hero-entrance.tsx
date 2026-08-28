"use client";

import { useEffect, type ReactNode } from "react";
import {
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";

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
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    void controls.start({
      opacity: [0, 1],
      y: [18, 0],
      transition: {
        delay,
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    });
  }, [controls, delay, shouldReduceMotion]);

  return (
    <motion.div
      animate={controls}
      className={className}
      initial={false}
    >
      {children}
    </motion.div>
  );
}
