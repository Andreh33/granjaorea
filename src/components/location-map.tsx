"use client";

import { useState } from "react";

import { oreaLocation } from "@/content/camp-config";

import styles from "./location-map.module.css";

const mapEmbedUrl =
  "https://www.google.com/maps?q=Granja+Escuela+Orea+Ciudad+Real&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Granja+Escuela+Orea,+Carretera+de+Toledo+s%2Fn,+Ciudad+Real";

export function LocationMap() {
  const [mapVisible, setMapVisible] = useState(false);
  const address = oreaLocation;

  return (
    <section
      aria-labelledby="location-title"
      className={styles.section}
      id="ubicacion"
    >
      <div className={styles.shell}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>El punto de partida</p>
          <h2 id="location-title">
            Naturaleza, <span>muy cerca.</span>
          </h2>
          <p>
            Orea Camp está en el entorno de La Atalaya, en Ciudad Real: el
            bosque y todas las instalaciones del campamento comparten el mismo
            recinto.
          </p>

          <address>
            <small>Granja Escuela Orea</small>
            <strong>{address.street}</strong>
            <span>
              {address.locality} · {address.region}
            </span>
          </address>

          <a href={directionsUrl} rel="noreferrer" target="_blank">
            Cómo llegar con Google Maps
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.mapFrame}>
          {mapVisible ? (
            <iframe
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title="Mapa interactivo de Granja Escuela Orea en Ciudad Real"
            />
          ) : (
            <div className={styles.mapPreview}>
              <TopographicLines />
              <div className={styles.coordinates} aria-hidden="true">
                <span>La Atalaya</span>
                <span>Ciudad Real</span>
              </div>
              <div className={styles.pin} aria-hidden="true">
                <span />
              </div>
              <div className={styles.previewAction}>
                <p>
                  El mapa externo permanece desactivado hasta que decidas
                  cargarlo.
                </p>
                <button onClick={() => setMapVisible(true)} type="button">
                  Cargar mapa interactivo
                  <span aria-hidden="true">＋</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function TopographicLines() {
  return (
    <svg aria-hidden="true" className={styles.contours} viewBox="0 0 900 700">
      <g>
        <path d="M-45 420c98-83 191-110 281-78 91 33 115 120 211 124 114 4 150-114 256-120 91-5 155 61 244 155" />
        <path d="M-71 379c110-91 221-122 325-79 93 39 113 123 203 131 111 9 163-103 256-111 110-9 177 58 266 159" />
        <path d="M-89 334c115-101 245-137 359-86 87 38 111 118 193 133 104 18 163-82 250-94 124-16 197 47 293 157" />
        <path d="M-109 287c143-114 286-148 399-82 69 40 105 109 181 125 99 21 158-63 237-75 131-20 224 41 325 162" />
        <path d="M-99 520c79-62 161-88 239-69 102 25 142 119 247 134 127 19 199-77 311-79 93-1 168 52 250 132" />
        <path d="M-86 566c74-54 150-74 222-54 100 28 142 122 251 140 141 23 207-60 321-67 95-6 168 35 248 105" />
        <path d="M294-54c-52 81-48 159 11 221 50 52 138 65 151 144 12 73-50 118-41 183 10 73 84 95 111 164 21 52 13 99-21 143" />
        <path d="M355-54c-57 79-52 151 5 206 48 47 128 63 143 132 17 77-41 123-28 188 14 69 83 91 111 155 23 52 21 103-5 153" />
      </g>
    </svg>
  );
}
