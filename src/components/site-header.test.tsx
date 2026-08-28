import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { SiteHeader } from "./site-header";

it("exposes all three pillars in desktop and mobile navigation", () => {
  render(<SiteHeader />);
  expect(screen.getAllByRole("link", { name: /^granja$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^hípica$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^campamentos$/i }).length).toBeGreaterThan(0);
  expect(screen.queryByText(/naturaleza · ciudad real/i)).toBeNull();
});

it("opens an accessible Spanish menu with real section links", () => {
  render(<SiteHeader />);

  const trigger = screen.getByRole("button", { name: /abrir menú/i });
  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByRole("dialog", { name: /menú principal/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("dialog").parentElement).toBe(document.body);
  expect(
    screen.getAllByRole("link", { name: /^experiencias$/i }).at(-1),
  ).toHaveAttribute("href", "#experiencias");
  expect(screen.getAllByText("OREA").length).toBeGreaterThan(0);
});

it("closes the menu with Escape and returns focus to its trigger", () => {
  render(<SiteHeader />);

  const trigger = screen.getByRole("button", { name: /abrir menú/i });
  fireEvent.click(trigger);
  fireEvent.keyDown(document, { key: "Escape" });

  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
});
