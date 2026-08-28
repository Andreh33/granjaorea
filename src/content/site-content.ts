export type SeasonStatus = "prelaunch" | "open" | "closed";

export interface SeasonSession {
  readonly id: string;
  readonly label: string;
  readonly dateRange: string;
  readonly availability: "available" | "limited" | "waitlist" | "closed";
}

export interface Season {
  readonly year: number;
  readonly status: SeasonStatus;
  readonly eyebrow: string;
  readonly message: string;
  readonly description: string;
  readonly sessions: readonly SeasonSession[];
}

export interface TimelineItem {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
  readonly phase: "morning" | "midday" | "afternoon" | "evening";
}

export interface Activity {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly focalPoint: string;
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
  readonly season: Season;
  readonly timeline: readonly TimelineItem[];
  readonly activities: readonly Activity[];
  readonly care: readonly CareFact[];
  readonly testimonials: readonly Testimonial[];
  readonly faq: readonly FaqItem[];
}

export const siteContent = {
  organization: {
    name: "Orea Camp",
    legalName: "Servicios Integrales Ciudad Real S.L.",
    url: "https://campamentos.granjaorea.com",
    email: "granjaorea@hotmail.com",
    phoneDisplay: "+34 615 367 717",
    phoneE164: "34615367717",
    address: {
      street: "Carretera de Toledo, s/n",
      locality: "Ciudad Real",
      region: "Castilla-La Mancha",
      country: "ES",
    },
    social: {
      instagram: "https://www.instagram.com/granjaescuelaorea/",
      facebook: "https://www.facebook.com/profile.php?id=61560544319855",
      linkedin: "https://www.linkedin.com/company/oreacamp/",
    },
  },
  navigation: [
    { label: "La experiencia", href: "#experiencia" },
    { label: "Actividades", href: "#actividades" },
    { label: "Cómo cuidamos", href: "#cuidados" },
    { label: "Preguntas", href: "#preguntas" },
  ],
  hero: {
    eyebrow: "Campamento de verano en Ciudad Real · 6 a 16 años",
    title: "El verano en el que empiezan a volver distintos",
    description:
      "Naturaleza, aventura y convivencia en La Atalaya, con un equipo que lleva más de 35 años acompañando sus grandes primeras veces.",
    facts: [
      { value: "35+", label: "años creando campamentos" },
      { value: "6–16", label: "años, en grupos por edad" },
      { value: "80+", label: "especies en la granja" },
    ],
  },
  season: {
    year: 2027,
    status: "prelaunch",
    eyebrow: "Próxima temporada",
    message: "Fechas y plazas próximamente",
    description:
      "Estamos preparando la próxima edición. Escríbenos y te avisaremos cuando publiquemos turnos, precios y condiciones.",
    sessions: [],
  },
  timeline: [
    {
      id: "despertar",
      time: "08:30",
      title: "Despertar en el bosque",
      description:
        "El día empieza sin prisas: aseo, habitaciones y primeros reencuentros del grupo.",
      phase: "morning",
    },
    {
      id: "desayuno",
      time: "09:00",
      title: "Desayuno",
      description:
        "Energía para la mañana y un momento para organizar juntos todo lo que viene.",
      phase: "morning",
    },
    {
      id: "primer-bloque",
      time: "09:30",
      title: "Primera aventura",
      description:
        "Actividades rotativas e inglés práctico: se aprende haciendo, hablando y colaborando.",
      phase: "morning",
    },
    {
      id: "almuerzo",
      time: "11:10",
      title: "Almuerzo",
      description: "Una pausa breve para reponer fuerzas y volver al grupo.",
      phase: "morning",
    },
    {
      id: "segundo-bloque",
      time: "11:25",
      title: "Segunda expedición",
      description:
        "Granja, multiaventura, hípica o naturaleza según la programación de cada grupo.",
      phase: "morning",
    },
    {
      id: "piscina-mediodia",
      time: "13:05",
      title: "Piscina y deporte",
      description:
        "Movimiento, agua y juego antes de sentarnos a comer.",
      phase: "midday",
    },
    {
      id: "comida",
      time: "14:00",
      title: "Comida y sobremesa",
      description:
        "Comida casera, conversación y un ritmo más tranquilo en las horas centrales.",
      phase: "midday",
    },
    {
      id: "talleres",
      time: "15:20",
      title: "Talleres",
      description:
        "Creatividad, expresión y pequeños proyectos para descubrir otras habilidades.",
      phase: "afternoon",
    },
    {
      id: "piscina-tarde",
      time: "17:00",
      title: "Piscina y deportes",
      description:
        "La tarde vuelve a activarse con juegos de agua y propuestas deportivas.",
      phase: "afternoon",
    },
    {
      id: "merienda",
      time: "17:40",
      title: "Merienda",
      description: "Un descanso corto antes del último reto del día.",
      phase: "afternoon",
    },
    {
      id: "ultimo-bloque",
      time: "18:00",
      title: "El último reto",
      description:
        "Una actividad más para cerrar la tarde aprendiendo a decidir y participar en equipo.",
      phase: "afternoon",
    },
    {
      id: "duchas",
      time: "19:15",
      title: "Duchas y tiempo de grupo",
      description:
        "Rutinas cotidianas, autonomía y un momento para compartir cómo ha ido el día.",
      phase: "evening",
    },
    {
      id: "cena",
      time: "20:45",
      title: "Cena",
      description: "Nos sentamos juntos antes de que empiece la noche.",
      phase: "evening",
    },
    {
      id: "velada",
      time: "22:15",
      title: "La gran velada",
      description:
        "Juegos, historias y recuerdos compartidos para terminar el día con el grupo.",
      phase: "evening",
    },
  ],
  activities: [
    {
      id: "granja",
      eyebrow: "Aprender cuidando",
      title: "Granja y más de 80 especies",
      description:
        "Una relación directa con los animales para entender sus cuidados, sus ritmos y el respeto por lo vivo.",
      image: "/images/orea/activity-farm.jpg",
      imageAlt: "Pavos reales en la zona de animales de Granja Escuela Orea",
      focalPoint: "50% 45%",
    },
    {
      id: "multiaventura",
      eyebrow: "Superarse con seguridad",
      title: "Multiaventura",
      description:
        "Parque aéreo, escalada y tirolina dentro de las instalaciones, adaptados a la edad y al grupo.",
      image: "/images/orea/activity-adventure.jpg",
      imageAlt: "Participante cruzando el parque aéreo de Orea",
      focalPoint: "50% 40%",
    },
    {
      id: "hipica",
      eyebrow: "Confianza paso a paso",
      title: "Hípica adaptada",
      description:
        "Primer contacto, clases y rutas estructuradas según la experiencia de cada participante.",
      image: "/images/orea/activity-horses.jpg",
      imageAlt: "Grupo de participantes en una sesión de hípica en Orea",
      focalPoint: "50% 50%",
    },
    {
      id: "piscina",
      eyebrow: "Verano en movimiento",
      title: "Piscina y juegos de agua",
      description:
        "Momentos refrescantes que combinan juego, convivencia y supervisión del equipo.",
      image: "/images/orea/activity-pool.jpg",
      imageAlt: "Grupo durante una actividad junto a la piscina de Orea",
      focalPoint: "50% 50%",
    },
    {
      id: "ingles",
      eyebrow: "Hablar sin darse cuenta",
      title: "Inglés en contexto",
      description:
        "Dinámicas prácticas integradas en la jornada para perder el miedo a comunicarse.",
      image: "/images/orea/activity-english.jpg",
      imageAlt: "Grupo de jóvenes sentado en círculo durante una dinámica en Orea",
      focalPoint: "50% 50%",
    },
    {
      id: "talleres",
      eyebrow: "Crear con las manos",
      title: "Talleres y expresión",
      description:
        "Propuestas creativas para imaginar, construir y descubrir talentos fuera de la rutina.",
      image: "/images/orea/activity-workshop.jpg",
      imageAlt: "Participantes durante una actividad colectiva al aire libre en Orea",
      focalPoint: "50% 50%",
    },
    {
      id: "deportes",
      eyebrow: "Jugar para cooperar",
      title: "Deportes y grandes juegos",
      description:
        "Retos colectivos en los que importa participar, probar y aprender a contar con los demás.",
      image: "/images/orea/activity-sports.jpg",
      imageAlt: "Participantes jugando al tenis en las pistas deportivas de Orea",
      focalPoint: "50% 50%",
    },
    {
      id: "veladas",
      eyebrow: "Cuando cae el sol",
      title: "Veladas que hacen grupo",
      description:
        "Juegos nocturnos, historias y momentos compartidos que terminan convirtiéndose en recuerdos.",
      image: "/images/orea/activity-evening.jpg",
      imageAlt: "Grupo participando en una actividad festiva de interior en Orea",
      focalPoint: "50% 50%",
    },
  ],
  care: [
    {
      id: "experience",
      title: "Más de 35 años de experiencia",
      description:
        "Orea organiza campamentos desde 1990 y aplica ese aprendizaje a cada rutina del día.",
    },
    {
      id: "team",
      title: "Equipo titulado y presente",
      description:
        "Los grupos cuentan con supervisión continuada y monitores preparados para su actividad.",
    },
    {
      id: "groups",
      title: "Grupos de 10 a 15 por edad",
      description:
        "La organización por etapas favorece la convivencia, el acompañamiento y retos adecuados.",
    },
    {
      id: "health",
      title: "Información médica antes de empezar",
      description:
        "Recogemos antecedentes y pautas; cualquier medicación se entrega identificada y una incidencia se comunica a la familia.",
    },
    {
      id: "families",
      title: "Comunicación con las familias",
      description:
        "Se facilitan teléfonos y horarios de contacto, y el equipo está disponible ante cualquier situación importante.",
    },
    {
      id: "facilities",
      title: "Aventura dentro de Orea",
      description:
        "Parque aéreo, escalada, tirolina, hípica y piscina forman parte de las propias instalaciones.",
    },
  ],
  testimonials: [
    {
      id: "maria",
      quote:
        "Mi hija salía de casa tantos días por primera vez y volvió encantada. Destaco la profesionalidad de los monitores y la tranquilidad de saber que había atención médica a diez minutos. Repetimos seguro.",
      name: "María J.",
      context: "Madre de una participante de 10 años · testimonio compartido con Orea",
    },
    {
      id: "carlos",
      quote:
        "El servicio de transporte desde Madrid es comodísimo. Los niños no paran en todo el día y la política de no usar el móvil les viene genial para desconectar de verdad. Una experiencia de diez.",
      name: "Carlos R.",
      context: "Padre de un participante de 14 años · testimonio compartido con Orea",
    },
    {
      id: "elena",
      quote:
        "Llevamos confiando en Orea Camp tres años seguidos. El bono de hípica es una maravilla y la comida es casera. Se nota la experiencia de tantos años organizando esto.",
      name: "Elena F.",
      context: "Madre de dos participantes · testimonio compartido con Orea",
    },
  ],
  faq: [
    {
      id: "ages",
      question: "¿Para qué edades está pensado Orea Camp?",
      answer:
        "El campamento está dirigido a niños y jóvenes de 6 a 16 años. La convivencia y las actividades se organizan por grupos de edad para adaptar el acompañamiento y los retos.",
    },
    {
      id: "homesickness",
      question: "¿Qué ocurre si echa de menos casa?",
      answer:
        "Es habitual, sobre todo durante los primeros días. El equipo acompaña de cerca a cada participante, facilita su integración en el grupo y contacta con la familia cuando la situación lo requiere.",
    },
    {
      id: "transport",
      question: "¿Hay transporte desde Madrid?",
      answer:
        "Orea ofrece transporte acompañado desde Madrid como servicio adicional. Los horarios, el punto de salida y las condiciones de la temporada 2027 se confirmarán junto con las fechas.",
    },
    {
      id: "phones",
      question: "¿Pueden llevar teléfono móvil o dinero?",
      answer:
        "El móvil se permite con uso restringido a horarios concretos para favorecer la desconexión. El dinero se puede custodiar mediante el sistema interno del campamento para evitar pérdidas.",
    },
    {
      id: "rooms",
      question: "¿Cómo se organizan los grupos y las habitaciones?",
      answer:
        "Los grupos reúnen habitualmente de 10 a 15 participantes por edades, con supervisión continuada. El alojamiento se realiza en habitaciones compartidas con baño privado.",
    },
    {
      id: "family-contact",
      question: "¿Cómo podemos comunicarnos durante el campamento?",
      answer:
        "Antes del comienzo se facilitan los teléfonos del equipo y los horarios previstos para llamadas. También podéis contactar ante cualquier situación importante.",
    },
    {
      id: "medical",
      question: "¿Cómo se gestiona una necesidad médica?",
      answer:
        "Antes del campamento se recoge la información médica relevante. La medicación debe entregarse identificada con nombre y pauta; ante una incidencia, el equipo contacta inmediatamente con la familia.",
    },
    {
      id: "dates-prices",
      question: "¿Cuándo se publican las fechas y precios de 2027?",
      answer:
        "Todavía estamos preparando la temporada 2027. Escríbenos por WhatsApp y te avisaremos cuando estén confirmados los turnos, los precios, las condiciones y la apertura de plazas.",
    },
  ],
} as const satisfies SiteContent;
