import { campSeason, oreaLocation, type CampSeason } from "./camp-config";

export interface Experience {
  readonly id: "familias" | "colegios" | "celebraciones" | "verano";
  readonly number: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly focalPoint: string;
  readonly href: string;
  readonly linkLabel: string;
  readonly tone: "lime" | "orange" | "blue" | "violet";
}

export interface GalleryImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly sizes: string;
}

export interface CareFact {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly context: string;
}

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface SiteContent {
  readonly organization: {
    readonly name: string;
    readonly legalName: string;
    readonly url: string;
    readonly email: string;
    readonly phoneDisplay: string;
    readonly phoneE164: string;
    readonly address: {
      readonly street: string;
      readonly locality: string;
      readonly region: string;
      readonly country: string;
    };
    readonly social: {
      readonly instagram: string;
      readonly facebook: string;
      readonly linkedin: string;
    };
  };
  readonly navigation: readonly {
    readonly label: string;
    readonly href: string;
  }[];
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly facts: readonly {
      readonly value: string;
      readonly label: string;
    }[];
  };
  readonly season: CampSeason;
  readonly experiences: readonly Experience[];
  readonly gallery: readonly GalleryImage[];
  readonly care: readonly CareFact[];
  readonly testimonials: readonly Testimonial[];
  readonly faq: readonly FaqItem[];
}

