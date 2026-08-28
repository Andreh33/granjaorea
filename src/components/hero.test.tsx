import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hero } from "./hero";

it("positions Orea for the whole year and keeps summer conversion available", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Naturaleza para vivirla. Todo el año.",
  );
  expect(
    screen.getByRole("link", { name: /calcular campamento/i }),
  ).toHaveAttribute("href", "#temporada");
  expect(
    screen.getByRole("link", { name: /descubrir experiencias/i }),
  ).toHaveAttribute("href", "#experiencias");
});
