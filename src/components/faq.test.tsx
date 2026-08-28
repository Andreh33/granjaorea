import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Faq } from "./faq";

it("toggles an answer with truthful ARIA state", () => {
  render(<Faq />);

  const button = screen.getByRole("button", { name: /echa de menos/i });
  expect(button).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(
    screen.getByRole("region", { name: /echa de menos/i }),
  ).toBeVisible();
});
