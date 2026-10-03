import type { MetadataRoute } from "next";
import { classes } from "@/lib/data/classes";
import { trainers } from "@/lib/data/trainers";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/schedule`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/free-trial`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/classes`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/training`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/trainers`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/membership`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/legal/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const classRoutes: MetadataRoute.Sitemap = classes.map((c) => ({
    url: `${SITE_URL}/classes/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const trainerRoutes: MetadataRoute.Sitemap = trainers.map((t) => ({
    url: `${SITE_URL}/trainers/${t.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...classRoutes, ...trainerRoutes];
}
