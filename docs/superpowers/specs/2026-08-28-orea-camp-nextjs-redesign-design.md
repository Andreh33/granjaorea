# Orea Camp Next.js Redesign — Design Specification

**Date:** 2026-08-28  
**Status:** Approved direction, pending written-spec review  
**Project:** Rebuild `campamentos.granjaorea.com` as a premium Next.js experience

## 1. Product intent

Orea Camp needs a conversion-focused website for Spanish families evaluating a first or repeat residential summer camp for children aged 6–16. The primary audience is a parent or guardian in Madrid, Ciudad Real, or surrounding provinces who needs to answer four questions quickly: whether their child will be safe, what the experience is really like, what it costs, and how to ask for availability.

The page's single job is to turn uncertainty into a qualified availability conversation. Until the real lead-delivery integration is provisioned in Vercel, every conversion action will use the existing real WhatsApp and telephone channels. The site will not ship a simulated form or silently discard submissions.

The project is a rebuild, not a visual port. It preserves the Orea patch logo, real photography, 35+ years of history, activity programme, location, and practical camp facts while replacing the legacy Bootstrap/jQuery implementation and correcting its mobile, accessibility, performance, SEO, and content weaknesses.

## 2. Release state and content truth

The existing July 2026 campaign has ended. The first build will use an explicit pre-launch state:

- Season label: `Temporada 2027`.
- Availability message: `Fechas y plazas próximamente`.
- Primary action: `Avísame por WhatsApp` using the existing Orea number.
- No 2027 date, price, availability, discount, transport price, or deadline may be invented.
- Confirmed historical facts may be used without presenting them as future offers: ages 6–16, Ciudad Real location, 35+ years, owned facilities, multi-adventure, horse riding, animals, pools, accommodation, and the structure of a typical day.

Before production, the owner must replace the pre-launch state with confirmed seasonal data through one typed content file. Production is also gated on validated legal entity details and final legal copy.

## 3. Chosen design approach

### Recommended: “La ruta de un verano Orea”

The site behaves like a guided route through a day and a stay at Orea. A topographic line inspired by La Atalaya is the continuous visual signature: it begins in the hero as a quiet contour, travels through section boundaries, becomes the path of the day timeline, and resolves into the final availability call to action.

This direction is preferred over two rejected alternatives:

1. **Adventure magazine:** strong photography and editorial typography, but too close to common outdoor tourism sites and less useful for explaining safety and daily structure.
2. **Playful children’s camp:** brighter illustrations and game-like interactions, but aimed too much at children when the decision-maker is a parent looking for trust and clarity.

The selected route concept is specific to Orea’s forest setting, works with its patch-like logo, and gives motion a narrative purpose rather than adding unrelated effects.

## 4. Visual system

### Palette

- `Bosque profundo` — `#102C27`: primary dark surface and navigation.
- `Pino Orea` — `#355D4C`: brand green for headings and route elements.
- `Musgo claro` — `#A8B58B`: secondary natural tone from the logo.
- `Naranja fogata` — `#F07B36`: controlled conversion and motion accent.
- `Arena de sendero` — `#F3E9D4`: warm content surface, used sparingly.
- `Cielo lavado` — `#DCE9E6`: quiet informational background.
- `Tinta` — `#16201E`: body copy with AA/AAA contrast where feasible.

The background will not default to a generic cream-and-terracotta template. Full white, forest green, cool mist, and photographic surfaces carry most of the page; sand is limited to practical-information cards.

### Typography

- Display: `Anybody` variable, used for large, slightly irregular route-marker headings and hero statements.
- Body: `Instrument Sans`, selected for clarity at small sizes and a calmer adult register.
- Utility/data: `IBM Plex Mono`, used only for dates, times, coordinates, capacity, and small route labels.

All fonts load through `next/font`; no external font request remains at runtime.

### Shape and spacing

- The Orea circular patch informs route markers and image crops, but most cards remain rectangular with restrained 12–20 px radii.
- Section rhythm alternates immersive photographic moments with highly legible practical surfaces.
- Desktop uses a 12-column grid with a 1240 px content cap. Mobile uses a single reading column with 20 px gutters.
- Body text never falls below 16 px. Interactive targets are at least 44×44 px.

## 5. Page narrative and components

### 5.1 Header

- Transparent over the hero, transitioning to a compact opaque forest bar after the first section.
- Logo, `El campamento`, `Un día en Orea`, `Seguridad`, `Preguntas`, and the primary availability action.
- Mobile opens an accessible full-screen route menu with focus trapping, Escape support, scroll locking, and visible contact options.
- Active section is reflected visually without constantly animating the navigation.

### 5.2 Hero: the thesis

- Full-viewport real Orea photograph with art-directed desktop and mobile crops.
- One visible `h1`: `El verano en el que empiezan a volver distintos`.
- Supporting facts: `6–16 años`, `Ciudad Real`, `35+ años acompañando veranos`.
- Pre-launch season card and real WhatsApp CTA.
- Initial sequence: image settles from a restrained 1.04 scale, the patch locks into place, headline lines reveal, and the topographic route draws once.
- The hero is fully readable before JavaScript and under `prefers-reduced-motion`.

