# Orea Camp Next.js Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade, motion-rich, mobile-first Orea Camp 2027 pre-launch landing page that is truthful, accessible, SEO-complete, fast, and ready for later GitHub/Vercel connection.

**Architecture:** Next.js App Router renders the marketing experience as Server Components, with small Client Component islands for navigation, the scroll-linked day story, activity pointer response, FAQ state, and sticky conversion UI. Typed content modules are the only source of commercial facts, while SEO helpers, WhatsApp conversion URLs, and interactive semantics are independently testable.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript, Node.js 24, Motion for React, CSS Modules/global tokens, Vitest, Testing Library, Playwright, axe-core, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-28-orea-camp-nextjs-redesign-design.md`

## Global Constraints

- Use Next.js `16.3.3`, React `19.2.8`, TypeScript, App Router, and the default Node.js runtime.
- Keep the initial release in an honest `Temporada 2027 · Fechas y plazas próximamente` state; do not invent dates, prices, availability, discounts, or deadlines.
- Use the existing real WhatsApp number `+34 615 367 717`; add no lead form until Resend is provisioned through Vercel Marketplace.
- Render marketing content and FAQ answers in server HTML; animation may enhance but never gate visibility.
- Use Server Components by default and keep Client Components narrowly scoped.
- Meet WCAG 2.2 AA, support keyboard navigation, and provide a static reduced-motion experience.
- Target mobile Lighthouse Performance ≥90 and Accessibility/SEO/Best Practices ≥95.
- Keep initial transfer under 1 MB, LCP under 2.5 s, CLS under 0.1, and page-specific client JavaScript under 160 KB compressed.
- Do not commit secrets, personal data, stale legal claims, or a simulated submission backend.

## File Structure

```text
.
├── .github/workflows/ci.yml              # GitHub quality gate
├── e2e/home.spec.ts                      # Browser, keyboard, overflow, and no-JS checks
├── public/images/orea/                    # Audited Orea-owned photographic assets
├── src/app/
│   ├── globals.css                       # Design tokens, resets, shared utilities
│   ├── icon.svg                          # Brand-derived app icon
│   ├── layout.tsx                        # Fonts, root metadata, global shell
│   ├── opengraph-image.tsx               # Branded 1200×630 share image
│   ├── page.tsx                          # Server-rendered page composition
│   ├── robots.ts                         # Crawl policy
│   └── sitemap.ts                        # Canonical URL inventory
├── src/components/
│   ├── activities-grid.module.css/.tsx   # Editorial interactive photo mosaic
│   ├── care-section.module.css/.tsx      # Safety and practical-care content
│   ├── conversion-cta.module.css/.tsx    # Final and mobile sticky real CTAs
│   ├── day-timeline.module.css/.tsx      # Scroll-linked schedule story
│   ├── faq.module.css/.tsx                # Accessible disclosure group
│   ├── hero.module.css/.tsx               # Hero thesis and first motion sequence
│   ├── page-sections.module.css/.tsx      # Trust, season, testimonials, footer
│   ├── route-line.module.css/.tsx         # Shared topographic SVG signature
│   └── site-header.module.css/.tsx        # Responsive navigation
├── src/content/site-content.ts            # Typed factual content
├── src/lib/seo.ts                         # Metadata and JSON-LD builders
├── src/lib/whatsapp.ts                    # Normalized conversion URLs
├── src/test/setup.ts                      # Testing Library matchers
├── src/**/*.test.ts(x)                    # Unit and component tests beside code
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

### Task 1: Project foundation and typed content

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `src/test/setup.ts`, `.gitignore`
- Create: `src/content/site-content.test.ts`
- Create: `src/content/site-content.ts`

**Interfaces:**
- Produces: `SiteContent`, `siteContent`, `Season`, `TimelineItem`, `Activity`, `FaqItem`.
- Consumes: Exact factual constraints from the approved spec.

- [ ] **Step 1: Add framework and test configuration**

Create a package with scripts `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:watch`, and `test:e2e`. Pin Next and React exactly; install current compatible releases of Motion, Vitest, jsdom, Testing Library, Playwright, axe-core, and ESLint.

