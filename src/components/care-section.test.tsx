import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Testimonials } from "./page-sections";
import { CareSection } from "./care-section";

describe("CareSection", () => {
  it("keeps the four year-round care principles visible without interaction", () => {
    render(<CareSection />);

    expect(
      screen.getByRole("heading", { name: /experiencia bien cuidada/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.queryByText(/echa de menos casa/i)).not.toBeInTheDocument();
  });
});

describe("Testimonials", () => {
  it("labels every family quotation with its source context", () => {
    render(<Testimonials />);

    expect(screen.getAllByRole("blockquote")).toHaveLength(3);
    expect(screen.getAllByTestId("testimonial-context")).toHaveLength(3);
  });
});
