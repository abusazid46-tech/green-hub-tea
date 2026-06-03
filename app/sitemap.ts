import type { MetadataRoute } from "next";
import { brand, products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/home", "/about", "/shop", "/wholesale", "/export", "/blog", "/contact", "/privacy-policy", "/terms", "/shipping-policy"];
  return [
    ...routes.map((route) => ({
      url: `${brand.siteUrl}${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `${brand.siteUrl}/product/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
