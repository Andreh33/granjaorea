import { siteContent } from "@/content/site-content";

import { HeaderMobileMenu } from "./header-mobile-menu";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.logo} href="#inicio">
          <strong>OREA</strong>
          <span>Granja · Hípica · Campamentos</span>
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
          Verano {siteContent.season.year}
          <span aria-hidden="true">↘</span>
        </a>

        <HeaderMobileMenu links={siteContent.navigation} />
      </div>
    </header>
  );
}
