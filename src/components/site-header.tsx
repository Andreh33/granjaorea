import { siteContent } from "@/content/site-content";

import { HeaderMobileMenu } from "./header-mobile-menu";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.logo} href="#inicio">
          <svg aria-hidden="true" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" />
            <path d="M8 25c6-9 11-11 17-10 4 .5 6 3 8 7" />
            <circle cx="29" cy="10" r="3.5" />
          </svg>
          <span>
            Orea
            <strong>Camp</strong>
          </span>
        </a>

        <nav aria-label="Navegación principal" className={styles.desktopNav}>
          <ul>
            {siteContent.navigation.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className={styles.seasonLink} href="#temporada">
          Turnos y precios
          <span aria-hidden="true">↘</span>
        </a>

        <HeaderMobileMenu links={siteContent.navigation} />
      </div>
    </header>
  );
}
