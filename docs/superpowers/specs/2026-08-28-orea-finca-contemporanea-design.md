# Orea — Finca contemporánea

## Estado

Dirección aprobada por el propietario el 28 de agosto de 2026. Esta especificación sustituye la dirección visual «cuaderno de campo prismático» de la iteración anterior. La decisión posterior del propietario de utilizar fotografía editorial externa también sustituye el requisito anterior de usar exclusivamente imágenes oficiales de Orea.

## Objetivo

Hacer que la página se reconozca inmediatamente como la web de una granja escuela, una propuesta hípica y unos campamentos, con los tres pilares al mismo nivel. Debe conservar el funcionamiento anual, la calculadora de verano, WhatsApp y Google Maps, pero abandonar cualquier apariencia de startup tecnológica.

La única tarea comercial de la página es que una familia, un centro educativo o un grupo entienda qué tipo de experiencia puede consultar y empiece una conversación con Orea. La calculadora sigue siendo una ayuda para preparar esa consulta, no una reserva.

## Público y jerarquía

- Familias que buscan naturaleza, animales, caballos, celebraciones o campamento.
- Centros educativos y grupos que buscan una jornada o convivencia fuera del aula.
- Los tres pilares de primer nivel son **Granja escuela**, **Hípica** y **Campamentos**.
- Ningún pilar se presenta como complemento de otro; los tres reciben el mismo espacio, jerarquía tipográfica, calidad fotográfica y acceso desde la navegación.
- Las propuestas variables se cierran con Orea. No se garantizan actividades, horarios recurrentes ni formatos concretos no confirmados.

## Mensaje principal

Titular de trabajo: «Granja, caballos y aventura. Todo el año.»

Texto de apoyo: Orea es un lugar en Ciudad Real donde convivir con la naturaleza, acercarse al mundo del caballo y vivir campamentos que ayudan a crecer.

El lenguaje debe ser directo, humano y concreto. Se eliminan coordenadas, metáforas tecnológicas, numeraciones decorativas y claims que no ayudan a entender la oferta.

## Arquitectura de la página

1. **Cabecera clara**: wordmark tipográfico OREA, navegación a Granja, Hípica, Campamentos, Visitas y Contacto, y CTA de WhatsApp.
2. **Hero editorial**: composición blanca y fotográfica que conserva la imagen de bosque aprobada. Presenta el titular, una frase breve, WhatsApp y un acceso al campamento, sin estadísticas genéricas ni estética neón.
3. **Tres portones**: tres grandes entradas fotográficas equivalentes que enlazan a Granja escuela, Hípica y Campamentos.
4. **Capítulo Granja escuela**: animales, naturaleza, familias, colegios y grupos. El contenido evita una rutina cerrada y deriva cada consulta a una propuesta adaptada.
5. **Capítulo Hípica**: el vínculo con el caballo, el cuidado, el respeto y la confianza. No se prometen modalidades, clases, recorridos ni edades sin confirmar; el CTA pregunta qué propuesta está disponible para la fecha y el grupo.
6. **Capítulo Campamentos**: convivencia, autonomía y naturaleza. Incluye los turnos y precios confirmados para 2027 y conduce a la calculadora.
7. **Galería editorial**: selección más contenida de fotografías de animales, caballos y convivencia, equilibrada entre los tres pilares.
8. **Cuidado y confianza**: experiencia del equipo, acompañamiento y adaptación a cada grupo, sin testimonios reescritos como citas literales. Se restauran citas aprobadas o se presentan paráfrasis sin comillas.
9. **Calculadora de verano**: primera quincena 690 €, segunda 630 €, responsable, teléfono y edad; el mensaje se prepara localmente y se abre en WhatsApp.
10. **Ubicación**: Google Maps directo, dirección y enlace de indicaciones.
11. **Preguntas y cierre**: FAQ nativa y CTA final para cualquiera de los tres pilares.
12. **Footer semántico**: identidad anual, contacto, legales y créditos fotográficos; se renderiza como `contentinfo` fuera de `main`.

## Sistema visual

### Paleta

- **Blanco calizo — `#FBFAF5`**: fondo principal y respiración visual.
- **Oliva Orea — `#7B8042`**: identidad, etiquetas, botones secundarios y detalles de campo.
- **Bosque — `#183B2B`**: titulares, navegación y superficies de contraste.
- **Pino profundo — `#0D2A20`**: footer, overlays fotográficos y CTA principal.
- **Naranja arcilla — `#C7643D`**: acento mate para acciones, precios y señales importantes.
- **Paja — `#E8DFCA`**: superficies secundarias, líneas y fondos táctiles.

No se utilizan lima eléctrica, cian, violeta, reflejos holográficos ni degradados iridiscentes.

### Tipografía

- **Bitter variable** para titulares y grandes mensajes: una slab serif legible que recuerda a señalética rural y libros de aprendizaje, sin convertirse en una estética de lujo.
- **Instrument Sans** para cuerpo, navegación, formularios y botones.
- Se elimina IBM Plex Mono del lenguaje visible. Las etiquetas usan Instrument Sans en versales pequeñas, con espaciado moderado.
- Los titulares dejan de ocupar casi todo el viewport; se priorizan lectura, fotografía y jerarquía.

### Formas y superficies

- Radios contenidos, de 12 a 24 px, reservando arcos mayores para marcos fotográficos inspirados en puertas de establo.
- Sombras mates y amplias, sin halos luminosos.
- Líneas inspiradas en cercados, picaderos y tablones, siempre al servicio de la estructura.
- Textura de papel casi imperceptible mediante CSS; no se añade una imagen de ruido pesada.
- Cards rellenas en blanco, paja u oliva suave. Los bordes prismáticos y el brillo que sigue al puntero desaparecen.