- [ ] **Step 2: Write the failing content-invariant tests**

```ts
import { describe, expect, it } from 'vitest'
import { siteContent } from './site-content'

describe('siteContent', () => {
  it('publishes an honest 2027 prelaunch state', () => {
    expect(siteContent.season.year).toBe(2027)
    expect(siteContent.season.status).toBe('prelaunch')
    expect(siteContent.season.sessions).toEqual([])
    expect(siteContent.season.message).toBe('Fechas y plazas próximamente')
  })

  it('contains a chronological, complete camp day', () => {
    expect(siteContent.timeline[0].time).toBe('08:30')
    expect(siteContent.timeline.at(-1)?.time).toBe('22:15')
    expect(siteContent.timeline.length).toBeGreaterThanOrEqual(8)
  })

  it('does not expose stale 2026 sales language', () => {
    expect(JSON.stringify(siteContent)).not.toMatch(/690|630|últimas plazas/i)
  })
})
```

- [ ] **Step 3: Run the test and verify RED**

Run: `npm test -- src/content/site-content.test.ts`

Expected: FAIL because `./site-content` does not exist.

- [ ] **Step 4: Implement the typed content source**

Define exact types and export content containing the 2027 pre-launch message, confirmed organization/contact facts, at least nine chronological timeline entries derived from the source dossier, eight activity entries, six care facts, the three current quotations with contextual labels, and eight corrected FAQ entries. Do not include 2026 prices or availability claims.

- [ ] **Step 5: Run tests, typecheck, and commit**

Run: `npm test -- src/content/site-content.test.ts && npm run typecheck`

Expected: PASS with no warnings.

Commit: `feat: establish typed Orea content foundation`

---

### Task 2: Conversion URL and SEO foundation

**Files:**
- Create: `src/lib/whatsapp.test.ts`, `src/lib/whatsapp.ts`
- Create: `src/lib/seo.test.ts`, `src/lib/seo.ts`
- Create: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`, `src/app/icon.svg`

**Interfaces:**
- Consumes: `siteContent.organization`, `siteContent.season`, `siteContent.faq`.
- Produces: `buildWhatsAppUrl(message: string): string`, `buildMetadata()`, `buildOrganizationJsonLd()`, `buildFaqJsonLd()`.

- [ ] **Step 1: Write failing WhatsApp URL tests**

```ts
import { expect, it } from 'vitest'
import { buildWhatsAppUrl } from './whatsapp'

it('builds an encoded availability conversation for the real Orea number', () => {
  expect(buildWhatsAppUrl('Hola, quiero conocer las fechas 2027')).toBe(
    'https://wa.me/34615367717?text=Hola%2C%20quiero%20conocer%20las%20fechas%202027',
  )
})
```

- [ ] **Step 2: Verify RED, implement, and verify GREEN**

Run RED: `npm test -- src/lib/whatsapp.test.ts`

Implement with `URLSearchParams` or `encodeURIComponent`, keeping the normalized number constant private to the module.

Run GREEN: `npm test -- src/lib/whatsapp.test.ts`

- [ ] **Step 3: Write failing SEO tests**

```ts
import { describe, expect, it } from 'vitest'
import { buildFaqJsonLd, buildMetadata, buildOrganizationJsonLd } from './seo'

describe('SEO builders', () => {
  it('builds a location-rich canonical metadata object', () => {
    const metadata = buildMetadata()
    expect(metadata.alternates?.canonical).toBe('https://campamentos.granjaorea.com/')
    expect(String(metadata.title)).toMatch(/Campamento de verano.*Ciudad Real/i)
    expect(metadata.description).toMatch(/6 a 16 años/i)
  })

  it('mirrors every visible FAQ entry into valid FAQPage JSON-LD', () => {
    const data = buildFaqJsonLd()
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toHaveLength(8)
  })

  it('identifies Orea without inventing an offer', () => {
    const data = buildOrganizationJsonLd()
    expect(data['@type']).toBe('Organization')
    expect(JSON.stringify(data)).not.toContain('Offer')
  })
})
```

- [ ] **Step 4: Verify RED and implement metadata/structured data**

Run: `npm test -- src/lib/seo.test.ts`

Expected: FAIL because `./seo` does not exist.

Implement typed metadata plus Organization and FAQPage JSON-LD. Add valid `robots.ts`, a one-route sitemap, a brand-derived SVG icon, and a static Node-runtime `ImageResponse` share image.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/lib && npm run typecheck`

