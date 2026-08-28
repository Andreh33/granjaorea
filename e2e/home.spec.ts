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
  const question = page.getByRole("button", { name: /echa de menos/i });

  await question.focus();
  await page.keyboard.press("Enter");

  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: /echa de menos/i }),
  ).toContainText(/equipo acompa/i);
});

test("mobile menu has a complete keyboard close flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /abrir men/i });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const dialog = page.getByRole("dialog", { name: /men.*principal/i });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "La experiencia" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile contact action disappears before colliding with the footer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.locator("#actividades").scrollIntoViewIfNeeded();
  const sticky = page.locator('a[href*="wa.me"]', {
    hasText: "Consultar temporada 2027",
  });
  await expect(sticky).toBeVisible();

  await page.locator("[data-site-footer]").scrollIntoViewIfNeeded();
  await expect(sticky).toBeHidden();
  await expect(page.locator("[data-site-footer]")).toBeVisible();
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
  const pageErrors: string[] = [];
  const failedResponses: string[] = [];

  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });
  const imageLocator = page.locator("img");
  for (let index = 0; index < (await imageLocator.count()); index += 1) {
    await imageLocator.nth(index).scrollIntoViewIfNeeded();
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
  expect(failedResponses).toEqual([]);
  expect(seriousViolations).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps the thesis, full day, care facts, and contact action readable", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('time[datetime="08:30"]')).toBeVisible();
    await expect(page.getByText(/equipo titulado y presente/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /whatsapp/i }).first(),
    ).toBeVisible();
  });
});