### 5.3 Trust strip

- Four concise facts: 24-hour residential programme, qualified team, insurance/protocols, activities within owned facilities.
- Each fact has a custom line icon. No generic icon-library collage.
- Values appear immediately; count-up animation is not used for claims that do not benefit from it.

### 5.4 “Un día en Orea” sticky story

- Desktop: a sticky circular daylight dial on the left changes from morning to night while schedule blocks progress on the right.
- Mobile: a linear timeline with a small sticky time marker; no pinned horizontal scrolling.
- The animated route line connects each real schedule milestone.
- Changes use opacity, color temperature, and modest translation; scroll remains native and reversible.
- Timeline information is accessible as a normal ordered list without motion.

### 5.5 Activities and facilities

- A responsive editorial mosaic using real camp photographs.
- Activity cards reveal short factual captions on hover, keyboard focus, or tap: animals, riding, aerial park, climbing, pools, workshops, English, and evening activities.
- Desktop cards receive a maximum 3° pointer-responsive tilt; touch devices receive a simple press state.
- One wide “80+ species” photographic moment is allowed; no repeated statistic-card pattern.

### 5.6 Safety and care

- High-clarity section for the parent decision: age groups, coordination, activity protocols, insurance, healthcare contact process, food/allergies, communication, and accommodation.
- A layered “what happens if…” interaction expands practical scenarios without hiding essential information.
- Facts not confirmed by source material are omitted.

### 5.7 Season and offer

- During pre-launch, a single transparent season panel explains that 2027 dates and prices are being prepared and routes to WhatsApp.
- Once data is confirmed, both quincenas appear simultaneously; never inside a carousel.
- Each offer shows dates, ages, total price, deposit, inclusions, availability status, cancellation summary, and optional extras from typed data.
- Availability language must come from the same season data object used by metadata and structured data.

### 5.8 Family voices

- Testimonials are presented only if the owner confirms permission and exact wording.
- Anonymous initials remain possible, but generic avatar illustrations are removed.
- A source label or contextual detail accompanies every published quote.
- In the initial build, this section can use the current approved quotations but must not imply an external review platform.

### 5.9 FAQ

- Native accessible accordion behavior with buttons, `aria-expanded`, controlled panels, keyboard support, and no fixed-width tables.
- Answers remain present in server-rendered HTML.
- FAQ structured data mirrors only visible questions and answers.

### 5.10 Conversion ending

- A cinematic wide photo transitions into a quiet final decision panel.
- Primary action: WhatsApp availability conversation.
- Secondary actions: call and download the current dossier only when its season matches the page.
- A small sticky mobile CTA appears after the hero and hides before the footer. It must never cover content or controls.
- Once Vercel is connected, Resend is provisioned through Vercel Marketplace before adding the lead form. The form will then use a Server Action, real delivery, server validation, spam protection, success/error states, and minimal personal-data collection.

### 5.11 Footer and legal routes

- Address, real phone, email, social links, and legal links.
- Legacy legal URLs receive permanent redirects to the new routes.
- Legal pages remain server-rendered and indexable but are excluded from campaign navigation.
- Production remains blocked until the responsible legal entity, tax identifier, address, contact details, privacy bases, retention periods, recipients, rights, and cookie inventory are validated.

## 6. Motion language

Motion must communicate progress, orientation, or cause and effect. The page has one orchestrated signature—the route line and day progression—supported by restrained microinteractions.

Approved motion:

- One hero entrance sequence.
- Scroll-linked route drawing and daylight progression.
- Section reveals using clipping and 12–24 px movement, staggered only where order matters.
- Button arrow travel, tactile press depth, focus ring expansion, and image-caption response.
- Menu morph, FAQ height transition, sticky CTA entrance/exit, and subtle cursor tilt on selected activity cards.
- Route markers acknowledge pointer proximity without magnetic movement larger than 6 px.

Rejected motion:

- Continuous floating objects, particle backgrounds, autoplay video, scroll hijacking, fake horizontal scroll on mobile, bouncing CTAs, endless marquees, and animation on every card.
- Any effect that delays access to content or requires JavaScript for visibility.

Reduced motion replaces scroll-linked transforms with static states, removes parallax and tilt, and keeps only short opacity transitions under 150 ms.

## 7. Technical architecture

- Next.js `16.3.3`, React `19.2.8`, TypeScript, App Router, Node.js 24.
- Server Components by default. Client boundaries are limited to header/menu, motion orchestration, activity pointer response, FAQ state, and sticky CTA visibility.
- `motion` for React animation. CSS handles simple hover/focus transitions.
- CSS Modules plus global design tokens; no UI component kit and no copied theme.
- Static local images through `next/image`; the hero has correct `sizes`, priority/preload behavior, and art direction.
- Typed content modules separate season data, timeline, activities, FAQ, testimonials, and organization details from presentation.
- Static rendering for marketing and legal pages. Server Actions are introduced only with the real lead-delivery integration.
- Default Vercel Node.js runtime; no Edge runtime.
- `vercel.ts` will hold redirects and security headers when the Vercel project is connected.

