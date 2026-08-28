import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { YearRoundExperiences } from "./year-round-experiences";

it("offers a clear path for every year-round audience", () => {
  render(<YearRoundExperiences />);

  expect(
    screen.getByRole("heading", { name: /cuatro formas de vivir orea/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /visitas en familia/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /colegios y grupos/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /celebraciones/i })).toBeVisible();
  expect(
    screen.getByRole("heading", { name: /campamento de verano/i }),
  ).toBeVisible();
  expect(screen.getAllByRole("img")).toHaveLength(4);
  expect(
    screen.getByRole("link", { name: /calcular el campamento/i }),
  ).toHaveAttribute("href", "#temporada");
});
