export type SeasonStatus = "prelaunch" | "open" | "closed";

export interface SeasonSession {
  readonly id: "first" | "second";
  readonly label: string;
  readonly dateRange: string;
  readonly priceEur: number;
}

export interface CampSeason {
  readonly year: number;
  readonly overallDateRange: string;
  readonly status: SeasonStatus;
  readonly eyebrow: string;
  readonly message: string;
  readonly description: string;
  readonly sessions: readonly SeasonSession[];
}

const campaignYear = 2027;

export const campSeason = {
  year: campaignYear,
  overallDateRange: "1 al 30 de julio",
  status: "prelaunch",
  eyebrow: `Campamento de verano ${campaignYear}`,
  message: `Turnos y precios ${campaignYear} confirmados`,
  description:
    "Calcula el precio base y consulta la disponibilidad con el equipo Orea. La conversación por WhatsApp no formaliza una reserva.",
  sessions: [
    {
      id: "first",
      label: "Primera quincena",
      dateRange: "1–15 de julio",
      priceEur: 690,
    },
    {
      id: "second",
      label: "Segunda quincena",
      dateRange: "16–30 de julio",
      priceEur: 630,
    },
  ],
} as const satisfies CampSeason;

export const oreaLocation = {
  street: "Carretera de Toledo, s/n",
  locality: "Ciudad Real",
  region: "Castilla-La Mancha",
  country: "ES",
} as const;
