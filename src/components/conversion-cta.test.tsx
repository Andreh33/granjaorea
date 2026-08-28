import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ConversionCta } from "./conversion-cta";

it("offers real WhatsApp and telephone paths without a fake form", () => {
  render(<ConversionCta />);

  expect(
    screen.getByRole("link", { name: /escribir por whatsapp/i }),
  ).toHaveAttribute("href", expect.stringContaining("wa.me/34615367717"));
  expect(screen.getByRole("link", { name: /llamar ahora/i })).toHaveAttribute(
    "href",
    "tel:+34615367717",
  );
  expect(screen.queryByRole("form")).toBeNull();
});
