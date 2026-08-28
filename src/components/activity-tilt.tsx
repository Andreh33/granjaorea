"use client";

import { type CSSProperties, type PointerEvent, type ReactNode } from "react";

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
  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--tilt-x", `${vertical * -6}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${horizontal * 6}deg`);
  };

  const style = {
    "--tilt-x": "0deg",
    "--tilt-y": "0deg",
  } as CSSProperties;

  return (
    <article
      aria-labelledby={ariaLabelledby}
      className={className}
      onPointerCancel={resetTilt}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      onPointerUp={resetTilt}
      style={style}
    >
      {children}
    </article>
  );
}
