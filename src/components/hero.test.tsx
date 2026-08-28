import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Hero } from "./hero";

it("names the three Orea worlds in the first conversion block", () => {
  render(<Hero />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Granja, caballos y aventura. Todo el año.",
  );
  expect(
    screen.getByRole("link", { name: /elegir una experiencia/i }),
  ).toHaveAttribute("href", "#pilares");
  expect(screen.queryByText("35+")).toBeNull();
});
