import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { PhotoGallery } from "./photo-gallery";

it("turns the range of Orea experiences into an accessible photo story", () => {
  render(<PhotoGallery />);

  expect(
    screen.getByRole("heading", { name: /el campo no se explica/i }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("figure")).toHaveLength(5);
  expect(screen.getByText(/aprender a cuidar lo vivo/i)).toBeVisible();
  expect(screen.getByAltText(/montando a caballo/i)).toBeInTheDocument();
});