Commit: `feat: add conversion and SEO foundations`

---

### Task 3: Root shell, hero, trust, and honest season panel

**Files:**
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/components/hero.test.tsx`, `src/components/hero.tsx`, `src/components/hero.module.css`
- Create: `src/components/page-sections.test.tsx`, `src/components/page-sections.tsx`, `src/components/page-sections.module.css`
- Create: `src/components/route-line.tsx`, `src/components/route-line.module.css`
- Add: optimized source photos under `public/images/orea/`

**Interfaces:**
- Consumes: `siteContent`, `buildWhatsAppUrl`, SEO builders.
- Produces: `Hero`, `TrustStrip`, `SeasonPanel`, `StructuredData`, `RouteLine`.

- [ ] **Step 1: Write failing semantic rendering tests**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Hero } from './hero'

it('renders one visible campaign h1 and a real conversion link', () => {
  render(<Hero />)
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'El verano en el que empiezan a volver distintos',
  )
  expect(screen.getByRole('link', { name: /avísame por whatsapp/i })).toHaveAttribute(
    'href',
    expect.stringContaining('wa.me/34615367717'),
  )
})
```

Add tests that TrustStrip renders four facts and SeasonPanel contains `Temporada 2027`, contains no euro price, and has no carousel role.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/hero.test.tsx src/components/page-sections.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the server-rendered shell and components**

Load Anybody, Instrument Sans, and IBM Plex Mono through `next/font`. Create the global token system, skip link, root metadata, `main` landmark, JSON-LD script, hero image with responsive `sizes`, trust strip, topographic route SVG, and honest season panel. All copy and links must exist in initial HTML.

- [ ] **Step 4: Add progressive hero motion**

Use one small Client Component only for the entrance sequence and route drawing. CSS leaves the final visible state as the default; JavaScript opts into motion after hydration. Reduced motion returns the final static state immediately.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components && npm run lint && npm run typecheck && npm run build`

Commit: `feat: create Orea hero and campaign shell`

---

### Task 4: Scroll-linked day timeline

**Files:**
- Create: `src/components/day-timeline.test.tsx`
- Create: `src/components/day-timeline.tsx`
- Create: `src/components/day-timeline.module.css`

**Interfaces:**
- Consumes: `siteContent.timeline: TimelineItem[]`.
- Produces: `DayTimeline` with ordered-list semantics and a decorative daylight dial.

- [ ] **Step 1: Write failing timeline tests**

```tsx
import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { DayTimeline } from './day-timeline'

it('renders the complete day as a chronological ordered list', () => {
  render(<DayTimeline />)
  const items = screen.getAllByRole('listitem')
  expect(items.length).toBeGreaterThanOrEqual(8)
  expect(items[0]).toHaveTextContent('08:30')
  expect(items.at(-1)).toHaveTextContent('22:15')
})

it('keeps the daylight dial decorative', () => {
  render(<DayTimeline />)
  expect(screen.getByTestId('daylight-dial')).toHaveAttribute('aria-hidden', 'true')
})
```

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/day-timeline.test.tsx`

- [ ] **Step 3: Implement semantic content and native layout**

Build the mobile-first ordered timeline, sticky desktop dial, time markers, and route line. The static DOM order must match chronology and remain readable without transforms.

- [ ] **Step 4: Add scroll progression**

