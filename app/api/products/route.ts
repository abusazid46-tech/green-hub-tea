import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { getStoreProducts } from "@/lib/supabase/products";
import { productInputSchema } from "@/lib/supabase/types";

export async function GET() {
  const products = await getStoreProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = productInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid product details.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await client
    .from("products")
    .upsert(parsed.data, { onConflict: "slug" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data }, { status: 201 });
}
