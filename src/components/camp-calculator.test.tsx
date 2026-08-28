import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CampCalculator } from "./camp-calculator";

describe("CampCalculator", () => {
  it("shows both confirmed turn prices and an honest estimate", () => {
    render(<CampCalculator />);

    expect(
      screen.getByRole("heading", { name: /elige su quincena/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /primera quincena.*690/i })).toBeChecked();
    expect(screen.getByRole("radio", { name: /segunda quincena.*630/i })).toBeInTheDocument();
    expect(screen.getByText(/estimación informativa/i)).toBeInTheDocument();
    expect(screen.getAllByText(/disponibilidad.*equipo/i)).not.toHaveLength(0);
  });

  it("updates the live total when the family changes fortnight", async () => {
    const user = userEvent.setup();
    render(<CampCalculator />);

    await user.click(screen.getByRole("radio", { name: /segunda quincena.*630/i }));

    expect(screen.getByTestId("estimate-total")).toHaveTextContent("630");
    expect(screen.getByTestId("estimate-session")).toHaveTextContent("16–30 de julio");
  });

  it("opens one personalized WhatsApp conversation after valid family details", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<CampCalculator />);

    await user.type(screen.getByLabelText(/nombre del responsable/i), "Ana López");
    await user.type(screen.getByLabelText(/^teléfono/i), "+34 612 345 678");
    await user.type(screen.getByLabelText(/edad del niño/i), "9");
    await user.click(screen.getByRole("button", { name: /continuar por whatsapp/i }));

    expect(open).toHaveBeenCalledOnce();
    const [url, target, features] = open.mock.calls[0];
    expect(decodeURIComponent(String(url))).toContain("Ana López");
    expect(decodeURIComponent(String(url))).toContain("9 años");
    expect(decodeURIComponent(String(url))).toContain("690 €");
    expect(target).toBe("_blank");
    expect(features).toContain("noopener");
  });
});
