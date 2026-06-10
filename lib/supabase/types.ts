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
  specs: z.record(z.string(), z.string()).default({}),
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
