import { siteContent } from "@/content/site-content";

import styles from "./site-footer.module.css";

const legalLinks = [
  {
    href: "https://www.granjaorea.com/Web/contenido/aviso-legal",
    label: "Aviso legal",
  },
  {
    href: "https://www.granjaorea.com/Web/contenido/politica-de-privacidad-y-proteccion-de-datos",
    label: "Privacidad",
  },
  {
    href: "https://www.granjaorea.com/Web/contenido/politica-de-cookies",
    label: "Cookies",
  },
] as const;

export function SiteFooter() {
  const { organization, photoCredits } = siteContent;

  return (
    <footer className={styles.footer} data-site-footer>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <span>OREA</span>
          <strong>Granja · Hípica · Campamentos</strong>
        </div>

        <address>
          {organization.address.street}
          <br />
          {organization.address.locality} · {organization.address.region}
          <br />
          <a href={`mailto:${organization.email}`}>{organization.email}</a>
        </address>

        <nav aria-label="Redes sociales">
          {Object.entries(organization.social).map(([name, href]) => (
            <a href={href} key={name} rel="noreferrer" target="_blank">
              {name}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>

      <details className={styles.credits} id="creditos-fotograficos">
        <summary>Créditos fotográficos</summary>
        <ul>
          {photoCredits.map((credit) => (
            <li key={credit.file}>
              {credit.file} ·{" "}
              <a
                aria-label={`Ver foto de ${credit.author} en Unsplash`}
                href={credit.sourceUrl}
                rel="noreferrer"
                target="_blank"
              >
                {credit.author}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <div className={styles.legal}>
        <span>
          © {new Date().getFullYear()} {organization.legalName}
        </span>
        <div>
          {legalLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
