import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { PillarChapters } from "./pillar-chapters";

it("gives every pillar one equivalent chapter and a useful next action", () => {
  render(<PillarChapters />);
  const articles = screen.getAllByRole("article");
  expect(articles).toHaveLength(3);
  expect(articles.map((article) => article.id)).toEqual([
    "granja",
    "hipica",
    "campamentos",
  ]);
  expect(
    screen.getByRole("link", { name: /consultar la propuesta hípica/i }),
  ).toHaveAttribute("href", "#contacto");
  expect(
    screen.getByRole("link", { name: /calcular el campamento/i }),
  ).toHaveAttribute("href", "#temporada");
  expect(
    screen.getByText(/formato y disponibilidad a confirmar/i),
  ).toBeVisible();
});
