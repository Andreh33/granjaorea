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
    expect(String(metadata.title)).toMatch(
      /Campamento de verano.*Ciudad Real/i,
    );
    expect(metadata.description).toMatch(/6 a 16 años/i);
    expect(metadata.description).toMatch(/1 al 30 de julio/i);
    expect(metadata.description).toMatch(/630 €|690 €/i);
  });

  it("mirrors every visible FAQ entry into valid FAQPage JSON-LD", () => {
    const data = buildFaqJsonLd();

    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity).toHaveLength(8);
  });

  it("identifies Orea without inventing an offer", () => {
    const data = buildOrganizationJsonLd();

    expect(data["@type"]).toBe("Organization");
    expect(JSON.stringify(data)).not.toContain("Offer");
  });
});