Use Motion `useScroll` scoped to the section and `useTransform` for dial rotation, light temperature, and route progress. Do not pin or hijack mobile scroll. Use `useReducedMotion` to bypass all scroll transforms.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components/day-timeline.test.tsx && npm run lint && npm run typecheck`

Commit: `feat: add scroll-linked Orea day story`

---

### Task 5: Activities, care, and family evidence

**Files:**
- Create: `src/components/activities-grid.test.tsx`, `src/components/activities-grid.tsx`, `src/components/activities-grid.module.css`
- Create: `src/components/care-section.test.tsx`, `src/components/care-section.tsx`, `src/components/care-section.module.css`
- Extend: `src/components/page-sections.tsx`, `src/components/page-sections.module.css`
- Add: selected real images under `public/images/orea/`

**Interfaces:**
- Consumes: `siteContent.activities`, `siteContent.care`, `siteContent.testimonials`.
- Produces: `ActivitiesGrid`, `CareSection`, `Testimonials`.

- [ ] **Step 1: Write failing content and accessibility tests**

Test that all eight activities render as articles, every content image has non-generic alt text, the care section exposes its heading and six facts without interaction, and each quotation includes a context label.

```tsx
expect(screen.getAllByRole('article')).toHaveLength(8)
for (const image of screen.getAllByRole('img')) {
  expect(image.getAttribute('alt')).not.toMatch(/^(image|foto)?$/i)
}
```

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/activities-grid.test.tsx src/components/care-section.test.tsx`

- [ ] **Step 3: Implement the editorial mosaic and care layout**

Use `next/image`, factual captions, source-sized responsive grids, and CSS aspect ratios. The care section uses practical scenarios and clear text rather than hidden marketing claims. Testimonials remain server-rendered and accurately labelled as family accounts, not external platform reviews.

- [ ] **Step 4: Add restrained pointer interaction**

Add a small pointer-driven transform to selected desktop activity cards, capped at 3°. Disable it for coarse pointers and reduced motion. Hover, focus, and tap all reveal the same caption content.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components/activities-grid.test.tsx src/components/care-section.test.tsx && npm run build`

Commit: `feat: showcase Orea activities and care`

---

### Task 6: Accessible navigation, FAQ, and conversion ending

**Files:**
- Create: `src/components/site-header.test.tsx`, `src/components/site-header.tsx`, `src/components/site-header.module.css`
- Create: `src/components/faq.test.tsx`, `src/components/faq.tsx`, `src/components/faq.module.css`
- Create: `src/components/conversion-cta.test.tsx`, `src/components/conversion-cta.tsx`, `src/components/conversion-cta.module.css`

**Interfaces:**
- Consumes: navigation section IDs, `siteContent.faq`, `buildWhatsAppUrl`.
- Produces: `SiteHeader`, `Faq`, `ConversionCta`.

- [ ] **Step 1: Write failing interaction tests**

```tsx
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Faq } from './faq'

it('toggles an answer with truthful ARIA state', () => {
  render(<Faq />)
  const button = screen.getByRole('button', { name: /echa de menos/i })
  expect(button).toHaveAttribute('aria-expanded', 'false')
  fireEvent.click(button)
  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByRole('region', { name: /echa de menos/i })).toBeVisible()
})
```

Add header tests for an accessible Spanish menu label, Escape close, focus return, and real section links. Add conversion tests proving WhatsApp and telephone links are present and no form is rendered.

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/components/site-header.test.tsx src/components/faq.test.tsx src/components/conversion-cta.test.tsx`

- [ ] **Step 3: Implement navigation and FAQ semantics**

Create a server-friendly header with a narrowly scoped mobile menu state, focus trapping, Escape support, and scroll locking. Build the FAQ from button/panel pairs with stable IDs and height/opacity transitions that respect reduced motion.

- [ ] **Step 4: Implement conversion ending and collision-safe sticky CTA**

Render a final photographic panel with WhatsApp and telephone actions. The mobile CTA observes the hero and footer to appear only in the useful middle range. It must reserve safe-area spacing and never cover FAQ controls or footer content.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- src/components/site-header.test.tsx src/components/faq.test.tsx src/components/conversion-cta.test.tsx && npm run build`

Commit: `feat: complete accessible navigation and conversion flow`

---

### Task 7: End-to-end behavior, SEO responses, and no-JavaScript resilience

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/home.spec.ts`
- Modify: components or styles only when a failing browser test reproduces a defect

