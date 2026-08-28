import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import HomePage from "./page";

it("places the three gateways immediately after the hero", () => {
  const { container } = render(<HomePage />);
  const hero = container.querySelector("#inicio");
  const gateways = container.querySelector("#pilares");

  expect(hero).not.toBeNull();
  expect(gateways).not.toBeNull();
  expect(hero?.nextElementSibling).toBe(gateways);
});
