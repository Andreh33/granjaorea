import { describe, expect, it } from "vitest";

import {
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
} from "./seo";

describe("SEO builders", () => {
  it("describes all three pillars on the URL that serves this page", () => {
    const metadata = buildMetadata();

    expect(metadata.alternates?.canonical).toBe(
      "https://granjaorea.vercel.app/",
    );
    expect(String(metadata.title)).toBe(
      "Granja escuela, hípica y campamentos en Ciudad Real | Orea",
    );
    expect(metadata.description).toMatch(/granja.*hípica.*campamentos/i);
    expect(metadata.keywords).toContain("hípica Ciudad Real");
  });

  it("uses the annual Orea icon as organization logo", () => {
    const data = buildOrganizationJsonLd();

    expect(data.name).toBe("Granja Escuela Orea");
    expect(data.logo).toBe("https://granjaorea.vercel.app/icon.svg");
  });

  it("mirrors every visible FAQ entry into valid FAQPage JSON-LD", () => {
    const data = buildFaqJsonLd();

    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(7);
  });

  it("identifies Orea without inventing an offer", () => {
    const data = buildOrganizationJsonLd();

    expect(data["@type"]).toBe("Organization");
    expect(JSON.stringify(data)).not.toContain("Offer");
  });
});