**Interfaces:**
- Consumes: built application at `http://127.0.0.1:3000`.
- Produces: repeatable desktop/mobile/no-JS acceptance coverage.

- [ ] **Step 1: Write failing browser tests**

```ts
import { expect, test } from '@playwright/test'

test('mobile page has one h1 and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('h1')).toHaveCount(1)
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBe(0)
})

test('FAQ works from the keyboard', async ({ page }) => {
  await page.goto('/#preguntas')
  const question = page.getByRole('button', { name: /echa de menos/i })
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('aria-expanded', 'true')
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  test('keeps the thesis, full day, care facts, and contact action readable', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByText('08:30')).toBeVisible()
    await expect(page.getByRole('link', { name: /whatsapp/i }).first()).toBeVisible()
  })
})
```

Add tests for `robots.txt`, `sitemap.xml`, canonical metadata, JSON-LD, mobile menu keyboard flow, CTA/footer collision, broken images, console errors, and axe violations.

- [ ] **Step 2: Run and verify RED**

Run: `npm run build && npm run test:e2e`

Expected: at least one test fails before configuration and final integration are complete.

- [ ] **Step 3: Fix each reproduced issue minimally**

For every failure, change only the component or style responsible, retain the reproducing test, and rerun that exact Playwright test before the full suite.

- [ ] **Step 4: Verify the full browser suite and commit**

Run: `npm run test:e2e`

Expected: PASS with no page errors, broken resources, horizontal overflow, or serious axe violations.

Commit: `test: cover Orea campaign end to end`

---

### Task 8: Three visual critique cycles and performance hardening

**Files:**
- Modify: visual component and CSS files based on screenshot evidence
- Create: `.github/workflows/ci.yml`
- Create: `README.md`

**Interfaces:**
- Consumes: production build, desktop/tablet/mobile screenshots, Lighthouse JSON.
- Produces: polished final local build and automated quality gate.

- [ ] **Step 1: Structural critique cycle**

Capture full-page and sectional screenshots at 390×844, 768×1024, and 1440×1000. Check hero thesis, content rhythm, typography, offer clarity, sticky elements, image crops, and footer. Record defects as failing Playwright assertions when behavior can regress, then correct them.

- [ ] **Step 2: Motion critique cycle**

Record desktop and mobile scroll behavior with normal and reduced motion. Remove any effect that does not improve orientation, trust, or conversion. Confirm no scroll hijack, no content visibility dependency, no motion-driven layout shift, and no touch-only hover trap.

- [ ] **Step 3: Polish and performance cycle**

Run Lighthouse against the production server. Optimize image source dimensions/quality, client boundaries, font weights, route SVG complexity, and below-fold loading until the global budgets pass or every remaining variance is documented with measured evidence.

- [ ] **Step 4: Add CI and operating documentation**

GitHub Actions must run `npm ci`, `npm run lint`, `npm run typecheck`, `npm test -- --run`, `npm run build`, and Playwright. README must explain local commands, season-data editing, image ownership, the Vercel/Resend production gate, and the exact `npm i -g vercel` prerequisite.

- [ ] **Step 5: Final verification and commit**

Run:

```bash
npm run lint
npm run typecheck
npm test -- --run
npm run build
npm run test:e2e
```

Expected: every command exits 0 with no warnings treated as errors.

Commit: `feat: polish and harden Orea Camp experience`

---

## Plan Self-Review

- Spec coverage: every product, design, motion, architecture, SEO, accessibility, performance, testing, repository, and deployment-gate section is represented in Tasks 1–8.
- Intentional production gates: confirmed 2027 commercial data, validated legal copy, GitHub connection, Vercel project connection, and Marketplace provisioning are external inputs and are explicitly excluded from fabricated local behavior.
- Type consistency: `siteContent`, `buildWhatsAppUrl`, `buildMetadata`, `buildOrganizationJsonLd`, and `buildFaqJsonLd` are defined before use.
- Testing order: every production behavior is preceded by a failing unit, component, or browser test; visual-only refinements are verified through screenshot review and browser assertions.
- Scope remains one deployable marketing experience; payment, CMS, accounts, and automated availability remain separate future projects.

