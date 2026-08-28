# Orea Todo el Año Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la landing de Orea como experiencia anual moderna, conservar la conversión del campamento de verano y publicar el resultado verificado en GitHub y Vercel.

**Architecture:** Mantener una única ruta estática App Router compuesta por Server Components, aislando solo las interacciones de puntero y la calculadora en Client Components. El contenido verificable vive en `site-content.ts`; las fotografías oficiales se copian a `public/images/orea`; el mapa es un iframe de Google cargado de forma diferida pero incluido en el HTML inicial.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 6, CSS Modules, Vitest/Testing Library, Playwright y Vercel.

**Spec:** `docs/superpowers/specs/2026-08-28-orea-all-year-refresh-design.md`

## Global Constraints

- No añadir librerías pesadas de animación ni trackers.
- Usar únicamente fotografías oficiales de Orea guardadas localmente y servidas con `next/image`.
- Mantener los precios de verano 2027 en una única fuente: 690 € primera quincena y 630 € segunda quincena.
- Nunca introducir los datos personales de la calculadora en la URL de la página.
- Conservar `prefers-reduced-motion`, HTML semántico, foco visible y contraste AA.
- Google Maps debe estar en el HTML inicial con `loading="lazy"` y `referrerPolicy="no-referrer"`.

---

### Task 1: Contratos de contenido y mapa

**Files:**
- Modify: `src/content/site-content.test.ts`
- Modify: `src/components/location-map.test.tsx`
- Modify: `src/components/site-header.test.tsx`
- Modify: `e2e/home.spec.ts`

**Interfaces:**
- Consumes: `siteContent`, `LocationMap`, `SiteHeader`.
- Produces: contratos comprobables para `experiences`, mapa inmediato y wordmark sin SVG.

- [ ] **Step 1: Escribir pruebas fallidas** que exijan cuatro experiencias anuales, el texto «Todo el año», un iframe inmediato y ausencia del isotipo.
- [ ] **Step 2: Ejecutar las pruebas dirigidas** con `npm test -- src/content/site-content.test.ts src/components/location-map.test.tsx src/components/site-header.test.tsx` y confirmar que fallan por los contratos antiguos.
- [ ] **Step 3: Actualizar el E2E** para buscar las nuevas secciones, Google Maps sin clic y la misma protección de PII.
- [ ] **Step 4: Guardar el punto de contrato** antes de la implementación.

### Task 2: Contenido anual, estructura y SEO

**Files:**
- Modify: `src/content/site-content.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `src/lib/seo.test.ts`
- Modify: `src/components/page-sections.tsx`
- Modify: `src/components/page-sections.module.css`
- Delete: `src/components/day-timeline.tsx`
- Delete: `src/components/day-timeline-story.tsx`
- Delete: `src/components/day-timeline.module.css`
- Delete: `src/components/day-timeline.test.tsx`
- Delete: `src/components/activities-grid.tsx`
- Delete: `src/components/activity-tilt.tsx`
- Delete: `src/components/activities-grid.module.css`
- Delete: `src/components/activities-grid.test.tsx`

**Interfaces:**
- Produces: `Experience`, `GalleryImage`, `siteContent.experiences` y `siteContent.gallery` para los componentes visuales.

- [ ] **Step 1: Reemplazar tipos y textos de verano globales** por contenido anual verificado y FAQ clara.
- [ ] **Step 2: Actualizar metadatos** a «Granja escuela y campamentos en Ciudad Real | Orea» y ampliar palabras clave sin keyword stuffing.
- [ ] **Step 3: Sustituir la composición de `page.tsx`** y retirar por completo rutina y actividades rígidas.
- [ ] **Step 4: Ejecutar pruebas de contenido y SEO** hasta obtener verde.

### Task 3: Fotografía oficial y hero full-bleed

**Files:**
- Create: `public/images/orea/orea-alojamiento.jpg`
- Create: `public/images/orea/orea-celebraciones.jpg`
- Create: `public/images/orea/orea-colegios.jpg`
- Create: `public/images/orea/orea-social.jpg`
- Modify: `src/components/hero.tsx`
- Modify: `src/components/hero.module.css`
- Modify: `src/components/hero-entrance.tsx`
- Modify: `src/components/hero-entrance.module.css`

**Interfaces:**
- Consumes: `siteContent.hero` y fotografías locales.
- Produces: H1 anual, CTAs y fondo fotográfico prioritario sin CLS.

- [ ] **Step 1: Descargar las fotografías desde dominios oficiales de Orea** y verificar visualmente contenido, orientación y resolución.
- [ ] **Step 2: Construir el hero full-bleed** con `Image fill`, `priority`, `sizes="100vw"`, overlays y capas decorativas no semánticas.
- [ ] **Step 3: Añadir microinteracciones** con CSS transform/opacity y mantener el fallback de movimiento reducido.
- [ ] **Step 4: Ejecutar la prueba del hero** y comprobar que el H1 y CTAs permanecen accesibles.

### Task 4: Experiencias y galería editorial

**Files:**
- Create: `src/components/year-round-experiences.tsx`
- Create: `src/components/year-round-experiences.module.css`
- Create: `src/components/experience-card.tsx`
- Create: `src/components/photo-gallery.tsx`
- Create: `src/components/photo-gallery.module.css`
- Create: `src/components/year-round-experiences.test.tsx`
- Create: `src/components/photo-gallery.test.tsx`

**Interfaces:**
- Consumes: `siteContent.experiences`, `siteContent.gallery`.
- Produces: secciones `#experiencias` y `#instalaciones`.

