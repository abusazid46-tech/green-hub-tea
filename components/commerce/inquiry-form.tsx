"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InquiryFormValues, inquirySchema } from "@/lib/forms";
import { mailtoLink, whatsappLink } from "@/lib/utils";

export function InquiryForm({ mode = "Wholesale" }: { mode?: "Wholesale" | "Export" | "Contact" }) {
  const [submitNote, setSubmitNote] = useState("");
  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      inquiryType: mode,
      quantity: 25,
      message: ""
    }
  });

  const onSubmit = async (values: InquiryFormValues) => {
    const message = [
      `Inquiry Type: ${values.inquiryType}`,
      `Name: ${values.name}`,
      `Company: ${values.company || "N/A"}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Quantity: ${values.quantity} kg`,
      `Message: ${values.message}`
    ].join("\n");

    setSubmitNote("Saving inquiry...");
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    }).catch(() => null);

    if (!response?.ok) {
      setSubmitNote("Inquiry could not be saved. Please try again or contact us on WhatsApp.");
      return;
    }

    setSubmitNote("Inquiry saved. Opening WhatsApp/email...");
    window.open(whatsappLink(message), "_blank", "noreferrer");
    window.location.href = mailtoLink(`Green Hub ${values.inquiryType} Inquiry`, message);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Name
          <Input {...form.register("name")} placeholder="Your name" />
          <span className="text-xs text-red-600">{form.formState.errors.name?.message}</span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Company
          <Input {...form.register("company")} placeholder="Company or store" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Email
          <Input {...form.register("email")} type="email" placeholder="buyer@example.com" />
          <span className="text-xs text-red-600">{form.formState.errors.email?.message}</span>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Phone
          <Input {...form.register("phone")} placeholder="+91..." />
          <span className="text-xs text-red-600">{form.formState.errors.phone?.message}</span>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Inquiry
          <Select {...form.register("inquiryType")}>
            <option>Product Inquiry</option>
            <option>Bulk Order</option>
            <option>Dealer Registration</option>
            <option>Distributor Inquiry</option>
            <option>Export Inquiry</option>
            <option>Private Label Inquiry</option>
          </Select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-brand-forest">
          Quantity kg
          <Input {...form.register("quantity", { valueAsNumber: true })} type="number" min={1} />
          <span className="text-xs text-red-600">{form.formState.errors.quantity?.message}</span>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-brand-forest">
        Message
        <Textarea {...form.register("message")} placeholder="Tell us the tea category, grade, destination, packaging, or timeline you need." />
        <span className="text-xs text-red-600">{form.formState.errors.message?.message}</span>
      </label>
      <Button type="submit" variant="gold" size="lg">
        <Send className="h-4 w-4" />
        Send To WhatsApp & Email
      </Button>
      {submitNote ? <p className="text-sm font-medium text-brand-forest">{submitNote}</p> : null}
    </form>
  );
}
