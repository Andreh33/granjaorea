"use client";

import { type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

interface ActivityTiltProps {
  readonly ariaLabelledby: string;
  readonly children: ReactNode;
  readonly className: string;
}

export function ActivityTilt({
  ariaLabelledby,
  children,
  className,
}: ActivityTiltProps) {
  const shouldReduceMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, { stiffness: 240, damping: 26 });
  const rotateY = useSpring(rotateYValue, { stiffness: 240, damping: 26 });

  const resetTilt = () => {
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXValue.set(vertical * -6);
    rotateYValue.set(horizontal * 6);
  };

  return (
    <motion.article
      aria-labelledby={ariaLabelledby}
      className={className}
      onPointerCancel={resetTilt}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      onPointerUp={resetTilt}
      style={
        shouldReduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1100 }
      }
    >
      {children}
    </motion.article>
  );
}
