import type { Metadata, Viewport } from "next";
import { Anybody, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const anybody = Anybody({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#102c27" },
    { media: "(prefers-color-scheme: dark)", color: "#102c27" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html
      className={`${anybody.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
      lang="es"
    >
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
