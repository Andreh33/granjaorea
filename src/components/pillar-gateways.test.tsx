import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { PillarGateways } from "./pillar-gateways";

it("renders three equivalent photographic gateways", () => {
  render(<PillarGateways />);

  const gateways = screen.getAllByRole("article");

  expect(gateways).toHaveLength(3);
  expect(gateways.map((gateway) => gateway.dataset.pillar)).toEqual([
    "granja",
    "hipica",
    "campamentos",
  ]);
  expect(screen.getByRole("heading", { name: "Granja escuela" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Hípica" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Campamentos" })).toBeVisible();
  expect(screen.getAllByRole("img")).toHaveLength(3);
});
