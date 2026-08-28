import { oreaLocation } from "@/content/camp-config";

import styles from "./location-map.module.css";

const mapEmbedUrl =
  "https://www.google.com/maps?q=Granja+Escuela+Orea+Ciudad+Real&output=embed";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Granja+Escuela+Orea,+Carretera+de+Toledo+s%2Fn,+Ciudad+Real";

export function LocationMap() {
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
            Orea está en el entorno de La Atalaya, en Ciudad Real: naturaleza,
            animales e instalaciones comparten un mismo recinto durante todo
            el año.
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
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
            src={mapEmbedUrl}
            title="Mapa de Granja Escuela Orea en Ciudad Real"
          />
        </div>
      </div>
    </section>
  );
}
