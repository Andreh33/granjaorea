import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteContent.organization.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
