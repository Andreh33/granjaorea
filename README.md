# Orea Camp 2027

Rediseño completo de la web de campamentos de Orea. Está construido con Next.js 16, React 19 y TypeScript, genera una página estática optimizada y está publicado en Vercel desde el repositorio de GitHub.

La campaña utiliza únicamente información comprobable. Los turnos y precios facilitados por Orea para 2027 son del 1 al 15 de julio por 690 € y del 16 al 30 de julio por 630 €, ambos por participante. La web no afirma que queden plazas: la disponibilidad y las condiciones se confirman personalmente por WhatsApp.

La calculadora pide solo el nombre del responsable, un teléfono de contacto y la edad del niño o niña. Genera el mensaje en el navegador y abre WhatsApp; no almacena ni envía esos datos a un servidor. El mapa de Google también permanece desactivado hasta que la persona pulsa “Cargar mapa interactivo”.

## Desarrollo local

Requisitos: Node.js 24 y npm 11.

```bash
npm ci
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`. Comandos de calidad:

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

## Dónde se actualiza la temporada

Los datos confirmados de campaña viven en `src/content/camp-config.ts`; el resto del contenido editorial está en `src/content/site-content.ts`. Antes de editar la interfaz, actualiza:

- `campSeason.year`, estado, mensaje y descripción en `camp-config.ts`;
- `campSeason.sessions`, que contiene los turnos y precios confirmados; la disponibilidad se consulta por separado;
- teléfono, email, dirección y redes en `organization`;
- horario, actividades, cuidados, testimonios y FAQ.

No publiques una sesión, precio, plaza disponible, oferta o dato médico sin validación de Orea. Si cambia el modelo `Season`, actualiza también sus pruebas y evita añadir JSON-LD de tipo `Offer` o `Event` hasta disponer de disponibilidad y condiciones verificadas.

## Imágenes y propiedad

Las fotografías de `public/images/orea/` proceden de la web existente de Orea y se reutilizan para este rediseño. Antes del despliegue de producción, la propiedad o licencia de publicación debe quedar confirmada por Orea. Los textos alternativos están en `site-content.ts` o junto al componente que usa la imagen.

Para sustituir una fotografía se puede conservar el nombre de archivo o actualizar su ruta en el contenido. Después hay que revisar el recorte en 390, 768 y 1440 px y ejecutar las pruebas end-to-end para detectar recursos rotos.

## SEO y accesibilidad

- Metadatos, canonical y Open Graph: `src/lib/seo.ts`.
- Datos estructurados Organization, WebSite y FAQPage: `src/components/page-sections.tsx`.
- `robots.txt`, `sitemap.xml`, icono y Open Graph se generan desde App Router.
- Canonical de producción: `https://campamentos.granjaorea.com/`.
- El menú, FAQ, preferencias de movimiento reducido y flujo sin JavaScript tienen cobertura automatizada.

Auditoría móvil local del 28-08-2026: Lighthouse 95 Performance, 100 Accessibility, 100 Best Practices y 100 SEO; 264 KiB transferidos, TBT 110 ms y CLS 0. El LCP local medido fue 2,8 s y debe volver a medirse en la URL Preview/Production de Vercel —el objetivo de producción es inferior a 2,5 s— porque las ejecuciones locales mostraron variación por carga del equipo.

## Copia de seguridad en GitHub

El trabajo está organizado en commits sobre la rama `feat/orea-redesign`. Cuando exista el repositorio remoto:

```bash
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin feat/orea-redesign
```

Antes de integrar cambios en `main`, ejecuta instalación limpia, lint, tipado, pruebas de componentes, build y pruebas de navegador. El workflow automático de GitHub Actions se puede añadir cuando la sesión de GitHub disponga del permiso `workflow`.

## Publicación en Vercel

Instala primero la CLI exacta solicitada para operar el proyecto:

```bash
npm i -g vercel
vercel login
vercel link
vercel
```

El último comando crea una Preview. Revisa esa URL en móvil y escritorio, verifica el dominio y solo entonces promueve a producción:

```bash
vercel --prod
```

Puertas obligatorias antes de Producción:

- repositorio de GitHub conectado y pruebas de calidad verdes;
- proyecto de Vercel enlazado al repositorio;
- precios y fechas 2027 revisados; condiciones y disponibilidad confirmadas antes de aceptar reservas;
- textos legales y consentimiento revisados por Orea;
- propiedad de fotografías confirmada;
- dominio `campamentos.granjaorea.com` asociado y DNS validado;
- analítica/cookies configuradas únicamente si existe consentimiento válido.

## Calculadora y datos personales

La calculadora es un asistente local para preparar una consulta, no un formulario de reserva. No hay base de datos, endpoint ni envío silencioso: la familia revisa el mensaje antes de enviarlo desde WhatsApp. Si Orea quiere almacenar solicitudes en el futuro, habrá que añadir consentimiento explícito, política de conservación, validación de servidor y protección antiabuso antes de activar esa captación.
