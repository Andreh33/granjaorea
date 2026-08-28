import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hero } from "./hero";

it("renders one visible campaign h1 and a real conversion link", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "El verano en el que empiezan a volver distintos",
  );
  expect(
    screen.getByRole("link", { name: /avísame por whatsapp/i }),
  ).toHaveAttribute("href", expect.stringContaining("wa.me/34615367717"));
});
