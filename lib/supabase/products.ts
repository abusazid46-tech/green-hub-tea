import type { Product } from "@/lib/data";
import { products as fallbackProducts } from "@/lib/data";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/supabase/types";

function normalizeProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    short: row.short,
    description: row.description,
    price: Number(row.price),
    image: row.image,
    gallery: Array.isArray(row.gallery) && row.gallery.length ? row.gallery : [row.image],
    benefits: Array.isArray(row.benefits) ? row.benefits : [],
    specs: row.specs || {},
    notes: Array.isArray(row.notes) ? row.notes : [],
    strength: Number(row.strength || 50),
    brew: row.brew || {
      water: "220 ml",
      time: "3 min",
      temperature: "95 C",
      ratio: "2 g"
    },
    popular: Boolean(row.popular)
  };
}

export async function getStoreProducts() {
  const client = getSupabaseAdminClient();
  if (!client) return fallbackProducts;

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data?.length) return fallbackProducts;
  return (data as ProductRow[]).map(normalizeProduct);
}

export async function getStoreProductBySlug(slug: string) {
  const client = getSupabaseAdminClient();
  if (!client) return fallbackProducts.find((item) => item.slug === slug);

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error || !data) return fallbackProducts.find((item) => item.slug === slug);
  return normalizeProduct(data as ProductRow);
}
