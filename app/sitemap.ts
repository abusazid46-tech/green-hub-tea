import type { MetadataRoute } from "next";
import { brand, products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/home", priority: 1, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.95, changeFrequency: "daily" },
    { path: "/wholesale", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/export", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.65, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/shipping-policy", priority: 0.2, changeFrequency: "yearly" }
  ];

  return [
    ...routes.map((route) => ({
      url: `${brand.siteUrl}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority
    })),
    ...products.map((product) => ({
      url: `${brand.siteUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: product.popular ? 0.9 : 0.8
    }))
  ];
}
