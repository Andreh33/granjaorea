"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

import styles from "./site-header.module.css";

const headerWhatsAppUrl = buildWhatsAppUrl(
  "Hola, quiero preparar una visita a Granja Escuela Orea.",
);

interface NavigationLink {
  readonly href: string;
  readonly label: string;
}

interface HeaderMobileMenuProps {
  readonly links: readonly NavigationLink[];
}

export function HeaderMobileMenu({ links }: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeAndRestoreFocus = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndRestoreFocus();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>("a[href], button"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAndRestoreFocus, isOpen]);

  return (
    <div className={styles.mobileMenu}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
        className={styles.menuTrigger}
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {isOpen ? createPortal(
        <div
          aria-label="Menú principal"
          aria-modal="true"
          className={styles.menuDialog}
          id="mobile-navigation"
          ref={dialogRef}
          role="dialog"
        >
          <nav aria-label="Navegación móvil" className={styles.mobileNav}>
            <ol>
              {links.map((link, index) => (
                <li key={link.href}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <a href={link.href} onClick={closeAndRestoreFocus}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ol>
            <a
              className={styles.mobileWhatsAppLink}
              href={headerWhatsAppUrl}
              onClick={closeAndRestoreFocus}
              rel="noreferrer"
              target="_blank"
            >
              Escribir por WhatsApp
              <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <p className={styles.mobileMenuMeta}>
            Granja · Hípica · Campamentos · Ciudad Real
          </p>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
