import type { Metadata, Viewport } from "next";
import { Bitter, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { buildMetadata } from "@/lib/seo";

import "./globals.css";

const bitter = Bitter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#183B2B" },
    { media: "(prefers-color-scheme: dark)", color: "#183B2B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html className={`${bitter.variable} ${instrumentSans.variable}`} lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
