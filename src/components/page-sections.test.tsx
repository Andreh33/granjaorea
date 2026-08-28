import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Testimonials, TrustStrip } from "./page-sections";

describe("TrustStrip", () => {
  it("renders four useful facts without interaction", () => {
    render(<TrustStrip />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByText(/con cita previa/i)).toBeVisible();
    expect(screen.queryByText(/fines de semana/i)).not.toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });
});

describe("Testimonials", () => {
  it("keeps the approved testimonial wording", () => {
    render(<Testimonials />);

    expect(screen.getByText(/atención médica a diez minutos/i)).toBeVisible();
    expect(screen.getByText(/una experiencia de diez/i)).toBeVisible();
    expect(screen.getByText(/la comida es casera/i)).toBeVisible();
  });

  it("keeps every approved testimonial context exact", () => {
    render(<Testimonials />);

    expect(
      screen.getByText(
        "Madre de una participante de 10 años · testimonio compartido con Orea",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Padre de un participante de 14 años · testimonio compartido con Orea",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Madre de dos participantes · testimonio compartido con Orea",
      ),
    ).toBeVisible();
  });

  it("keeps quotations semantic and removes decorative indexes", () => {
    render(<Testimonials />);

    expect(screen.getAllByRole("blockquote")).toHaveLength(3);
    expect(screen.getAllByTestId("testimonial-context")).toHaveLength(3);
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });
});
