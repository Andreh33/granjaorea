"use client";

import { type FormEvent, useState } from "react";

import { campSeason } from "@/content/camp-config";
import {
  buildCampEstimate,
  type CampSessionId,
} from "@/lib/camp-estimate";

import styles from "./camp-calculator.module.css";

export function CampCalculator() {
  const sessions = campSeason.sessions;
  const [sessionId, setSessionId] = useState<CampSessionId>(sessions[0].id);
  const selectedSession =
    sessions.find((session) => session.id === sessionId) ?? sessions[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const estimate = buildCampEstimate({
      responsibleName: String(formData.get("responsibleName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      childAge: Number(formData.get("childAge")),
      sessionId,
    });

    window.open(estimate.whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      aria-labelledby="calculator-title"
      className={styles.section}
      id="temporada"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <div className={styles.year} aria-hidden="true">
            <span>20</span>
            <strong>27</strong>
          </div>
          <div>
            <p className={styles.eyebrow}>Tu consulta, lista en un minuto</p>
            <h2 id="calculator-title">
              Elige su quincena. <span>El resto lo hablamos.</span>
            </h2>
            <p className={styles.lede}>{campSeason.description}</p>
          </div>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.sessionFieldset}>
            <legend>1. Elige el turno</legend>
            <div className={styles.sessionGrid}>
              {sessions.map((session, index) => (
                <label className={styles.sessionCard} key={session.id}>
                  <input
                    checked={sessionId === session.id}
                    name="session"
                    onChange={() => setSessionId(session.id)}
                    type="radio"
                    value={session.id}
                  />
                  <span className={styles.sessionTopline}>
                    Turno 0{index + 1}
                    <span aria-hidden="true" className={styles.radioMark} />
                  </span>
                  <strong>{session.label}</strong>
                  <span className={styles.sessionDates}>{session.dateRange}</span>
                  <span className={styles.sessionPrice}>
                    <b>{session.priceEur}</b>
                    <span>€ / participante</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.detailsFieldset}>
            <legend>2. Cuéntanos lo esencial</legend>
            <div className={styles.fields}>
              <label className={styles.nameField}>
                <span>Nombre del responsable</span>
                <input
                  autoComplete="name"
                  maxLength={80}
                  name="responsibleName"
                  placeholder="Nombre y apellidos"
                  required
                  type="text"
                />
              </label>
              <label>
                <span>Teléfono de contacto</span>
                <input
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                  name="phone"
                  pattern="[0-9+()\s-]{7,20}"
                  placeholder="+34 600 000 000"
                  required
                  type="tel"
                />
              </label>
              <label>
                <span>Edad del niño o niña</span>
                <span className={styles.ageInput}>
                  <input
                    inputMode="numeric"
                    max={16}
                    min={6}
                    name="childAge"
                    placeholder="10"
                    required
                    type="number"
                  />
                  <small>años</small>
                </span>
              </label>
            </div>
          </fieldset>

          <aside aria-live="polite" className={styles.summary}>
            <div>
              <p>Estimación informativa</p>
              <strong data-testid="estimate-session">
                {selectedSession.label} · {selectedSession.dateRange}
              </strong>
              <span>Precio base para un participante</span>
            </div>
            <p className={styles.total}>
              <span data-testid="estimate-total">{selectedSession.priceEur}</span>
              <small>€</small>
            </p>
          </aside>

          <div className={styles.submitRow}>
            <button type="submit">
              <WhatsAppMark />
              Continuar por WhatsApp
              <span aria-hidden="true">↗</span>
            </button>
            <p>
              No guardamos estos datos. WhatsApp se abrirá con el mensaje
              preparado; la disponibilidad la confirma personalmente el equipo
              Orea.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function WhatsAppMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" />
      <path d="M8.2 7.6c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 2c.1.3 0 .5-.2.7l-.6.7c-.2.2-.1.4 0 .6.5 1 1.3 1.8 2.3 2.3.2.1.4.2.6 0l.8-1c.2-.2.4-.2.7-.1l2 .9c.3.1.4.3.4.5 0 .3-.2 1.5-1.1 2-.7.5-1.7.7-2.7.4-1.1-.3-2.6-.8-4.4-2.4-1.5-1.4-2.5-3.1-2.8-4.2-.3-1 .1-1.9.6-2.4Z" />
    </svg>
  );
}
