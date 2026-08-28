# Granja Escuela Orea

Web anual de Granja Escuela Orea: visitas familiares, colegios y grupos, celebraciones y campamento de verano. Está construida con Next.js 16, React 19 y TypeScript, se publica en Vercel y mantiene su copia de seguridad en GitHub.

La campaña de verano usa únicamente los datos confirmados para 2027: primera quincena, del 1 al 15 de julio, por 690 €; segunda quincena, del 16 al 30 de julio, por 630 €. Los importes son por participante y la disponibilidad se confirma personalmente por WhatsApp.

La calculadora solicita nombre del responsable, teléfono y edad del niño o niña. El mensaje se genera íntegramente en el navegador: la web no guarda ni envía esos datos a un servidor. El mapa visible es un iframe de Google Maps y queda sujeto a la política de privacidad de Google.

## Desarrollo local

Requisitos: Node.js 24 y npm 11.

```bash
npm ci
npm run dev
```

Comandos de calidad:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright necesita Chromium la primera vez:

```bash
npx playwright install chromium
```

## Contenido y temporada

Los datos confirmados de campaña viven en `src/content/camp-config.ts`; el contenido editorial anual está en `src/content/site-content.ts`.

Antes de publicar cambios hay que revisar:

- año, estado, turnos y precios en `campSeason`;
- teléfono, email, dirección y redes en `organization`;
- experiencias, principios de cuidado, testimonios y preguntas frecuentes;
- que ninguna actividad variable se presente como una rutina garantizada;
- que disponibilidad, condiciones médicas y transporte se confirmen con Orea.

No se debe añadir JSON-LD de tipo `Offer` o `Event` sin disponibilidad y condiciones verificadas.

## Fotografía editorial y licencias

Las imágenes de alta resolución incluidas en `public/images/orea/stock-*.jpg` proceden de Unsplash y se usan como representación editorial del tipo de experiencia, no como fotografías de las instalaciones de Orea. La página lo indica junto a la galería.

Créditos y páginas de origen:

- `stock-trail.jpg`: [Annie Spratt](https://unsplash.com/photos/girl-and-boy-walking-on-forest-trail-GIK1tsETnXI).
- `stock-hero.jpg`: [Daria Trofimova](https://unsplash.com/photos/a-group-of-children-walking-through-a-forest-u2jcCo5KJIA).
- `stock-farm.jpg`: [Imdad Jayd](https://unsplash.com/photos/a-young-child-holds-a-spotted-baby-goat-on-grass-40i2WzrJBo0).
- `stock-adventure.jpg`: [Aarón Blanco Tejedor](https://unsplash.com/photos/child-climbing-over-rocks-in-nature-DmXTuoL17Ao).
- `stock-celebration.jpg`: [nugh hade](https://unsplash.com/photos/children-playing-a-balloon-race-outdoors-with-adults-watching-uNIzjTX6T4U).
- `stock-horse.jpg`: [Josh Withers](https://unsplash.com/photos/a-young-child-riding-a-horse-in-front-of-a-barn-egbrBASop94).
- `stock-group.jpg`: [setengah limasore](https://unsplash.com/photos/children-are-gathered-together-outside-possibly-playing-TZFZwWqwVRM).

Todas se descargaron desde páginas que las identifican como gratuitas bajo la [licencia de Unsplash](https://unsplash.com/license). Si se sustituye una imagen, se debe actualizar su ruta, texto alternativo y crédito, y revisar los recortes a 390, 768 y 1440 px.

## SEO, accesibilidad y rendimiento

- Metadatos, canonical y Open Graph: `src/lib/seo.ts`.
- Datos estructurados Organization, WebSite y FAQPage: `src/components/page-sections.tsx`.
- `robots.txt`, `sitemap.xml`, icono y Open Graph se generan desde App Router.
- Canonical de producción: `https://campamentos.granjaorea.com/`.
- El menú, FAQ, calculadora, mapa, flujo sin JavaScript y preferencias de movimiento reducido tienen cobertura automatizada.
- Las fotografías se sirven localmente y Next.js genera tamaños optimizados; no dependen de un CDN fotográfico de terceros durante la visita.

## GitHub y Vercel

El trabajo se desarrolla en `feat/orea-redesign` y se publica en el repositorio `Andreh33/granjaorea`. Antes de integrar cambios en `main` se ejecutan lint, tipado, pruebas de componentes, build y pruebas end-to-end.

El proyecto está enlazado con Vercel. Una publicación manual de producción se realiza con:

```bash
vercel --prod
```

Antes de producción hay que comprobar la URL Preview, el dominio, los textos legales, las fechas y precios, y el flujo completo de WhatsApp. La calculadora es un asistente para preparar una consulta: no crea una reserva ni almacena datos personales.
