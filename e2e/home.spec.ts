import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const canonicalUrl = "https://campamentos.granjaorea.com/";

test("page keeps its content contract and never overflows horizontally", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("FAQ works from the keyboard and exposes its answer", async ({ page }) => {
  await page.goto("/#preguntas");
  const question = page.locator("summary", { hasText: /cuándo se puede visitar/i });

  await question.focus();
  await page.keyboard.press("Enter");

  await expect(question.locator("..")).toHaveAttribute("open", "");
  await expect(
    question.locator("..").getByText(/^Las visitas familiares se organizan/i),
  ).toBeVisible();
});

test("mobile menu has a complete keyboard close flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /abrir men/i });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: /men.*principal/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Experiencias" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile contact action disappears before colliding with interactive sections", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.locator("#experiencias").scrollIntoViewIfNeeded();
  const sticky = page.locator('a[href*="wa.me"]', {
    hasText: "Hablar con Orea",
  });
  await expect(sticky).toBeVisible();

  await page.locator("#temporada").scrollIntoViewIfNeeded();
  await expect(sticky).toBeHidden();

  await page.locator("#ubicacion").scrollIntoViewIfNeeded();
  await expect(sticky).toBeHidden();

  await page.locator("[data-site-footer]").scrollIntoViewIfNeeded();
  await expect(sticky).toBeHidden();
  await expect(page.locator("[data-site-footer]")).toBeVisible();
});

test("calculator prepares the selected price and family details for WhatsApp", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "open", {
      configurable: true,
      value: (url: string | URL | undefined) => {
        Object.assign(window, { __oreaWhatsAppUrl: String(url) });
        return null;
      },
    });
  });
  await page.goto("/#temporada");

  await page.getByRole("radio", { name: /segunda quincena.*630/i }).click();
  await expect(page.getByTestId("estimate-total")).toHaveText("630");
  await page.getByLabel(/nombre del responsable/i).fill("Ana López");
  await page.getByLabel(/^teléfono/i).fill("+34 612 345 678");
  await page.getByLabel(/edad del niño/i).fill("9");
  await page.getByRole("button", { name: /continuar por whatsapp/i }).click();

  const conversationUrl = await page.evaluate(
    () => (window as typeof window & { __oreaWhatsAppUrl?: string }).__oreaWhatsAppUrl,
  );
  const conversation = decodeURIComponent(conversationUrl ?? "");
  expect(conversation).toContain("wa.me/34615367717");
  expect(conversation).toContain("Ana López");
  expect(conversation).toContain("9 años");
  expect(conversation).toContain("Segunda quincena");
  expect(conversation).toContain("630 €");
});

test("location shows Google Maps directly with a separate directions link", async ({
  page,
}) => {
  await page.goto("/#ubicacion");

  await expect(page.getByTitle(/mapa de granja escuela orea/i)).toBeVisible();
  await expect(page.getByTitle(/mapa de granja escuela orea/i)).toHaveAttribute(
    "src",
    /google\.com\/maps.*output=embed/,
  );
  await expect(
    page.getByRole("link", { name: /cómo llegar con google maps/i }),
  ).toHaveAttribute("target", "_blank");
});

test("year-round experience paths replace the old fixed routine", async ({ page }) => {
  await page.goto("/#experiencias");

  await expect(page.getByRole("heading", { name: /cuatro formas de vivir orea/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /visitas en familia/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /colegios y grupos/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /celebraciones/i })).toBeVisible();
  await expect(page.locator('time[datetime="08:30"]')).toHaveCount(0);
});

test("canonical and structured data describe the same public site", async ({
  page,
}) => {
  await page.goto("/");

  const canonicalHref = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  expect(new URL(canonicalHref ?? "").href).toBe(canonicalUrl);

  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent ?? "{}")),
    );
  expect(structuredData.map((entry) => entry["@type"])).toEqual([
    "Organization",
    "WebSite",
    "FAQPage",
  ]);
  expect(structuredData.every((entry) => entry["@context"] === "https://schema.org")).toBe(
    true,
  );
});

test("robots and sitemap expose the canonical production URL", async ({ request }) => {
  const [robots, sitemap] = await Promise.all([
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
  ]);

  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(
    "Sitemap: https://campamentos.granjaorea.com/sitemap.xml",
  );
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(`<loc>${canonicalUrl}</loc>`);
});

test("the rendered page has no broken images, page errors, or serious axe violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];
  const failedRequests: string[] = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("requestfailed", (request) => {
    if (new URL(request.url()).origin === "http://127.0.0.1:4173") {
      failedRequests.push(`${request.failure()?.errorText ?? "failed"} ${request.url()}`);
    }
  });
  page.on("response", (response) => {
    if (
      response.status() >= 400 &&
      new URL(response.url()).origin === "http://127.0.0.1:4173"
    ) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });
  const imageLocator = page.locator("img");
  for (let index = 0; index < (await imageLocator.count()); index += 1) {
    const image = imageLocator.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await page.waitForLoadState("networkidle");

  const brokenImages = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image): image is HTMLImageElement =>
        image instanceof HTMLImageElement,
      )
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );
  const axe = await new AxeBuilder({ page }).analyze();
  const seriousViolations = axe.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );

  expect(brokenImages).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(seriousViolations).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps the thesis, year-round paths, care facts, and contact action readable", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /visitas en familia/i })).toBeVisible();
    await expect(page.getByText(/equipo titulado y presente/i)).toBeVisible();
    const familyQuestion = page.locator("summary", {
      hasText: /cuándo se puede visitar/i,
    });
    await familyQuestion.focus();
    await page.keyboard.press("Enter");
    await expect(
      familyQuestion.locator("..").getByText(/^Las visitas familiares se organizan/i),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /whatsapp/i }).first(),
    ).toBeVisible();
  });

  test("never submits calculator details into the page URL", async ({ page }) => {
    await page.goto("/#temporada");

    await page.getByLabel(/nombre del responsable/i).fill("Dato privado");
    await page.getByLabel(/^teléfono/i).fill("612345678");
    await page.getByLabel(/edad del niño/i).fill("9");
    await page.getByRole("button", { name: /continuar por whatsapp/i }).click();

    expect(new URL(page.url()).search).toBe("");
    expect(page.url()).not.toContain("Dato");
  });
});
