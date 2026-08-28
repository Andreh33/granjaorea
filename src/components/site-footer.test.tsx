import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import { siteContent } from "@/content/site-content";

import { SiteFooter } from "./site-footer";

it("publishes annual identity and every image credit in contentinfo", () => {
  render(<SiteFooter />);

  const footer = screen.getByRole("contentinfo");
  expect(footer).toBeVisible();
  expect(
    within(footer).getByText("Granja · Hípica · Campamentos"),
  ).toBeVisible();
  expect(
    within(footer).getByText(
      `© ${new Date().getFullYear()} Servicios Integrales Ciudad Real S.L.`,
    ),
  ).toBeVisible();

  const creditLinks = within(footer).getAllByRole("link", {
    name: /ver foto de/i,
  });
  expect(creditLinks).toHaveLength(7);
  expect(creditLinks.map((link) => link.getAttribute("href"))).toEqual(
    siteContent.photoCredits.map((credit) => credit.sourceUrl),
  );
  for (const link of creditLinks) {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  }
});
