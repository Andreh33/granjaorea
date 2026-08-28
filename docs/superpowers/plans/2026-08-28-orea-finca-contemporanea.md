# Orea Finca Contemporánea Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rehacer la landing de Orea como una finca contemporánea, rural y editorial donde Granja escuela, Hípica y Campamentos tengan el mismo peso, conservando WhatsApp, la calculadora 690/630, Google Maps y el hero 4K.

**Architecture:** La página seguirá siendo una landing estática de Next.js 16 con Server Components por defecto. Un único contrato de contenido expondrá los tres pilares y los créditos fotográficos; componentes separados renderizarán hero, portones, capítulos, conversión y footer. Solo menú, calculadora y CTA flotante conservarán JavaScript de cliente.

**Tech Stack:** Next.js 16.3.3 App Router, React 19.2.8, TypeScript 6, CSS Modules, `next/image`, `next/font`, Vitest, Testing Library, Playwright, axe y Lighthouse.

**Spec:** `docs/superpowers/specs/2026-08-28-orea-finca-contemporanea-design.md`

## Global Constraints

- Granja escuela, Hípica y Campamentos deben tener exactamente el mismo nivel semántico y visual.
- Paleta: blanco calizo `#FBFAF5`, oliva `#7B8042`, bosque `#183B2B`, pino profundo `#0D2A20`, naranja arcilla `#C7643D` y paja `#E8DFCA`.
- Bitter variable para display e Instrument Sans para cuerpo; no usar IBM Plex Mono en la interfaz visible.
- Sin neón, lima eléctrica, cian, violeta, holografía, coordenadas, inclinación 3D ni animaciones infinitas.
- No añadir librerías de animación. El movimiento debe resolverse con CSS y respetar `prefers-reduced-motion`.
- Hero local de 3840 × 2943 px, `quality={90}`, `preload` y `sizes="100vw"`; solo el hero se precarga.
- Las imágenes editoriales deben identificarse públicamente, tener crédito accesible y textos alternativos literales.
- La hípica no promete clases, rutas, niveles, edades ni actividades concretas sin confirmación.
- Las visitas se comunican «con cita previa», sin horarios recurrentes.
- Las citas familiares deben conservar el texto aprobado de `c99a32a` o dejar de mostrarse como citas literales.
- Los precios y fechas proceden de `src/content/camp-config.ts`.
- La calculadora no envía PII al servidor ni a la URL de la página.
- Google Maps mantiene `loading="lazy"` y `referrerPolicy="no-referrer"`.
- La canonical debe apuntar al contenido realmente publicado; hasta el corte DNS será `https://granjaorea.vercel.app/`.
- Comprobaciones visuales exactas a 390, 768 y 1440 px.

---

## File Map

**Create**

- `src/components/pillar-gateways.tsx`: tres portones fotográficos y enlaces internos.
- `src/components/pillar-gateways.module.css`: composición 3 / 1+2 / 1 y hover rural.
- `src/components/pillar-gateways.test.tsx`: igualdad semántica, imágenes y destinos.
- `src/components/pillar-chapters.tsx`: capítulos detallados de Granja, Hípica y Campamentos.
- `src/components/pillar-chapters.module.css`: capítulos alternos con el mismo patrón y peso.
- `src/components/pillar-chapters.test.tsx`: copy prudente de hípica y acceso a calculadora.
- `src/components/site-footer.tsx`: `contentinfo`, contacto, legales y créditos públicos.
- `src/components/site-footer.module.css`: footer verde oscuro y panel de créditos.
- `src/components/site-footer.test.tsx`: landmark, año, créditos y enlaces.
- `scripts/assert-lighthouse.mjs`: falla si alguna categoría queda bajo su presupuesto.

**Modify**

