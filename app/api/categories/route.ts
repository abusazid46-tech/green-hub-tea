import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { categoryInputSchema } from "@/lib/supabase/types";

function isMissingTableError(error: { code?: string; message?: string }) {
  return error.code === "42P01" || Boolean(error.message?.toLowerCase().includes("does not exist"));
}

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const { data, error } = await client
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) {
      return NextResponse.json({
        categories: [],
        setupRequired: true,
        warning: "Categories table is missing. Run the latest supabase/schema.sql in Supabase SQL Editor."
      });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ categories: data || [] });
}

export async function POST(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = categoryInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category details.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await client
    .from("categories")
    .upsert(parsed.data, { onConflict: "slug" })
    .select("*")
    .single();

  if (error) {
    if (isMissingTableError(error)) {
      return NextResponse.json({
        error: "Categories table is missing. Run the latest supabase/schema.sql in Supabase SQL Editor."
      }, { status: 409 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ category: data }, { status: 201 });
}
