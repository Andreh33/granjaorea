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

it("identifies stock photography and links to public credits", () => {
  render(<PhotoGallery />);

  expect(
    screen.getByText(/fotografías editoriales de unsplash/i),
  ).toBeVisible();
  expect(
    screen.getByRole("link", { name: /ver créditos fotográficos/i }),
  ).toHaveAttribute("href", "#creditos-fotograficos");
});

it("keeps gallery images lazy with their responsive size hints", () => {
  render(<PhotoGallery />);

  const images = screen.getAllByRole("img");
  const expectedSizes = [
    "(max-width: 760px) 100vw, 62vw",
    "(max-width: 760px) 100vw, 36vw",
    "(max-width: 760px) 100vw, 35vw",
    "(max-width: 760px) 100vw, 35vw",
    "(max-width: 760px) 100vw, 28vw",
  ];

  expect(images).toHaveLength(5);
  images.forEach((image, index) => {
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("sizes", expectedSizes[index]);
  });
});

it("presents captions without decorative numeric prefixes", () => {
  render(<PhotoGallery />);

  expect(screen.queryByText("01")).not.toBeInTheDocument();
});