## Firma visual: los tres portones

El primer bloque después del hero contiene tres marcos fotográficos equivalentes. Cada uno funciona como una puerta a un universo de Orea:

- animal o interacción con la granja;
- caballo y vínculo hípico;
- grupo en convivencia o campamento.

En escritorio forman una fila de tres; en tablet una composición 1 + 2; en móvil se apilan. Al pasar el puntero, la fotografía se acerca ligeramente y una franja de color mate descubre el CTA, como una puerta que se abre. No hay inclinación 3D, destellos ni movimientos continuos.

## Fotografía y transparencia

- Se conservan fotografías editoriales de alta resolución de Unsplash porque el propietario pidió expresamente no utilizar las imágenes antiguas de Orea.
- Las imágenes representan el tipo de experiencia; no se presentan como fotografías documentales de las instalaciones.
- El hero mantiene el máster de 3840 × 2943 px y `quality={90}` con tamaños adaptativos de Next.js.
- Los textos alternativos describen literalmente lo visible y no inventan actividades.
- La primera galería incluye un aviso breve y el footer ofrece un enlace «Créditos fotográficos» a una sección accesible con autores, fuentes y licencia.
- Solo el hero se precarga. Las demás imágenes mantienen carga diferida y `sizes` responsivo.

## Movimiento

- Una sola secuencia de entrada en el hero: fotografía, titular y CTA, breve y coordinada.
- Los portones usan una ampliación fotográfica máxima de 1.04 y una traslación corta de la etiqueta.
- Los capítulos pueden revelar fotografía y texto al entrar en viewport, sin librerías de animación pesadas.
- Se eliminan giros infinitos, halos respirando, pulsos permanentes, fondos topográficos móviles y efectos holográficos.
- `prefers-reduced-motion` continúa anulando las transiciones no esenciales.
- Los manejadores de puntero solo se ejecutan en dispositivos con `hover: hover`, `pointer: fine` y movimiento no reducido.

## Contenido verificable

- La hípica se describe como un ámbito de experiencia y contacto con el caballo. Cualquier modalidad concreta se confirma con Orea.
- Las visitas se presentan «con cita previa»; no se publica un horario recurrente sin confirmación del propietario.
- Las citas familiares se conservan únicamente con su redacción aprobada. Cualquier mejora editorial se muestra como resumen o paráfrasis, no como una nueva cita literal.
- Las imágenes editoriales se identifican públicamente como tales.
- Los turnos y precios 2027 continúan viniendo de `camp-config.ts`.

## SEO y dominio

- La intención principal se amplía a «granja escuela en Ciudad Real», «hípica en Ciudad Real» y «campamentos en Ciudad Real».
- Título de trabajo: «Granja escuela, hípica y campamentos en Ciudad Real | Orea».
- Organization, WebSite y FAQPage continúan sin datos inventados de Offer, Event o AggregateRating.
- El icono deja de usar la identidad «Orea Camp» y adopta el wordmark anual OREA.
- Antes del cierre se elimina cualquier contradicción entre la canonical y el contenido realmente servido: se conecta `campamentos.granjaorea.com` al proyecto o se utiliza temporalmente el alias público de Vercel como canonical.

## Responsive y accesibilidad

- Comprobaciones explícitas a 390, 768 y 1440 px.
- Un solo H1, landmarks correctos y footer fuera de `main`.
- Menú móvil en portal, foco visible, contraste AA y FAQ con `details/summary`.
- La calculadora mantiene privacidad y funcionamiento sin JavaScript.
- Google Maps conserva `loading="lazy"` y `referrerPolicy="no-referrer"`.
- Sin scroll horizontal, texto mínimo de 16 px en contenido y áreas táctiles de al menos 44 px.

## Rendimiento

- Next.js 16, React Server Components por defecto y cero nuevas dependencias de animación.
- El hero 4K es un máster, no la transferencia obligatoria: Next.js genera AVIF/WebP y el ancho adecuado para cada dispositivo.
- Las imágenes de galería no compiten con el LCP.
- La prueba de imágenes ejecuta movimiento reducido para evitar esperas por animación continua.
- Se ejecuta Lighthouse contra la URL de Vercel; objetivo móvil: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95 y SEO ≥ 95.

## Pruebas y aceptación

- El primer viewport nombra claramente Granja, Hípica y Campamentos.
- Los tres portones tienen el mismo peso visual y semántico.
- No quedan elementos neón, holográficos, coordenadas, estadísticas decorativas ni estética tecnológica.
- La navegación ofrece acceso directo a los tres pilares.
- Hípica cuenta con contenido y CTA propios sin promesas no verificadas.
- La calculadora conserva 690 €, 630 € y WhatsApp personalizado sin filtrar PII.
- Google Maps es visible directamente.
- Existe crédito público para la fotografía editorial.
- El favicon y el Organization logo representan OREA, no «Orea Camp».
- Lint, tipos, Vitest, build y Playwright pasan.
- Playwright cubre 390, 768 y 1440 px, ausencia de overflow, mapa, WhatsApp, menú, FAQ, imágenes y axe.
- La revisión visual se realiza en navegador real sobre Preview antes de promover a Producción.
- El commit final se publica en GitHub y el despliegue de Vercel queda en estado `Ready`.

## Fuera de alcance

- Sistema de reservas o pagos.
- Base de datos, CRM o almacenamiento de solicitudes.
- Calendario de disponibilidad en tiempo real.
- Afirmaciones concretas sobre clases, rutas, niveles o actividades hípicas no confirmadas.
- Sustitución de los textos legales alojados actualmente en la web corporativa.
