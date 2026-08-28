import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { SiteHeader } from "./site-header";

const expectedNavigation = [
  ["Granja", "#granja"],
  ["Hípica", "#hipica"],
  ["Campamentos", "#campamentos"],
  ["Visitas", "#experiencias"],
  ["Contacto", "#contacto"],
] as const;

const expectedWhatsAppUrl =
  "https://wa.me/34615367717?text=Hola%2C%20quiero%20preparar%20una%20visita%20a%20Granja%20Escuela%20Orea.";

it("exposes the exact five-link navigation on desktop", () => {
  render(<SiteHeader />);

  const navigation = screen.getByRole("navigation", {
    name: /navegación principal/i,
  });
  const links = within(navigation).getAllByRole("link");

  expect(links).toHaveLength(5);
  expectedNavigation.forEach(([label, href], index) => {
    expect(links[index]).toHaveTextContent(label);
    expect(links[index]).toHaveAttribute("href", href);
  });
  expect(screen.queryByText(/naturaleza · ciudad real/i)).toBeNull();
});

it("offers a direct WhatsApp CTA on desktop", () => {
  render(<SiteHeader />);

  expect(
    screen.getByRole("link", { name: /escribir por whatsapp/i }),
  ).toHaveAttribute("href", expectedWhatsAppUrl);
});

it("opens an accessible Spanish menu with the five links and WhatsApp CTA", () => {
  render(<SiteHeader />);

  const trigger = screen.getByRole("button", { name: /abrir menú/i });
  fireEvent.click(trigger);

  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByRole("dialog", { name: /menú principal/i }),
  ).toBeInTheDocument();
  expect(screen.getByRole("dialog").parentElement).toBe(document.body);
  const mobileNavigation = screen.getByRole("navigation", {
    name: /navegación móvil/i,
  });
  const mobileLinks = within(mobileNavigation).getAllByRole("link");

  expect(mobileLinks).toHaveLength(6);
  expectedNavigation.forEach(([label, href], index) => {
    expect(mobileLinks[index]).toHaveTextContent(label);
    expect(mobileLinks[index]).toHaveAttribute("href", href);
  });
  expect(
    within(mobileNavigation).getByRole("link", {
      name: /escribir por whatsapp/i,
    }),
  ).toHaveAttribute("href", expectedWhatsAppUrl);
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
