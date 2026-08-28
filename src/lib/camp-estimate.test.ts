import { describe, expect, it } from "vitest";

import { buildCampEstimate } from "./camp-estimate";

describe("buildCampEstimate", () => {
  it("uses the selected first-fortnight price in a personalized conversation", () => {
    const estimate = buildCampEstimate({
      responsibleName: "Ana López",
      phone: "+34 612 345 678",
      childAge: 9,
      sessionId: "first",
    });

    expect(estimate.totalEur).toBe(690);
    expect(estimate.message).toContain("Ana López");
    expect(estimate.message).toContain("+34 612 345 678");
    expect(estimate.message).toContain("9 años");
    expect(estimate.message).toContain("Primera quincena");
    expect(estimate.message).toContain("1–15 de julio");
    expect(estimate.message).toContain("690 €");
    expect(estimate.message).toMatch(/disponibilidad/i);
    expect(decodeURIComponent(estimate.whatsappUrl)).toContain(estimate.message);
  });

  it("uses the lower second-fortnight price without adding unconfirmed extras", () => {
    const estimate = buildCampEstimate({
      responsibleName: "Javier Martín",
      phone: "699 222 111",
      childAge: 14,
      sessionId: "second",
    });

    expect(estimate.totalEur).toBe(630);
    expect(estimate.message).toContain("Segunda quincena");
    expect(estimate.message).toContain("630 €");
    expect(estimate.message).not.toMatch(/depósito|transporte|hípica|descuento/i);
  });
});
