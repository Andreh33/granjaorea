import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { DayTimeline } from "./day-timeline";

it("renders the complete day as a chronological ordered list", () => {
  render(<DayTimeline />);

  const items = screen.getAllByRole("listitem");
  expect(items.length).toBeGreaterThanOrEqual(8);
  expect(items[0]).toHaveTextContent("08:30");
  expect(items.at(-1)).toHaveTextContent("22:15");
});

it("keeps the daylight dial decorative", () => {
  render(<DayTimeline />);

  expect(screen.getByTestId("daylight-dial")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});
