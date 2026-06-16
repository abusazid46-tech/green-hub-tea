import { z } from "zod";

export type Inquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  inquiry_type: string;
  quantity: number;
  message: string;
  source: string;
  status: "new" | "contacted" | "quoted" | "closed";
  created_at: string;
};

export type ProductRow = {
  id?: string;
  slug: string;
  name: string;
  category: string;
  short: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  benefits: string[];
  specs: Record<string, string>;
  notes: string[];
  strength: number;
  brew: {
    water: string;
    time: string;
    temperature: string;
    ratio: string;
  };
  popular?: boolean;
  active?: boolean;
  sort_order?: number;
};

export type CategoryRow = {
  id?: string;
  slug: string;
  name: string;
  description?: string | null;
  active?: boolean;
  sort_order?: number;
  created_at?: string;
};

export type PaymentRow = {
  id?: string;
  customer_name: string;
  customer_email?: string | null;
  product_slug?: string | null;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "failed" | "refunded";
  provider: string;
  payment_reference?: string | null;
  created_at?: string;
};

const specValueSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]).transform((value) => {
  if (value === null) return "";
  return String(value);
});

export const productInputSchema = z.object({
  slug: z.string().min(2),
  name: z.string().min(2),
  category: z.string().min(2),
  short: z.string().min(5),
  description: z.string().min(10),
  price: z.number().min(0),
  image: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  benefits: z.array(z.string().min(1)).default([]),
  specs: z.record(z.string(), specValueSchema).default({}),
  notes: z.array(z.string().min(1)).default([]),
  strength: z.number().min(0).max(100).default(50),
  brew: z.object({
    water: z.string().default("220 ml"),
    time: z.string().default("3 min"),
    temperature: z.string().default("95 C"),
    ratio: z.string().default("2 g")
  }),
  popular: z.boolean().default(false),
  active: z.boolean().default(true),
  sort_order: z.number().int().default(0)
});

export type ProductInput = z.infer<typeof productInputSchema>;

export const categoryInputSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  name: z.string().min(2),
  description: z.string().optional().default(""),
  active: z.boolean().default(true),
  sort_order: z.number().int().default(0)
});

export const paymentInputSchema = z.object({
  customer_name: z.string().min(2),
  customer_email: z.string().email().optional().or(z.literal("")).transform((value) => value || null),
  product_slug: z.string().optional().or(z.literal("")).transform((value) => value || null),
  amount: z.number().min(0),
  currency: z.string().min(3).max(3).default("INR"),
  status: z.enum(["paid", "pending", "failed", "refunded"]).default("pending"),
  provider: z.string().min(2).default("manual"),
  payment_reference: z.string().optional().or(z.literal("")).transform((value) => value || null)
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type PaymentInput = z.infer<typeof paymentInputSchema>;
