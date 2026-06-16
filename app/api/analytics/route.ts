import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/supabase/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { CategoryRow, Inquiry, PaymentRow, ProductRow } from "@/lib/supabase/types";

function sumPayments(payments: PaymentRow[], status: PaymentRow["status"]) {
  return payments
    .filter((payment) => payment.status === status)
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);
}

function countByStatus(items: { status: string }[]) {
  return items.reduce<Record<string, number>>((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});
}

export async function GET(request: Request) {
  const auth = await verifyAdminRequest(request);
  if (!auth.ok) return auth.response;

  const client = getSupabaseAdminClient();
  if (!client) {
    return NextResponse.json({ error: "Supabase server env vars are not configured." }, { status: 503 });
  }

  const [productResult, inquiryResult, categoryResult, paymentResult] = await Promise.all([
    client.from("products").select("*").order("created_at", { ascending: false }).limit(250),
    client.from("inquiries").select("*").order("created_at", { ascending: false }).limit(250),
    client.from("categories").select("*").order("sort_order", { ascending: true }).limit(250),
    client.from("payments").select("*").order("created_at", { ascending: false }).limit(250)
  ]);

  const products = ((productResult.data || []) as ProductRow[]);
  const inquiries = ((inquiryResult.data || []) as Inquiry[]);
  const categories = ((categoryResult.data || []) as CategoryRow[]);
  const payments = ((paymentResult.data || []) as PaymentRow[]);

  const paidRevenue = sumPayments(payments, "paid");
  const pendingRevenue = sumPayments(payments, "pending");
  const refundedRevenue = sumPayments(payments, "refunded");
  const failedRevenue = sumPayments(payments, "failed");
  const averageOrderValue = payments.filter((payment) => payment.status === "paid").length
    ? paidRevenue / payments.filter((payment) => payment.status === "paid").length
    : 0;

  return NextResponse.json({
    analytics: {
      totals: {
        products: products.length,
        activeProducts: products.filter((product) => product.active !== false).length,
        categories: categories.length,
        inquiries: inquiries.length,
        newInquiries: inquiries.filter((inquiry) => inquiry.status === "new").length,
        paidRevenue,
        pendingRevenue,
        refundedRevenue,
        failedRevenue,
        averageOrderValue
      },
      inquiryStatus: countByStatus(inquiries),
      paymentStatus: countByStatus(payments),
      recentInquiries: inquiries.slice(0, 6),
      recentPayments: payments.slice(0, 8),
      topProducts: products
        .slice()
        .sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
        .slice(0, 5)
    },
    warnings: [
      productResult.error ? `Products: ${productResult.error.message}` : "",
      inquiryResult.error ? `Inquiries: ${inquiryResult.error.message}` : "",
      categoryResult.error ? `Categories: ${categoryResult.error.message}` : "",
      paymentResult.error ? `Payments: ${paymentResult.error.message}` : ""
    ].filter(Boolean)
  });
}
