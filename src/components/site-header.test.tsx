import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { SiteHeader } from "./site-header";

it("opens an accessible Spanish menu with real section links", () => {
  render(<SiteHeader />);

  const trigger = screen.getByRole("button", { name: /abrir menú/i });
  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByRole("dialog", { name: /menú principal/i }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /la experiencia/i }).at(-1),
  ).toHaveAttribute("href", "#experiencia");
});

it("closes the menu with Escape and returns focus to its trigger", () => {
  render(<SiteHeader />);

  const trigger = screen.getByRole("button", { name: /abrir menú/i });
  fireEvent.click(trigger);
  fireEvent.keyDown(document, { key: "Escape" });

  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
});