- `src/content/site-content.ts` y `.test.ts`: contrato de pilares, copy, créditos, FAQ y citas aprobadas.
- `src/app/layout.tsx`: Bitter + Instrument Sans, sin IBM Plex Mono.
- `src/app/globals.css`: tokens aprobados y base blanca.
- `src/app/icon.svg`: identidad anual OREA.
- `src/app/page.tsx`: nueva secuencia y footer fuera de `main`.
- `src/components/site-header.tsx`, `header-mobile-menu.tsx`, `site-header.module.css`, `.test.tsx`: navegación a los tres pilares y cabecera clara.
- `src/components/hero.tsx`, `hero.module.css`, `.test.tsx`: hero editorial sin estadísticas tecnológicas.
- `src/components/photo-gallery.tsx`, `.module.css`, `.test.tsx`: galería contenida y aviso Unsplash.
- `src/components/care-section.tsx`, `.module.css`, `.test.tsx`: confianza y visitas con tono rural.
- `src/components/page-sections.tsx`, `.module.css`, `.test.tsx`: banda de credenciales y citas aprobadas sin numeración decorativa.
- `src/components/camp-calculator.module.css`: tratamiento paja/oliva/naranja sin cambiar lógica.
- `src/components/location-map.tsx`, `.module.css`, `.test.tsx`: copy sin coordenadas y marco rural.
- `src/components/faq.tsx`, `.module.css`, `.test.tsx`: copy anual y estilo editorial.
- `src/components/conversion-cta.tsx`, `.module.css`, `.test.tsx`: cierre de tres pilares; eliminar footer interno.
- `src/components/mobile-sticky-cta.tsx`: etiqueta «Hablar con Orea» y paleta aprobada.
- `src/lib/seo.ts`, `.test.ts`: hípica, canonical real y logo anual.
- `src/app/opengraph-image.tsx`: identidad rural y tres pilares.
- `src/app/robots.ts`, `src/app/sitemap.ts`: canonical Vercel temporal mediante el contenido central.
- `playwright.config.ts`, `e2e/home.spec.ts`: tres viewports exactos y nuevos contratos.
- `package.json`, `package-lock.json`: script y dependencia de Lighthouse.
- `README.md`: nueva dirección, créditos públicos, canonical temporal y comandos.

**Delete**

- `src/components/experience-card.tsx`.
- `src/components/year-round-experiences.tsx`, `.module.css`, `.test.tsx`.

---

### Task 1: Centralizar los tres pilares y la integridad editorial

**Files:**
- Modify: `src/content/site-content.ts`
- Modify: `src/content/site-content.test.ts`

**Interfaces:**
- Produces: `PillarId = "granja" | "hipica" | "campamentos"`.
- Produces: `Pillar` with `id`, `label`, `eyebrow`, `headline`, `summary`, `detail`, `image`, `imageAlt`, `focalPoint`, `href`, `ctaLabel`, `tone`.
- Produces: `PhotoCredit` with `file`, `author`, `sourceUrl`.
- Produces: `siteContent.pillars: readonly Pillar[]` and `siteContent.photoCredits: readonly PhotoCredit[]`.
- Consumes: `campSeason` from `src/content/camp-config.ts` for all camp dates/prices.

- [ ] **Step 1: Replace the old content expectations with failing pillar tests**

```ts
it("gives farm school, horse experiences, and camps equal first-level content", () => {
  expect(siteContent.pillars.map((pillar) => pillar.id)).toEqual([
    "granja",
    "hipica",
    "campamentos",
  ]);
  expect(siteContent.pillars).toHaveLength(3);
  expect(siteContent.navigation.slice(0, 3)).toEqual([
    { label: "Granja", href: "#granja" },
    { label: "Hípica", href: "#hipica" },
    { label: "Campamentos", href: "#campamentos" },
  ]);
});

it("avoids unconfirmed horse activities and recurring family schedules", () => {
  const publicCopy = JSON.stringify(siteContent);
  expect(publicCopy).not.toMatch(/sábados y domingos por la mañana/i);
  expect(publicCopy).not.toMatch(/clases de hípica|rutas a caballo|todos los fines de semana/i);
  expect(publicCopy).toMatch(/con cita previa/i);
});

it("publishes a credit for every stock image", () => {
  expect(siteContent.photoCredits).toHaveLength(7);
  expect(siteContent.photoCredits.every((credit) => credit.sourceUrl.startsWith("https://unsplash.com/photos/"))).toBe(true);
});
```

- [ ] **Step 2: Run the content test and observe the contract failure**

Run: `npm test -- src/content/site-content.test.ts`

Expected: FAIL because `pillars` and `photoCredits` do not exist and the current navigation/schedule still use the old contract.

- [ ] **Step 3: Replace `Experience` with the exact content contract**

```ts
export type PillarId = "granja" | "hipica" | "campamentos";

export interface Pillar {
  readonly id: PillarId;
  readonly label: string;
  readonly eyebrow: string;
  readonly headline: string;
  readonly summary: string;
  readonly detail: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly focalPoint: string;
  readonly href: string;
  readonly ctaLabel: string;
  readonly tone: "straw" | "olive" | "clay";
}

export interface PhotoCredit {
  readonly file: string;
  readonly author: string;
  readonly sourceUrl: string;
}
```

Use these three content objects exactly:

