import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Faq } from "./faq";

it("uses a native disclosure that works without JavaScript", () => {
  render(<Faq />);

  const question = screen.getByText(/echa de menos/i).closest("summary");
  const disclosure = question?.closest("details");
  expect(question).not.toBeNull();
  expect(disclosure).not.toHaveAttribute("open");
  fireEvent.click(question!);
  expect(disclosure).toHaveAttribute("open");
  expect(screen.getByText(/equipo acompaña de cerca/i)).toBeInTheDocument();
});
