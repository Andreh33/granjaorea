import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hero } from "./hero";

it("renders one visible campaign h1 and routes families to the confirmed turns", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "El verano en el que empiezan a volver distintos",
  );
  expect(
    screen.getByRole("link", { name: /ver turnos y calcular/i }),
  ).toHaveAttribute("href", "#temporada");
  expect(screen.getByText(/turnos y precios 2027 confirmados/i)).toBeInTheDocument();
});