```ts
pillars: [
  {
    id: "granja",
    label: "Granja escuela",
    eyebrow: "Animales, naturaleza y aprendizaje",
    headline: "La granja se descubre con todos los sentidos.",
    summary: "Acercarse a los animales, aprender a cuidar lo vivo y compartir el campo convierte cada visita en una experiencia que se entiende haciéndola.",
    detail: "Familias, colegios y grupos · con cita previa",
    image: "/images/orea/stock-farm.jpg",
    imageAlt: "Niño sosteniendo una cría de cabra sobre la hierba",
    focalPoint: "50% 50%",
    href: "#granja",
    ctaLabel: "Descubrir la granja",
    tone: "straw",
  },
  {
    id: "hipica",
    label: "Hípica",
    eyebrow: "Caballos, cuidado y confianza",
    headline: "El caballo enseña otra forma de estar.",
    summary: "El mundo del caballo invita a observar, respetar y ganar confianza. Orea prepara la propuesta disponible según la fecha, la edad y el grupo.",
    detail: "Formato y disponibilidad a confirmar con Orea",
    image: "/images/orea/stock-horse.jpg",
    imageAlt: "Niña con casco montando a caballo delante de un establo",
    focalPoint: "54% 48%",
    href: "#hipica",
    ctaLabel: "Conocer la propuesta hípica",
    tone: "olive",
  },
  {
    id: "campamentos",
    label: "Campamentos",
    eyebrow: `Convivencia y aventura · verano ${campSeason.year}`,
    headline: "Días que ayudan a crecer.",
    summary: "Naturaleza, convivencia y autonomía para hacer amigos, asumir pequeños retos y volver con historias que duran mucho más que una quincena.",
    detail: "Dos quincenas · 6 a 16 años",
    image: "/images/orea/stock-group.jpg",
    imageAlt: "Grupo de niños reunido durante un juego al aire libre",
    focalPoint: "50% 50%",
    href: "#campamentos",
    ctaLabel: "Ver los campamentos",
    tone: "clay",
  },
],
```

Set hero title to `Granja, caballos y aventura. Todo el año.`, replace the stock-hero alt with `Grupo de niños caminando juntos por un bosque`, change the family schedule to `Visitas con cita previa`, and restore the three exact testimonial strings from `git show c99a32a:src/content/site-content.ts`.

- [ ] **Step 4: Add the seven exact credits already documented in `README.md`**

Use the filenames, authors and direct Unsplash photo-page URLs from the README. Do not use `images.unsplash.com` CDN URLs as public credits.

- [ ] **Step 5: Run the focused and full content tests**

Run: `npm test -- src/content/site-content.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the content contract**

```bash
git add src/content/site-content.ts src/content/site-content.test.ts
git commit -m "feat: center Orea on farm horse and camp pillars"
```

---

### Task 2: Crear la identidad rural global y la cabecera

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/icon.svg`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/header-mobile-menu.tsx`
- Modify: `src/components/site-header.module.css`
- Modify: `src/components/site-header.test.tsx`

**Interfaces:**
- Consumes: `siteContent.navigation` from Task 1.
- Produces: CSS variables `--color-chalk`, `--color-olive`, `--color-forest`, `--color-pine`, `--color-clay`, `--color-straw`, `--color-ink`.
- Produces: `--font-display` from Bitter and `--font-body` from Instrument Sans.

- [ ] **Step 1: Write failing identity and navigation tests**

```tsx
it("exposes all three pillars in desktop and mobile navigation", () => {
  render(<SiteHeader />);
  expect(screen.getAllByRole("link", { name: /^granja$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^hípica$/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /^campamentos$/i }).length).toBeGreaterThan(0);
  expect(screen.queryByText(/naturaleza · ciudad real/i)).toBeNull();
});
```

- [ ] **Step 2: Run the header test and verify it fails**

Run: `npm test -- src/components/site-header.test.tsx`

Expected: FAIL because the current navigation says Experiencias/Galería/Campamento.

- [ ] **Step 3: Switch the font imports and global tokens**

```tsx
import { Bitter, Instrument_Sans } from "next/font/google";

