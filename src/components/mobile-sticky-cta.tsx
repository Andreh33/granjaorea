"use client";

import { useEffect, useState } from "react";

import styles from "./conversion-cta.module.css";

interface MobileStickyCtaProps {
  readonly href: string;
}

export function MobileStickyCta({ href }: MobileStickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    const blockers = [
      "#inicio",
      "#temporada",
      "#ubicacion",
      "#preguntas",
      "#contacto",
      "[data-site-footer]",
    ]
      .map((selector) => document.querySelector(selector))
      .filter((element): element is Element => element !== null);
    const visibility = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.isIntersecting);
        }
        setIsVisible(!Array.from(visibility.values()).some(Boolean));
      },
      { threshold: 0.01 },
    );

    for (const blocker of blockers) {
      visibility.set(blocker, blocker.matches("#inicio"));
      observer.observe(blocker);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={`${styles.sticky} ${isVisible ? styles.stickyVisible : ""}`}
    >
      <a href={href} rel="noreferrer" tabIndex={isVisible ? 0 : -1} target="_blank">
        Hablar con Orea
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
