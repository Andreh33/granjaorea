import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrustStrip } from "./page-sections";

describe("TrustStrip", () => {
  it("renders four useful facts without interaction", () => {
    render(<TrustStrip />);

    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });
});
