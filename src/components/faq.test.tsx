import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Faq } from "./faq";

it("uses a native disclosure that works without JavaScript", () => {
  render(<Faq />);

  const question = screen.getByText(/cuándo se puede visitar/i).closest("summary");
  const disclosure = question?.closest("details");
  expect(question).not.toBeNull();
  expect(disclosure).not.toHaveAttribute("open");
  fireEvent.click(question!);
  expect(disclosure).toHaveAttribute("open");
  expect(screen.getByText(/visitas familiares se organizan con cita previa/i)).toBeInTheDocument();
  expect(screen.queryByText(/sábados y domingos por la mañana/i)).not.toBeInTheDocument();
});

it("keeps questions free of decorative numeric indexes", () => {
  render(<Faq />);

  expect(screen.queryByText("01")).not.toBeInTheDocument();
  expect(screen.getAllByRole("group")).toHaveLength(7);
});
