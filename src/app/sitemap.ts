import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://strxeet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/careers",
    "/collections",
    "/contact",
    "/faq",
    "/privacy",
    "/shipping",
    "/shop",
    "/size-guide",
    "/sustainability",
    "/terms",
    "/wishlist",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route || "/"}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
