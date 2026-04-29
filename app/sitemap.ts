import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BRANDS } from "@/components/brand/brands-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, priority: 1 },
    ...BRANDS.map((b) => ({
      url: `${SITE_URL}/${b.slug}`,
      lastModified,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/about`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/process`, lastModified, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, priority: 0.8 },
  ];
}
