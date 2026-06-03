"use client";

import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Enter your name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  inquiryType: z.string().min(1, "Select an inquiry type"),
  quantity: z.number().min(1, "Quantity must be at least 1 kg"),
  message: z.string().min(10, "Share a few details")
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
