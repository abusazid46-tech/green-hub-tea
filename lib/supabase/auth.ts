import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type AdminAuthResult =
  | { ok: true; email: string }
  | { ok: false; response: NextResponse };

export async function verifyAdminRequest(request: Request): Promise<AdminAuthResult> {
  const client = getSupabaseAdminClient();
  if (!client) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 })
    };
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Missing admin session token." }, { status: 401 })
    };
  }

  const { data, error } = await client.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (error || !email || !adminEmails.includes(email)) {
    return {
      ok: false,
      response: NextResponse.json({ error: "You are not allowed to access this admin API." }, { status: 403 })
    };
  }

  return { ok: true, email };
}