Proposed routes:

- `/` — campaign landing.
- `/aviso-legal` — validated legal notice.
- `/privacidad` — validated privacy policy.
- `/cookies` — actual cookie inventory and controls if non-essential cookies are added.
- `/gracias` — added with the provisioned lead form.

## 8. SEO strategy

Primary intent cluster:

- campamento de verano en Ciudad Real
- campamento cerca de Madrid
- campamento multiaventura con hípica
- campamento para niños de 6 a 16 años
- campamento residencial con inglés

Requirements:

- One descriptive `h1`; logical heading hierarchy.
- Human-first copy incorporating location and programme terms without repetition.
- Unique title and description, canonical URL, Open Graph/Twitter images, favicon, app icons, and Spanish locale.
- `robots.ts` and `sitemap.ts` return valid responses.
- JSON-LD for `Organization`, `WebSite`, and `FAQPage`; seasonal `Event`/`Offer` data only after real dates and prices exist.
- Descriptive image filenames, dimensions, captions where useful, and accurate alt text.
- Internal links to the main Granja Orea site and matching dossier, without duplicate or contradictory seasonal facts.
- Legacy URLs are redirected so existing references are preserved.
- No indexable placeholder dates, prices, legal text, or success pages.

## 9. Accessibility and content standards

- WCAG 2.2 AA target.
- All navigation and disclosures work with keyboard alone.
- Visible focus states are part of the visual system.
- Skip link, `main` landmark, labelled navigation, semantic lists, and live regions for future form status.
- Contrast passes AA in default, hover, disabled, and image-overlay states.
- No information conveyed only by color or animation.
- Copy consistently addresses the parent in natural Spanish and refers to children inclusively without symbols such as `@`.
- The page remains usable with JavaScript disabled except for enhanced motion and menu convenience.

## 10. Performance and quality budgets

Measured against a production build on a mobile Lighthouse profile:

- Performance score: at least 90.
- Accessibility, SEO, and Best Practices: at least 95, with a target of 100 for accessibility and SEO.
- LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- Initial transferred page weight under 1 MB on the audited route.
- Hero image target under 250 KB at a common mobile viewport.
- No render-blocking third-party font request.
- Page-specific client JavaScript target under 160 KB compressed.
- No console errors, hydration warnings, failed resources, or horizontal overflow from 320 px upward.

## 11. Testing and iteration

- Vitest tests typed content invariants, season-state behavior, metadata helpers, FAQ data, and WhatsApp URL generation.
- React Testing Library tests interactive semantics and reduced-motion variants.
- Playwright covers desktop and mobile navigation, section links, FAQ keyboard behavior, sticky CTA collisions, horizontal overflow, and no-JavaScript readability.
- Axe runs against the homepage and legal layouts.
- Production build and type checking are mandatory on every iteration.
- Visual review uses full-page and sectional screenshots at 390×844, 768×1024, and 1440×1000.
- At least three deliberate critique cycles are required: structural composition, motion/interaction, and final polish/performance. Each cycle removes effects that do not improve orientation, trust, or conversion.

## 12. Repository, backups, and deployment

- Local Git repository uses `main` as the production branch.
- Existing public HTML/assets and DNS observations are preserved in a dated legacy inventory before domain migration; personal data and secrets are excluded.
- Feature work uses focused commits and a lockfile.
- GitHub becomes the source of truth once access is provided. `main` is protected; pull requests receive Vercel previews and required quality checks.
- Environment values live in Vercel and GitHub Secrets, never committed.
- Vercel deployment occurs only after preview approval, integration provisioning, legal-content validation, and seasonal-data validation.
- The current Neodigit-hosted site stays available until the custom domain is verified on Vercel and the production deployment passes smoke tests.

## 13. Out of scope for the first release

- Online payment or deposit collection.
- Parent accounts or camper portals.
- A CMS or database solely to edit one annual campaign.
- Automated availability inventory without a real operational source.
- Multilingual content.
- Blog migration from the main Granja Orea website.

These can be specified independently if later needed; they will not complicate the first release.

## 14. Acceptance criteria

The first release is accepted when:

1. It communicates an honest 2027 pre-launch state without stale 2026 sales claims.
2. The full page is understandable and actionable on mobile before animation runs.
3. Its route narrative and day timeline feel custom to Orea and cannot be mistaken for a generic camp template.
4. Every interaction is keyboard accessible and respects reduced motion.
5. Performance and quality budgets pass on the production build.
6. SEO metadata, sitemap, robots, structured data, headings, and social previews are valid.
7. All current useful content is either represented, intentionally omitted, or linked to a season-matching source.
8. No fake form, invented commercial fact, placeholder legal claim, secret, or personal record is shipped.
9. Git history, preview deployment, rollback path, and legacy snapshot are in place before DNS cutover.

