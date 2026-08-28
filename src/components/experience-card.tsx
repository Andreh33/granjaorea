"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";

import type { Experience } from "@/content/site-content";

import styles from "./year-round-experiences.module.css";

interface ExperienceCardProps {
  readonly experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
    event.currentTarget.style.setProperty("--rotate-x", `${(50 - y) / 18}deg`);
    event.currentTarget.style.setProperty("--rotate-y", `${(x - 50) / 18}deg`);
  };

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <article
      className={styles.card}
      data-tone={experience.tone}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      style={
        {
          "--pointer-x": "50%",
          "--pointer-y": "50%",
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
        } as CSSProperties
      }
    >
      <div className={styles.cardShine} aria-hidden="true" />
      <div className={styles.cardMedia}>
        <Image
          alt={experience.imageAlt}
          className={styles.cardImage}
          fill
          quality={82}
          sizes="(max-width: 760px) 100vw, 50vw"
          src={experience.image}
          style={{ objectPosition: experience.focalPoint }}
        />
        <span aria-hidden="true" className={styles.cardNumber}>
          {experience.number}
        </span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardEyebrow}>{experience.eyebrow}</p>
        <h3>{experience.title}</h3>
        <p className={styles.cardDescription}>{experience.description}</p>
        <div className={styles.cardFooter}>
          <span>{experience.detail}</span>
          <a href={experience.href}>
            {experience.linkLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
