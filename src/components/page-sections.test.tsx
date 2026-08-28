import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SeasonPanel, TrustStrip } from "./page-sections";

describe("TrustStrip", () => {
  it("renders four useful facts without interaction", () => {
    render(<TrustStrip />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});

describe("SeasonPanel", () => {
  it("publishes an honest 2027 prelaunch state without a sales carousel", () => {
    const { container } = render(<SeasonPanel />);

    expect(
      screen.getByRole("heading", { name: /temporada 2027/i }),
    ).toBeInTheDocument();
    expect(container).not.toHaveTextContent("€");
    expect(screen.queryByRole("region", { name: /carrusel/i })).toBeNull();
  });
});
