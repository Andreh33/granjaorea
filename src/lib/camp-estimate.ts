import {
  campSeason,
  type SeasonSession,
} from "@/content/camp-config";

import { buildWhatsAppUrl } from "./whatsapp";

export type CampSessionId = SeasonSession["id"];

export interface CampEstimateInput {
  readonly responsibleName: string;
  readonly phone: string;
  readonly childAge: number;
  readonly sessionId: CampSessionId;
}

export interface CampEstimate {
  readonly totalEur: number;
  readonly session: SeasonSession;
  readonly message: string;
  readonly whatsappUrl: string;
}

export function buildCampEstimate(input: CampEstimateInput): CampEstimate {
  const session = campSeason.sessions.find(
    (candidate) => candidate.id === input.sessionId,
  );

  if (!session) {
    throw new Error("El turno seleccionado no existe.");
  }

  const message = [
    `Hola, quiero consultar Orea Camp ${campSeason.year}.`,
    "",
    `Responsable: ${input.responsibleName.trim()}`,
    `Teléfono: ${input.phone.trim()}`,
    `Edad del niño/a: ${input.childAge} años`,
    `Turno: ${session.label} (${session.dateRange})`,
    `Precio base estimado: ${session.priceEur} € por participante`,
    "",
    "¿Podéis confirmarme la disponibilidad y las condiciones?",
  ].join("\n");

  return {
    totalEur: session.priceEur,
    session,
    message,
    whatsappUrl: buildWhatsAppUrl(message),
  };
}
