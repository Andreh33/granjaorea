# Orea Todo el Año — Diseño de actualización

## Objetivo

Convertir la landing centrada exclusivamente en el campamento de verano en la puerta de entrada digital de Granja Escuela Orea durante todo el año. La página debe transmitir naturaleza, confianza y energía contemporánea; mantener la calculadora de verano; facilitar el contacto por WhatsApp; y mostrar Google Maps directamente.

## Público y mensaje

- Familias que buscan visitas de fin de semana, celebraciones o campamento de verano.
- Centros educativos y grupos que buscan visitas o convivencias.
- Mensaje principal: «Naturaleza para vivirla. Todo el año.»
- El verano se presenta como uno de los programas, no como toda la identidad de Orea.
- No se publican horarios, actividades concretas, disponibilidad ni condiciones no confirmadas. Las propuestas se describen de forma flexible y se cierran con Orea por WhatsApp.

## Arquitectura de contenidos

1. Cabecera tipográfica sin isotipo: OREA + descriptor «Naturaleza · Ciudad Real».
2. Hero fotográfico a pantalla completa con título anual, CTA de WhatsApp, CTA de exploración y datos de confianza.
3. Banda breve de credenciales.
4. Experiencias: familias, colegios y grupos, celebraciones y campamento de verano.
5. Galería editorial con fotografías reales de Orea y composición asimétrica.
6. Cuidado y confianza, sin una rutina diaria fija.
7. Calculadora del campamento de verano 2027: primera quincena 690 €, segunda 630 €, datos del menor y del responsable, y mensaje privado de WhatsApp.
8. Google Maps embebido y visible de inmediato, con `loading="lazy"` y enlace de indicaciones.
9. Preguntas frecuentes separando información general de la temporada de verano.
10. CTA final y acceso flotante a WhatsApp.

## Dirección visual

- Concepto: cuaderno de campo prismático. Naturaleza real combinada con acabados digitales imposibles en una plantilla genérica.
- Paleta: verde bosque oscuro, marfil cálido, lima eléctrica, naranja solar y reflejos cian/violeta puntuales.
- Hero full-bleed con fotografía local optimizada, veladuras profundas, grano CSS y capas tipográficas.
- Cards rellenas con sombras de profundidad, borde prismático, brillo que responde al puntero y patrones topográficos sutiles.
- Galería con recortes editoriales, pies numerados y pequeños desplazamientos al hacer hover.
- Movimiento: entradas escalonadas, marquesina suave, halos y microinteracciones CSS; el contenido sigue siendo legible y operativo sin JavaScript.
- Se conserva la salvaguarda `prefers-reduced-motion` para usuarios que la solicitan en el sistema, aunque la experiencia normal tendrá movimiento abundante.

## Fotografía

- Priorizar exclusivamente archivos oficiales de Orea o publicados por sus perfiles oficiales.
- Servir copias locales mediante `next/image` para evitar dependencias de terceros, saltos de diseño y transferencias innecesarias.
- Hero con la mejor imagen vertical u horizontal disponible y encuadre adaptable; no afirmar que una imagen es 4K si la fuente no lo es.
- Las imágenes inferiores se cargan de forma diferida y con `sizes` responsivo.

## SEO y datos estructurados

- Intención principal: «granja escuela en Ciudad Real», «campamentos en Ciudad Real», «visitas familiares», «convivencias escolares» y «cumpleaños en granja escuela».
- Título: «Granja escuela y campamentos en Ciudad Real | Orea».
- Descripción anual con mención específica al campamento de verano.
- Mantener Organization, WebSite y FAQPage; no inventar Event, Offer, reseñas verificadas ni servicios no confirmados.
- Un solo H1, jerarquía de encabezados coherente, enlaces internos descriptivos, textos alternativos fieles y canonical existente.

## Rendimiento, accesibilidad y privacidad

- Next.js 16 App Router, React Server Components por defecto y sin nueva librería pesada de animación.
- Imágenes con dimensiones estables; solo el hero se prioriza.
- Google Maps carga inmediatamente por petición del cliente, pero el iframe mantiene `loading="lazy"` y `referrerPolicy="no-referrer"`.
- La calculadora nunca envía datos personales mediante query string ni navegación GET; únicamente construye el mensaje en el navegador al pulsar el botón.
- Navegación por teclado, foco visible, contraste AA, HTML semántico y FAQ nativa con `details`.

## Criterios de aceptación

- No aparece la antigua línea temporal ni el grid rígido de actividades.
- No aparece el isotipo SVG anterior.
- La página comunica claramente que Orea funciona durante todo el año.
- Google Maps está presente en el HTML inicial y no exige un clic previo.
- La calculadora conserva los precios 690 € y 630 € y genera un WhatsApp personalizado sin filtrar PII en la URL de la página.
- La experiencia es coherente a 390, 768 y 1440 px, no tiene scroll horizontal y supera las pruebas unitarias, de integración, lint, tipos y build.
- El commit final está en GitHub y la URL pública de Vercel responde correctamente.
