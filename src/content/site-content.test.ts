import { describe, expect, it } from "vitest";

import { siteContent } from "./site-content";

describe("siteContent", () => {
  it("publishes confirmed 2027 prices without claiming availability", () => {
    expect(siteContent.season.year).toBe(2027);
    expect(siteContent.season.status).toBe("prelaunch");
    expect(siteContent.season.sessions).toEqual([
      expect.objectContaining({
        id: "first",
        dateRange: "1–15 de julio",
        priceEur: 690,
      }),
      expect.objectContaining({
        id: "second",
        dateRange: "16–30 de julio",
        priceEur: 630,
      }),
    ]);
    expect(siteContent.season.message).toMatch(/turnos y precios.*confirmados/i);
    expect(siteContent.season.description).toMatch(/disponibilidad/i);
  });

  it("gives farm school, horse experiences, and camps equal first-level content", () => {
    expect(siteContent.pillars.map((pillar) => pillar.id)).toEqual([
      "granja",
      "hipica",
      "campamentos",
    ]);
    expect(siteContent.pillars).toHaveLength(3);
    expect(siteContent.navigation.slice(0, 3)).toEqual([
      { label: "Granja", href: "#granja" },
      { label: "Hípica", href: "#hipica" },
      { label: "Campamentos", href: "#campamentos" },
    ]);
  });

  it("avoids unconfirmed horse activities and recurring family schedules", () => {
    const publicCopy = JSON.stringify(siteContent);
    expect(publicCopy).not.toMatch(/sábados y domingos por la mañana/i);
    expect(publicCopy).not.toMatch(/fines de semana|fin de semana/i);
    expect(publicCopy).not.toMatch(/clases de hípica|rutas a caballo|todos los fines de semana/i);
    expect(publicCopy).toMatch(/con cita previa/i);
  });

  it("publishes a credit for every stock image", () => {
    expect(siteContent.photoCredits).toHaveLength(7);
    expect(siteContent.photoCredits.every((credit) => credit.sourceUrl.startsWith("https://unsplash.com/photos/"))).toBe(true);
  });

  it("presents Orea as a place families and groups can enjoy all year", () => {
    expect(siteContent.hero.eyebrow).toMatch(/todo el año/i);
    expect(siteContent.experiences.map((experience) => experience.id)).toEqual([
      "familias",
      "colegios",
      "celebraciones",
      "verano",
    ]);
    expect(siteContent.experiences.every((experience) => experience.imageAlt)).toBe(
      true,
    );
  });

  it("does not manufacture urgency around places", () => {
    expect(JSON.stringify(siteContent)).not.toMatch(/últimas plazas|plazas disponibles/i);
  });
});