export const siteContent = {
  organization: {
    name: "Granja Escuela Orea",
    legalName: "Servicios Integrales Ciudad Real S.L.",
    url: "https://campamentos.granjaorea.com",
    email: "granjaorea@hotmail.com",
    phoneDisplay: "+34 615 367 717",
    phoneE164: "34615367717",
    address: oreaLocation,
    social: {
      instagram: "https://www.instagram.com/granjaescuelaorea/",
      facebook: "https://www.facebook.com/profile.php?id=61560544319855",
      linkedin: "https://www.linkedin.com/company/oreacamp/",
    },
  },
  navigation: [
    { label: "Experiencias", href: "#experiencias" },
    { label: "Galería", href: "#instalaciones" },
    { label: "Campamento", href: "#temporada" },
    { label: "Ubicación", href: "#ubicacion" },
  ],
  hero: {
    eyebrow: "Granja escuela en Ciudad Real · Todo el año",
    title: "Naturaleza para vivirla. Todo el año.",
    description:
      "Familias, colegios, grupos y campamentos encuentran en Orea un lugar donde salir de la rutina, convivir y volver a mirar la naturaleza de cerca.",
    facts: [
      { value: "35+", label: "años creando experiencias" },
      { value: "80+", label: "especies en la granja" },
      { value: "365", label: "días para volver al campo" },
    ],
  },
  season: campSeason,
  experiences: [
    {
      id: "familias",
      number: "01",
      eyebrow: "Fines de semana con cita previa",
      title: "Visitas en familia",
      description:
        "Un plan para grandes y pequeños: conocer los animales, respirar campo y compartir una mañana diferente muy cerca de Ciudad Real.",
      detail: "Sábados y domingos por la mañana",
      image: "/images/orea/stock-farm.jpg",
      imageAlt: "Niño sosteniendo con cuidado una cría de cabra en el campo",
      focalPoint: "50% 52%",
      href: "#contacto",
      linkLabel: "Preparar la visita",
      tone: "lime",
    },
    {
      id: "colegios",
      number: "02",
      eyebrow: "Aprender fuera del aula",
      title: "Colegios y grupos",
      description:
        "Visitas y convivencias que se plantean según la edad, los objetivos y el tiempo disponible de cada centro o colectivo.",
      detail: "Programas adaptados a cada grupo",
      image: "/images/orea/stock-hero.jpg",
      imageAlt: "Grupo de niños participando en una jornada de cuidado del bosque",
      focalPoint: "68% 50%",
      href: "#contacto",
      linkLabel: "Consultar para un grupo",
      tone: "blue",
    },
    {
      id: "celebraciones",
      number: "03",
      eyebrow: "Un cumpleaños fuera de serie",
      title: "Celebraciones",
      description:
        "Una forma distinta de celebrar, rodeados de naturaleza y con propuestas preparadas para que el grupo viva el día de verdad.",
      detail: "Formato y actividades a confirmar",
      image: "/images/orea/stock-celebration.jpg",
      imageAlt: "Niños y adultos compartiendo un juego al aire libre con globos",
      focalPoint: "50% 48%",
      href: "#contacto",
      linkLabel: "Imaginar la celebración",
      tone: "orange",
    },
    {
      id: "verano",
      number: "04",
      eyebrow: `Julio ${campSeason.year} · 6 a 16 años`,
      title: "Campamento de verano",
      description:
        "Días para hacer amigos, ganar autonomía y vivir el campo sin pantallas en una experiencia que se recuerda mucho después de volver a casa.",
      detail: "Dos quincenas con precios confirmados",
      image: "/images/orea/stock-trail.jpg",
      imageAlt: "Dos niños caminando juntos por un sendero rodeado de vegetación",
      focalPoint: "62% 50%",
      href: "#temporada",
      linkLabel: "Calcular el campamento",
      tone: "violet",
    },
  ],
  gallery: [
    {
      id: "explorar",
      src: "/images/orea/stock-trail.jpg",
      alt: "Dos niños explorando juntos un sendero en el bosque",
      caption: "Explorar con los cinco sentidos",
      sizes: "(max-width: 760px) 100vw, 62vw",
    },
    {
      id: "granja",
      src: "/images/orea/stock-farm.jpg",
      alt: "Niño interactuando con una cría de cabra en una zona verde",
      caption: "Aprender a cuidar lo vivo",
      sizes: "(max-width: 760px) 100vw, 36vw",
    },
    {
      id: "caballos",
      src: "/images/orea/stock-horse.jpg",
      alt: "Niña con casco montando a caballo delante de un establo",
      caption: "Descubrir el mundo del caballo",
      sizes: "(max-width: 760px) 100vw, 35vw",
    },
    {
      id: "aventura",
      src: "/images/orea/stock-adventure.jpg",
      alt: "Niño avanzando entre rocas y flores durante una exploración",
      caption: "Retos que hacen crecer",
      sizes: "(max-width: 760px) 100vw, 35vw",
    },
    {
      id: "juego",
      src: "/images/orea/stock-group.jpg",
      alt: "Grupo de niños concentrado en un juego al aire libre",
      caption: "Compartir, descubrir, pertenecer",
      sizes: "(max-width: 760px) 100vw, 28vw",
    },
  ],
  care: [
    {
      id: "experience",
      title: "Más de 35 años de experiencia",
      description:
        "Orea acompaña a niños, jóvenes, familias y grupos desde 1990, aprendiendo con cada nueva experiencia.",
    },
    {
      id: "team",
      title: "Equipo titulado y presente",
      description:
        "Las propuestas dirigidas cuentan con monitores preparados y un acompañamiento adaptado al grupo.",
    },
    {
      id: "tailored",
      title: "Cada visita tiene su forma",
      description:
        "La edad, el tamaño del grupo, la estación y el objetivo definen la propuesta; por eso la cerramos contigo.",
    },
    {
      id: "facilities",
      title: "Todo sucede dentro de Orea",
      description:
        "Granja, espacios naturales, alojamiento y zonas de actividad conviven en el mismo recinto de La Atalaya.",
    },
  ],
  testimonials: [
    {
      id: "maria",
      quote:
        "Mi hija salía de casa tantos días por primera vez y volvió encantada. Destaco la profesionalidad de los monitores y la tranquilidad con la que vivimos la experiencia.",
      name: "María J.",
      context: "Madre de una participante · testimonio compartido con Orea",
    },
    {
      id: "carlos",
      quote:
        "Los niños no paran y la desconexión del móvil les viene genial. Volvió hablando de amigos, animales y retos que pensaba que no podía superar.",
      name: "Carlos R.",
      context: "Padre de un participante · testimonio compartido con Orea",
    },
    {
      id: "elena",
      quote:
        "Llevamos confiando en Orea tres años seguidos. Se nota la experiencia y el cariño con el que el equipo acompaña al grupo.",
      name: "Elena F.",
      context: "Madre de dos participantes · testimonio compartido con Orea",
    },
  ],
  faq: [
    {
      id: "family-visits",
      question: "¿Cuándo se puede visitar Orea en familia?",
      answer:
        "Las visitas familiares se organizan con cita previa los sábados y domingos por la mañana. Escríbenos por WhatsApp para confirmar fecha, horario y propuesta antes de desplazarte.",
    },
    {
      id: "schools",
      question: "¿Preparáis visitas para colegios y otros grupos?",
      answer:
        "Sí. Orea organiza visitas y convivencias para centros educativos y colectivos. La duración y el programa se plantean según la edad, el tamaño del grupo y sus objetivos.",
    },
    {
      id: "celebrations",
      question: "¿Se pueden celebrar cumpleaños en la granja escuela?",
      answer:
        "Sí. El formato, la fecha y las propuestas dependen del grupo y de la disponibilidad. Cuéntanos la edad y el número aproximado de asistentes para preparar una opción adecuada.",
    },
    {
      id: "ages",
      question: "¿Para qué edades está pensado el campamento de verano?",
      answer:
        "El campamento de verano está dirigido a niños y jóvenes de 6 a 16 años. La convivencia y las propuestas se organizan por etapas para adaptar el acompañamiento y los retos.",
    },
    {
      id: "transport",
      question: `¿Hay transporte para el campamento de ${campSeason.year}?`,
      answer: `El transporte no está confirmado para la temporada ${campSeason.year}. Consulta al equipo Orea antes de organizar el viaje; si se activa alguna opción, te facilitarán punto de salida, horarios y condiciones.`,
    },
    {
      id: "medical",
      question: "¿Cómo se gestiona una necesidad médica en el campamento?",
      answer:
        "Antes del campamento se recoge la información médica relevante. La medicación debe entregarse identificada con nombre y pauta; ante una incidencia, el equipo contacta con la familia.",
    },
    {
      id: "dates-prices",
      question: `¿Cuáles son los turnos y precios del verano ${campSeason.year}?`,
      answer: `${campSeason.sessions[0].label}, del ${campSeason.sessions[0].dateRange}: ${campSeason.sessions[0].priceEur} € por participante. ${campSeason.sessions[1].label}, del ${campSeason.sessions[1].dateRange}: ${campSeason.sessions[1].priceEur} €. La calculadora prepara tu consulta y el equipo confirma por WhatsApp disponibilidad y condiciones.`,
    },
  ],
} as const satisfies SiteContent;
