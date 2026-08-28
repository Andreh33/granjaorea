import { render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { ConversionCta } from "./conversion-cta";
import { MobileStickyCta } from "./mobile-sticky-cta";

it("offers real WhatsApp and telephone paths without a fake form", () => {
  render(<ConversionCta />);

  expect(
    screen.getByRole("link", { name: /escribir por whatsapp/i }),
  ).toHaveAttribute("href", expect.stringContaining("wa.me/34615367717"));
  expect(screen.getByRole("link", { name: /llamar ahora/i })).toHaveAttribute(
    "href",
    "tel:+34615367717",
  );
  expect(screen.queryByRole("form")).toBeNull();
  expect(
    screen.getByRole("heading", {
      name: "¿Granja, hípica o campamento? Cuéntanos qué estás buscando.",
    }),
  ).toBeInTheDocument();
  expect(screen.queryByRole("contentinfo")).toBeNull();
});

it("keeps the mobile sticky action hidden over the closing contact section", async () => {
  class ImmediateIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly scrollMargin = "0px";
    readonly thresholds = [0];

    constructor(private readonly callback: IntersectionObserverCallback) {}

    disconnect() {}

    observe = (target: Element) => {
      this.callback(
        [
          {
            isIntersecting: target.matches("#contacto"),
            target,
          } as IntersectionObserverEntry,
        ],
        this,
      );
    };

    takeRecords() {
      return [];
    }

    unobserve() {}
  }

  vi.stubGlobal("IntersectionObserver", ImmediateIntersectionObserver);
  render(
    <>
      <section id="contacto" />
      <section id="preguntas" />
      <MobileStickyCta href="https://wa.me/34615367717" />
    </>,
  );

  await waitFor(() =>
    expect(screen.getByText("Hablar con Orea").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    ),
  );
  vi.unstubAllGlobals();
});