const bitter = Bitter({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const instrumentSans = Instrument_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

// html className
className={`${bitter.variable} ${instrumentSans.variable}`}
```

```css
:root {
  --color-chalk: #fbfaf5;
  --color-olive: #7b8042;
  --color-forest: #183b2b;
  --color-pine: #0d2a20;
  --color-clay: #c7643d;
  --color-straw: #e8dfca;
  --color-ink: #223129;
  --color-white: #ffffff;
  --content-max: 86rem;
  --page-gutter: clamp(1.1rem, 4vw, 4.5rem);
}
```

Set `body` to `background: var(--color-chalk)` and set both light/dark `themeColor` values to `#183B2B`.

- [ ] **Step 4: Rebuild the header and annual icon**

Use a chalk header surface with forest text, olive CTA, matte shadow, no backdrop-filter prism line, and a wordmark `OREA` with the descriptor `Granja · Hípica · Campamentos`. Keep the portal-based mobile menu and focus trap.

Replace `icon.svg` with a forest rounded square containing the cream word `OREA` and `<title>Granja Escuela Orea</title>`; remove all `Orea Camp` wording.

- [ ] **Step 5: Run header, type and lint checks**

Run: `npm test -- src/components/site-header.test.tsx && npm run typecheck && npm run lint`

Expected: all commands exit 0.

- [ ] **Step 6: Commit the identity foundation**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/icon.svg src/components/site-header.tsx src/components/header-mobile-menu.tsx src/components/site-header.module.css src/components/site-header.test.tsx
git commit -m "feat: introduce Orea rural identity"
```

---

### Task 3: Rehacer el hero y construir los tres portones

**Files:**
- Modify: `src/components/hero.tsx`
- Modify: `src/components/hero.module.css`
- Modify: `src/components/hero.test.tsx`
- Create: `src/components/pillar-gateways.tsx`
- Create: `src/components/pillar-gateways.module.css`
- Create: `src/components/pillar-gateways.test.tsx`
- Delete: `src/components/experience-card.tsx`
- Delete: `src/components/year-round-experiences.tsx`
- Delete: `src/components/year-round-experiences.module.css`
- Delete: `src/components/year-round-experiences.test.tsx`

**Interfaces:**
- Consumes: `siteContent.hero` and `siteContent.pillars`.
- Produces: `<PillarGateways />`, a Server Component with section id `pilares`.

- [ ] **Step 1: Write failing tests for the new hero thesis and equal gateways**

```tsx
it("names the three Orea worlds in the first conversion block", () => {
  render(<Hero />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Granja, caballos y aventura. Todo el año.",
  );
  expect(screen.getByRole("link", { name: /elegir una experiencia/i })).toHaveAttribute("href", "#pilares");
  expect(screen.queryByText("35+")).toBeNull();
});

it("renders three equivalent photographic gateways", () => {
  render(<PillarGateways />);
  expect(screen.getAllByRole("article")).toHaveLength(3);
  expect(screen.getByRole("heading", { name: "Granja escuela" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Hípica" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Campamentos" })).toBeVisible();
  expect(screen.getAllByRole("img")).toHaveLength(3);
});
```

- [ ] **Step 2: Run the two focused tests and verify red**

Run: `npm test -- src/components/hero.test.tsx src/components/pillar-gateways.test.tsx`

Expected: FAIL because the hero still uses the old thesis and `PillarGateways` does not exist.

- [ ] **Step 3: Implement the split editorial hero**

Keep the same `Image` source, `quality={90}`, `preload` and `sizes="100vw"`. Render a chalk copy panel and an arched photo panel. Use exactly these links:

```tsx
<a href="#pilares">Elegir una experiencia</a>
<a href="#temporada">Ver campamentos 2027</a>
```

Remove the three stat cards, coordinates, animated light, grid overlay and gradient text. Permit only the existing short `HeroEntrance` sequence and a maximum background scale transition of 1.02.

- [ ] **Step 4: Implement the gateway Server Component**

```tsx
export function PillarGateways() {
  return (
    <section aria-labelledby="pillars-title" className={styles.section} id="pilares">
      <header className={styles.intro}>
        <p>Tres maneras de vivir Orea</p>
        <h2 id="pillars-title">Elige por dónde empezar.</h2>
      </header>
      <div className={styles.grid}>
        {siteContent.pillars.map((pillar) => (
          <article className={styles.gateway} data-tone={pillar.tone} key={pillar.id}>
            <Image alt={pillar.imageAlt} fill sizes="(max-width: 760px) 100vw, 33vw" src={pillar.image} />
            <div className={styles.copy}>
              <p>{pillar.eyebrow}</p>
              <h3>{pillar.label}</h3>
              <span>{pillar.detail}</span>
              <a href={pillar.href}>{pillar.ctaLabel}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

CSS uses a three-column desktop grid, `grid-template-columns: 1fr 1fr` with the first item spanning both columns at 768 px, and one column at 560 px. Hover applies only under `@media (hover: hover) and (pointer: fine)` and scales the image to at most `1.04`.

- [ ] **Step 5: Remove the obsolete holographic components and run tests**

Run: `npm test -- src/components/hero.test.tsx src/components/pillar-gateways.test.tsx`

Expected: PASS and no import of `experience-card` or `year-round-experiences` remains.

- [ ] **Step 6: Commit the hero and gateways**

```bash
git add -A src/components/hero.tsx src/components/hero.module.css src/components/hero.test.tsx src/components/pillar-gateways.tsx src/components/pillar-gateways.module.css src/components/pillar-gateways.test.tsx src/components/experience-card.tsx src/components/year-round-experiences.tsx src/components/year-round-experiences.module.css src/components/year-round-experiences.test.tsx
git commit -m "feat: create Orea three-pillar entrance"
```

---

### Task 4: Dar a cada pilar un capítulo de idéntico peso

**Files:**
- Create: `src/components/pillar-chapters.tsx`
- Create: `src/components/pillar-chapters.module.css`
- Create: `src/components/pillar-chapters.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteContent.pillars`.
- Produces: `<PillarChapters />` containing article ids `granja`, `hipica`, `campamentos` in that order.

- [ ] **Step 1: Write a failing semantic equality test**

```tsx
it("gives every pillar one equivalent chapter and a useful next action", () => {
  render(<PillarChapters />);
  const articles = screen.getAllByRole("article");
  expect(articles).toHaveLength(3);
  expect(articles.map((article) => article.id)).toEqual(["granja", "hipica", "campamentos"]);
  expect(screen.getByRole("link", { name: /consultar la propuesta hípica/i })).toHaveAttribute("href", "#contacto");
  expect(screen.getByRole("link", { name: /calcular el campamento/i })).toHaveAttribute("href", "#temporada");
  expect(screen.getByText(/formato y disponibilidad a confirmar/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the new test and verify the missing module failure**

Run: `npm test -- src/components/pillar-chapters.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement three repeated chapter articles**

Each chapter must render the same DOM structure: image, eyebrow, H2, summary, detail and CTA. Use the pillar `href` only for gateways; chapter CTAs are:

```ts
const chapterActions = {
  granja: { href: "#contacto", label: "Preparar una visita" },
  hipica: { href: "#contacto", label: "Consultar la propuesta hípica" },
  campamentos: { href: "#temporada", label: "Calcular el campamento" },
} as const;
```

Alternate image/copy position by CSS `:nth-child(even)` without changing dimensions or heading level. Use chalk, straw and olive-tint backgrounds, with clay only on the camp action.

- [ ] **Step 4: Insert the new architecture in `page.tsx`**

The main sequence becomes:

```tsx
<Hero />
<PillarGateways />
<PillarChapters />
<TrustStrip />
<PhotoGallery />
<CareSection />
<Testimonials />
<CampCalculator />
<LocationMap />
<Faq />
<ConversionCta />
```

- [ ] **Step 5: Run component and page tests**

Run: `npm test -- src/components/pillar-chapters.test.tsx src/components/page-sections.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the equal chapter architecture**

```bash
git add src/components/pillar-chapters.tsx src/components/pillar-chapters.module.css src/components/pillar-chapters.test.tsx src/app/page.tsx
git commit -m "feat: give Orea pillars equal chapters"
```

---

### Task 5: Revestir galería, confianza y testimonios con el lenguaje rural

**Files:**
- Modify: `src/components/photo-gallery.tsx`
- Modify: `src/components/photo-gallery.module.css`
- Modify: `src/components/photo-gallery.test.tsx`
- Modify: `src/components/care-section.tsx`
- Modify: `src/components/care-section.module.css`
- Modify: `src/components/care-section.test.tsx`
- Modify: `src/components/page-sections.tsx`
- Modify: `src/components/page-sections.module.css`
- Modify: `src/components/page-sections.test.tsx`

**Interfaces:**
- Consumes: `siteContent.gallery`, `siteContent.care`, `siteContent.testimonials`.
- Produces: gallery disclosure linking to `#creditos-fotograficos`.

- [ ] **Step 1: Add failing public-disclosure and testimonial-integrity tests**

```tsx
it("identifies stock photography and links to public credits", () => {
  render(<PhotoGallery />);
  expect(screen.getByText(/fotografías editoriales de unsplash/i)).toBeVisible();
  expect(screen.getByRole("link", { name: /ver créditos fotográficos/i })).toHaveAttribute("href", "#creditos-fotograficos");
});

it("keeps the approved testimonial wording", () => {
  render(<Testimonials />);
  expect(screen.getByText(/atención médica a diez minutos/i)).toBeVisible();
  expect(screen.getByText(/una experiencia de diez/i)).toBeVisible();
  expect(screen.getByText(/la comida es casera/i)).toBeVisible();
});
```

- [ ] **Step 2: Run focused tests and verify the new assertions fail**

Run: `npm test -- src/components/photo-gallery.test.tsx src/components/page-sections.test.tsx`

Expected: FAIL because credits are not publicly linked and quotes are rewritten.

- [ ] **Step 3: Restyle without changing the section contracts**

Remove numeric figure prefixes, color gradients, oversized tech typography and prismatic shadows. Use a calm 2-column editorial gallery, one arched horse image, one wide farm/camp image and smaller supporting images. Keep every `<Image>` lazy and preserve its existing `sizes`.

Change the disclosure to:

```tsx
<p className={styles.disclaimer}>
  Fotografías editoriales de Unsplash utilizadas para representar el tipo de experiencia.
  <a href="#creditos-fotograficos">Ver créditos fotográficos</a>
</p>
```

Change the Care eyebrow to `Una finca que escucha antes de proponer`, heading to `Cada grupo necesita su propia forma de vivir Orea.` and section id to `visitas`.

- [ ] **Step 4: Restore approved quotes and remove decorative quote indexes**

Use the exact `c99a32a` testimonial strings restored in Task 1. Keep `<blockquote>` and the existing disclosure that they were shared directly with Orea. Remove `quoteIndex`; retain accessible figure/figcaption semantics.

- [ ] **Step 5: Run gallery, care and trust/testimonial tests**

Run: `npm test -- src/components/photo-gallery.test.tsx src/components/care-section.test.tsx src/components/page-sections.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit the supporting editorial sections**

```bash
git add src/components/photo-gallery.tsx src/components/photo-gallery.module.css src/components/photo-gallery.test.tsx src/components/care-section.tsx src/components/care-section.module.css src/components/care-section.test.tsx src/components/page-sections.tsx src/components/page-sections.module.css src/components/page-sections.test.tsx
git commit -m "feat: bring rural editorial language to Orea stories"
```

---

### Task 6: Rehacer conversión, mapa y footer semántico

**Files:**
- Modify: `src/components/camp-calculator.module.css`
- Modify: `src/components/location-map.tsx`
- Modify: `src/components/location-map.module.css`
- Modify: `src/components/location-map.test.tsx`
- Modify: `src/components/faq.tsx`
- Modify: `src/components/faq.module.css`
- Modify: `src/components/faq.test.tsx`
- Modify: `src/components/conversion-cta.tsx`
- Modify: `src/components/conversion-cta.module.css`
- Modify: `src/components/conversion-cta.test.tsx`
- Modify: `src/components/mobile-sticky-cta.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/site-footer.module.css`
- Create: `src/components/site-footer.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `siteContent.organization`, `siteContent.photoCredits`, `campSeason`.
- Produces: `<SiteFooter />` as the only `<footer>` / `contentinfo` landmark.

- [ ] **Step 1: Write failing footer and map-decor tests**

```tsx
it("publishes annual identity and every image credit in contentinfo", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("contentinfo")).toBeVisible();
  expect(screen.getByText("Granja · Hípica · Campamentos")).toBeVisible();
  expect(screen.getByText(`© ${new Date().getFullYear()} Servicios Integrales Ciudad Real S.L.`)).toBeVisible();
  expect(screen.getAllByRole("link", { name: /ver foto de/i })).toHaveLength(7);
});

it("keeps Google Maps direct without technological coordinates", () => {
  render(<LocationMap />);
  expect(screen.getByTitle(/mapa de granja escuela orea/i)).toBeVisible();
  expect(screen.queryByText(/38\.98°/)).toBeNull();
});
```

- [ ] **Step 2: Run footer, location and conversion tests to verify red**

Run: `npm test -- src/components/site-footer.test.tsx src/components/location-map.test.tsx src/components/conversion-cta.test.tsx`

Expected: FAIL because `SiteFooter` does not exist and map coordinates still render.

- [ ] **Step 3: Extract the footer from `ConversionCta`**

`ConversionCta` returns only its closing `<section>` plus `MobileStickyCta`. `SiteFooter` renders:

```tsx
<footer className={styles.footer} data-site-footer>
  <div className={styles.brand}><span>OREA</span><strong>Granja · Hípica · Campamentos</strong></div>
  <address>...</address>
  <nav aria-label="Redes sociales">...</nav>
  <details id="creditos-fotograficos">
    <summary>Créditos fotográficos</summary>
    <ul>{siteContent.photoCredits.map((credit) => <li key={credit.file}>{credit.file} · <a aria-label={`Ver foto de ${credit.author} en Unsplash`} href={credit.sourceUrl}>{credit.author}</a></li>)}</ul>
  </details>
  <div className={styles.legal}>© {new Date().getFullYear()} {organization.legalName} ...</div>
</footer>
```

Render `<SiteFooter />` after `</main>` in `page.tsx`.

- [ ] **Step 4: Restyle conversion surfaces with approved tokens**

Calculator: chalk section, straw form surface, forest selected session, clay price and olive radio state. Do not change `camp-calculator.tsx` logic or field names.

Map: remove `.mapLabel` coordinates, rotation and dark tech frame; use a straw mat with a forest border and an arched top-left corner. Preserve iframe attributes.

FAQ: remove huge orange typographic fragment and numeric indexes; use a simple two-column desktop layout and full-width native details on mobile.

Closing CTA: heading `¿Granja, hípica o campamento? Cuéntanos qué estás buscando.`, chalk/forest split, matte clay WhatsApp action.

- [ ] **Step 5: Run conversion-focused tests**

Run: `npm test -- src/components/camp-calculator.test.tsx src/components/location-map.test.tsx src/components/faq.test.tsx src/components/conversion-cta.test.tsx src/components/site-footer.test.tsx`

Expected: PASS with calculator privacy unchanged.

- [ ] **Step 6: Commit the conversion and footer extraction**

```bash
git add src/components/camp-calculator.module.css src/components/location-map.tsx src/components/location-map.module.css src/components/location-map.test.tsx src/components/faq.tsx src/components/faq.module.css src/components/faq.test.tsx src/components/conversion-cta.tsx src/components/conversion-cta.module.css src/components/conversion-cta.test.tsx src/components/mobile-sticky-cta.tsx src/components/site-footer.tsx src/components/site-footer.module.css src/components/site-footer.test.tsx src/app/page.tsx
git commit -m "feat: unify Orea conversion in rural visual system"
```

---

### Task 7: Alinear SEO, Open Graph, icono y canonical real

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/app/opengraph-image.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: `siteContent.organization.url = "https://granjaorea.vercel.app"` until DNS cutover.
- Produces: canonical `https://granjaorea.vercel.app/` consistently in metadata, JSON-LD, robots and sitemap.

- [ ] **Step 1: Write failing three-pillar SEO tests**

```ts
it("describes all three pillars on the URL that serves this page", () => {
  const metadata = buildMetadata();
  expect(metadata.alternates?.canonical).toBe("https://granjaorea.vercel.app/");
  expect(String(metadata.title)).toBe(
    "Granja escuela, hípica y campamentos en Ciudad Real | Orea",
  );
  expect(metadata.description).toMatch(/granja.*hípica.*campamentos/i);
  expect(metadata.keywords).toContain("hípica Ciudad Real");
});

it("uses the annual Orea icon as organization logo", () => {
  const data = buildOrganizationJsonLd();
  expect(data.name).toBe("Granja Escuela Orea");
  expect(data.logo).toBe("https://granjaorea.vercel.app/icon.svg");
});
```

- [ ] **Step 2: Run SEO tests and verify the old canonical/title failure**

Run: `npm test -- src/lib/seo.test.ts`

Expected: FAIL with the old campamentos domain and missing hípica.

- [ ] **Step 3: Update metadata and JSON-LD copy**

Use title `Granja escuela, hípica y campamentos en Ciudad Real | Orea`, description `Granja escuela, experiencias hípicas y campamentos en Ciudad Real para familias, colegios y grupos. Naturaleza y convivencia durante todo el año.` and add keywords `hípica Ciudad Real`, `caballos para niños Ciudad Real` and `campamentos Ciudad Real`.

Set `siteContent.organization.url` to `https://granjaorea.vercel.app`. Because robots and sitemap already consume central content, do not hardcode a second URL.

- [ ] **Step 4: Redesign the Open Graph image**

Use chalk background, forest title, olive `OREA` wordmark, matte clay line and the text `Granja escuela · Hípica · Campamentos`. Remove electric gradients and annual camp-only framing.

- [ ] **Step 5: Update operating documentation**

README must state that `granjaorea.vercel.app` is canonical until `campamentos.granjaorea.com` is attached to Vercel and DNS is cut over. Document `npm run audit:lighthouse` and the public photo credits location.

- [ ] **Step 6: Run SEO tests, build metadata routes and commit**

Run: `npm test -- src/lib/seo.test.ts && npm run build`

Expected: tests PASS; `/`, `/icon.svg`, `/opengraph-image`, `/robots.txt` and `/sitemap.xml` are generated successfully.

```bash
git add src/content/site-content.ts src/lib/seo.ts src/lib/seo.test.ts src/app/opengraph-image.tsx src/app/robots.ts src/app/sitemap.ts README.md
git commit -m "feat: align Orea SEO with three-pillar identity"
```

---

### Task 8: Codificar breakpoints exactos y el presupuesto Lighthouse

**Files:**
- Modify: `playwright.config.ts`
- Modify: `e2e/home.spec.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `scripts/assert-lighthouse.mjs`

**Interfaces:**
- Produces: Playwright projects `mobile-390`, `tablet-768`, `desktop-1440`.
- Produces: `npm run audit:lighthouse -- <url>` with thresholds 0.90 / 0.95 / 0.95 / 0.95.

- [ ] **Step 1: Replace the E2E content contract with failing assertions**

Add assertions that the rendered page has H1 `Granja, caballos y aventura. Todo el año.`, exactly three `article[data-pillar]`, visible headings Granja escuela/Hípica/Campamentos, no `38.98°`, no `time[datetime="08:30"]`, no horizontal overflow and a public `#creditos-fotograficos` disclosure.

- [ ] **Step 2: Define exact Playwright viewports**

```ts
projects: [
  { name: "mobile-390", use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } } },
  { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
  { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
],
workers: 1,
```

Run: `npm run test:e2e`

Expected: all tests pass across the three named projects.

- [ ] **Step 3: Install Lighthouse and add the audit script**

Run: `npm install --save-dev lighthouse`

Add:

```json
"audit:lighthouse": "node scripts/assert-lighthouse.mjs"
```

The script accepts `process.argv[2]`, launches `npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=.artifacts/lighthouse.json --chrome-flags=--headless`, reads the report and exits 1 unless scores meet `{ performance: 0.9, accessibility: 0.95, "best-practices": 0.95, seo: 0.95 }`.

- [ ] **Step 4: Run the full local quality matrix**

Run sequentially:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
git diff --check
```

Expected: zero warnings from lint, zero type errors, all Vitest and Playwright tests passing, static build complete, no whitespace errors.

- [ ] **Step 5: Commit the production gates**

```bash
git add playwright.config.ts e2e/home.spec.ts package.json package-lock.json scripts/assert-lighthouse.mjs
git commit -m "test: enforce Orea responsive and performance gates"
```

---

### Task 9: Visual review, code review, GitHub backup and Vercel production

**Files:**
- Modify only files required by verified review findings.

**Interfaces:**
- Consumes: all components and gates from Tasks 1–8.
- Produces: pushed commit on `feat/orea-redesign`, a Ready Vercel Preview and a Ready Production deployment.

- [ ] **Step 1: Start the production build locally and inspect real browser screenshots**

Run:

```bash
npm run build
npm run start -- -p 4173
```

Inspect 390 × 844, 768 × 1024 and 1440 × 900. Verify hero crop, three-portón equality, horse visibility, calculator, menu, map, credits and footer. Fix only observed issues and rerun their focused tests.

- [ ] **Step 2: Request a read-only final code review**

Reviewer must compare the implementation against `docs/superpowers/specs/2026-08-28-orea-finca-contemporanea-design.md`, inspect content truth, SEO, privacy, image credits, accessibility and performance, and report Critical/Important/Minor findings with file:line references.

Fix all Critical and Important issues, then rerun the full quality matrix from Task 8.

- [ ] **Step 3: Push the reviewed branch to GitHub**

```bash
git push origin feat/orea-redesign
git status --short
git ls-remote origin refs/heads/feat/orea-redesign
```

Expected: clean status and remote SHA equal to local `git rev-parse HEAD`.

- [ ] **Step 4: Deploy and inspect a Vercel Preview**

```bash
vercel --yes
vercel inspect <preview-url> --wait
```

Expected: Preview status `Ready`. Use the exact URL printed by the deploy command in the inspect command.

- [ ] **Step 5: Run production-like smoke and Lighthouse against Preview**

```bash
vercel curl / --deployment <preview-url>
npm run audit:lighthouse -- <preview-url>
```

Expected: response contains the new title and all four Lighthouse category thresholds pass. If deployment protection blocks Chrome, run Lighthouse against the production alias immediately after Step 6 and roll back if the gate fails.

- [ ] **Step 6: Promote the verified artifact**

```bash
vercel promote <preview-url> --yes
vercel inspect https://granjaorea.vercel.app --wait
```

Expected: target `production`, status `Ready`, alias `https://granjaorea.vercel.app`.

- [ ] **Step 7: Verify the live release and error scan**

```bash
curl.exe -sS -o NUL -w "HTTP %{http_code}\n" "https://granjaorea.vercel.app/?release=<short-sha>"
vercel logs https://granjaorea.vercel.app --level error --since 1h
```

Expected: HTTP 200 and no production error logs. Complete a final mobile/desktop browser smoke on the cache-busted URL.
