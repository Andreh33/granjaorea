import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { ActivitiesGrid } from "./activities-grid";

it("renders all eight activities as an editorial image mosaic", () => {
  render(<ActivitiesGrid />);

  expect(screen.getAllByRole("article")).toHaveLength(8);
  for (const image of screen.getAllByRole("img")) {
    expect(image.getAttribute("alt")).not.toMatch(/^(image|foto)?$/i);
  }
});
