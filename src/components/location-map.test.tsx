import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { LocationMap } from "./location-map";

it("shows Google Maps immediately and keeps a direct directions link", () => {
  render(<LocationMap />);

  expect(screen.getByTitle(/mapa de granja escuela orea/i)).toHaveAttribute(
    "src",
    expect.stringContaining("output=embed"),
  );
  expect(screen.getByTitle(/mapa de granja escuela orea/i)).toHaveAttribute(
    "loading",
    "lazy",
  );
  expect(
    screen.getByRole("link", { name: /cómo llegar con google maps/i }),
  ).toHaveAttribute("href", expect.stringContaining("/maps/dir/"));
});

it("keeps Google Maps direct without technological coordinates", () => {
  render(<LocationMap />);

  const map = screen.getByTitle(/mapa de granja escuela orea/i);
  expect(map).toHaveAttribute("loading", "lazy");
  expect(map).toHaveAttribute("referrerpolicy", "no-referrer");
  expect(screen.queryByText(/38\.98°/)).toBeNull();
});
