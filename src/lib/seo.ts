import type { Metadata } from "next";

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
  const title = "Campamento de verano en Ciudad Real | Orea Camp 2027";
  const description =
    "Campamento de verano en Ciudad Real para niños y jóvenes de 6 a 16 años. Turnos del 1 al 30 de julio de 2027 desde 630 €: naturaleza, multiaventura e hípica.";

  return {
    metadataBase: new URL(siteContent.organization.url),
    title,
    description,
    applicationName: siteContent.organization.name,
    category: "education",
    keywords: [
      "campamento de verano Ciudad Real",
      "campamento de verano niños",
      "campamento multiaventura",
      "campamento hípica",
      "campamento cerca de Madrid",
      "Orea Camp",
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
          alt: "Orea Camp, campamento de verano en Ciudad Real",
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
      "Campamento de verano y experiencias educativas en la naturaleza para niños y jóvenes de 6 a 16 años.",
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
