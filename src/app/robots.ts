import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteContent.organization.url}/sitemap.xml`,
    host: siteContent.organization.url,
  };
}
