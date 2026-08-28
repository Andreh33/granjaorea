import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Testimonials } from "./page-sections";
import { CareSection } from "./care-section";

describe("CareSection", () => {
  it("anchors visits at the stable destination with the approved invitation", () => {
    const { container } = render(<CareSection />);

    expect(
      screen.getByRole("heading", {
        name: /cada grupo necesita su propia forma de vivir orea/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/una finca que escucha antes de proponer/i),
    ).toBeVisible();
    expect(container.querySelector("section#visitas")).toBeInTheDocument();
  });

  it("keeps the four year-round care principles visible without interaction", () => {
    render(<CareSection />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.queryByText(/echa de menos casa/i)).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });
});

describe("Testimonials", () => {
  it("labels every family quotation with its source context", () => {
    render(<Testimonials />);

    expect(screen.getAllByRole("blockquote")).toHaveLength(3);
    expect(screen.getAllByTestId("testimonial-context")).toHaveLength(3);
  });
});
