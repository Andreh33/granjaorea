import type { Metadata } from "next";

import { campSeason } from "@/content/camp-config";
import { siteContent } from "@/content/site-content";

const CANONICAL_URL = `${siteContent.organization.url}/`;

export interface FaqJsonLd {
  readonly "@context": "https://schema.org";
  readonly "@type": "FAQPage";
  readonly mainEntity: readonly {
    readonly "@type": "Question";
    readonly name: string;
    readonly acceptedAnswer: {
      readonly "@type": "Answer";
      readonly text: string;
    };
  }[];
}

export function buildMetadata(): Metadata {
  const title = "Granja escuela y campamentos en Ciudad Real | Orea";
  const description = `Granja escuela en Ciudad Real con experiencias todo el año para familias, colegios y grupos, celebraciones y campamento de verano ${campSeason.year}.`;

  return {
    metadataBase: new URL(siteContent.organization.url),
    title,
    description,
    applicationName: siteContent.organization.name,
    category: "education",
    keywords: [
      "granja escuela Ciudad Real",
      "visitas familiares Ciudad Real",
      "convivencias escolares Ciudad Real",
      "cumpleaños granja escuela",
      "campamento de verano Ciudad Real",
      "Granja Escuela Orea",
    ],
    alternates: {
      canonical: CANONICAL_URL,
    },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url: CANONICAL_URL,
      siteName: siteContent.organization.name,
      title,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Granja Escuela Orea, naturaleza y campamentos en Ciudad Real",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/icon.svg",
    },
  };
}

export function buildOrganizationJsonLd() {
  const { organization } = siteContent;

  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    "@id": `${organization.url}/#organization`,
    name: organization.name,
    legalName: organization.legalName,
    url: `${organization.url}/`,
    logo: `${organization.url}/icon.svg`,
    email: organization.email,
    telephone: organization.phoneDisplay,
    foundingDate: "1990",
    description:
      "Granja escuela y experiencias en la naturaleza para familias, colegios, grupos y campamentos de verano en Ciudad Real.",
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: organization.address.street,
      addressLocality: organization.address.locality,
      addressRegion: organization.address.region,
      addressCountry: organization.address.country,
    },
    sameAs: Object.values(organization.social),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    "@id": `${siteContent.organization.url}/#website`,
    url: `${siteContent.organization.url}/`,
    name: siteContent.organization.name,
    inLanguage: "es-ES",
    publisher: {
      "@id": `${siteContent.organization.url}/#organization`,
    },
  };
}

export function buildFaqJsonLd(): FaqJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteContent.faq.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
