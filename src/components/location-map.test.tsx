import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";

import { LocationMap } from "./location-map";

it("loads the external map only after the visitor asks for it", async () => {
  const user = userEvent.setup();
  render(<LocationMap />);

  expect(screen.queryByTitle(/mapa interactivo/i)).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /cómo llegar con google maps/i }),
  ).toHaveAttribute("href", expect.stringContaining("/maps/dir/"));

  await user.click(screen.getByRole("button", { name: /cargar mapa interactivo/i }));

  expect(screen.getByTitle(/mapa interactivo/i)).toHaveAttribute(
    "src",
    expect.stringContaining("output=embed"),
  );
});
