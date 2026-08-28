import { describe, expect, it } from "vitest";

import {
  buildFaqJsonLd,
  buildMetadata,
  buildOrganizationJsonLd,
} from "./seo";

describe("SEO builders", () => {
  it("builds a location-rich canonical metadata object", () => {
    const metadata = buildMetadata();

    expect(metadata.alternates?.canonical).toBe(
      "https://campamentos.granjaorea.com/",
    );
    expect(String(metadata.title)).toBe(
      "Granja escuela y campamentos en Ciudad Real | Orea",
    );
    expect(metadata.description).toMatch(/todo el año/i);
    expect(metadata.description).toMatch(/familias.*colegios.*campamento/i);
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
