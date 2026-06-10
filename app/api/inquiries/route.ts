import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/forms";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiries: data });
}

export async function POST(request: Request) {
  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase is not configured yet." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid inquiry details.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const values = parsed.data;
  const { data, error } = await client
    .from("inquiries")
    .insert({
      name: values.name,
      company: values.company || null,
      email: values.email,
      phone: values.phone,
      inquiry_type: values.inquiryType,
      quantity: values.quantity,
      message: values.message,
      source: "website"
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiry: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = typeof body?.status === "string" ? body.status : "";
  const allowedStatuses = ["new", "contacted", "quoted", "closed"];

  if (!id || !allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid inquiry status update." }, { status: 400 });
  }

  const { data, error } = await client
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inquiry: data });
}