- [ ] **Step 1: Escribir pruebas fallidas** para títulos, CTAs, imágenes y textos alternativos.
- [ ] **Step 2: Implementar cards rellenas** con borde prismático, patrón, imagen, índice y CTA contextual.
- [ ] **Step 3: Implementar galería asimétrica** con imágenes optimizadas y pies editoriales.
- [ ] **Step 4: Ejecutar las pruebas dirigidas** y corregir semántica/consultas hasta que pasen.

### Task 5: Cabecera, cuidado, FAQ y conversión

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-header.module.css`
- Modify: `src/components/header-mobile-menu.tsx`
- Modify: `src/components/care-section.tsx`
- Modify: `src/components/care-section.module.css`
- Modify: `src/components/faq.tsx`
- Modify: `src/components/faq.module.css`
- Modify: `src/components/conversion-cta.tsx`
- Modify: `src/components/conversion-cta.module.css`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: navegación, cuidado y FAQ desde `siteContent`.
- Produces: navegación anual, wordmark tipográfico, cards de confianza y CTA final coherente.

- [ ] **Step 1: Sustituir el SVG por el wordmark tipográfico OREA** y actualizar enlaces de escritorio/móvil.
- [ ] **Step 2: Generalizar cuidado y FAQ** eliminando la pregunta confusa sobre echar de menos casa.
- [ ] **Step 3: Añadir fondos, sombras, grano y tokens globales** sin romper foco, contraste ni reduced motion.
- [ ] **Step 4: Ejecutar las pruebas de componentes afectadas** y corregir regresiones.

### Task 6: Google Maps directo y calculadora de verano

**Files:**
- Modify: `src/components/location-map.tsx`
- Modify: `src/components/location-map.module.css`
- Modify: `src/components/camp-calculator.tsx`
- Modify: `src/components/camp-calculator.module.css`
- Modify: `src/components/location-map.test.tsx`
- Modify: `src/components/camp-calculator.test.tsx`

**Interfaces:**
- Consumes: `oreaLocation`, `campSeason`, generador de WhatsApp existente.
- Produces: iframe inmediato y calculadora claramente etiquetada como verano 2027.

- [ ] **Step 1: Convertir `LocationMap` en Server Component** y renderizar directamente el iframe lazy.
- [ ] **Step 2: Mantener enlace externo de indicaciones** y adaptar el layout del mapa al nuevo lenguaje visual.
- [ ] **Step 3: Integrar la calculadora en una superficie visual destacada** sin cambiar validación, precios ni privacidad.
- [ ] **Step 4: Ejecutar pruebas de mapa, calculadora y WhatsApp** hasta obtener verde.

### Task 7: Verificación visual y funcional

**Files:**
- Modify: `e2e/home.spec.ts`
- Modify: estilos o componentes que fallen durante la auditoría.

**Interfaces:**
- Consumes: página completa compilada.
- Produces: experiencia estable a 390, 768 y 1440 px.

- [ ] **Step 1: Ejecutar `npm run lint`, `npm run typecheck`, `npm test` y `npm run build`** y corregir cualquier fallo desde su causa.
- [ ] **Step 2: Ejecutar Playwright con un solo worker** para validar navegación, FAQ, mapa, calculadora, privacidad, consola y solicitudes.
- [ ] **Step 3: Capturar y revisar visualmente** desktop, tablet y móvil; comprobar scroll horizontal, solapes, legibilidad y encuadres.
- [ ] **Step 4: Ejecutar una auditoría final** de accesibilidad y rendimiento sobre el build local.

### Task 8: Revisión, GitHub y Vercel

**Files:**
- Modify: `README.md`
- Delete: `.firecrawl/search-orea-imagenes.json`

**Interfaces:**
- Consumes: build final verificado.
- Produces: commit reproducible y despliegue público.

- [ ] **Step 1: Solicitar revisión de código** y resolver hallazgos críticos o importantes.
- [ ] **Step 2: Documentar estructura, contenido anual y flujo de despliegue** sin incluir credenciales.
- [ ] **Step 3: Limpiar artefactos de investigación**, revisar `git diff` y crear el commit final.
- [ ] **Step 4: Subir la rama y `main` a GitHub**, confirmar el deployment de Vercel y verificar en producción H1, mapa, WhatsApp y estado HTTP 200.
