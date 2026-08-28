import { expect, it } from "vitest";

import { buildWhatsAppUrl } from "./whatsapp";

it("builds an encoded availability conversation for the real Orea number", () => {
  expect(buildWhatsAppUrl("Hola, quiero conocer las fechas 2027")).toBe(
    "https://wa.me/34615367717?text=Hola%2C%20quiero%20conocer%20las%20fechas%202027",
  );
});
