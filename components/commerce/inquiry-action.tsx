"use client";

import type { ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { whatsappLink } from "@/lib/utils";

type InquiryActionProps = {
  inquiryType: string;
  message: string;
  quantity?: number;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function InquiryAction({
  inquiryType,
  message,
  quantity = 1,
  children,
  className,
  ariaLabel,
  variant = "outline",
  size = "default"
}: InquiryActionProps) {
  async function saveInquiryAndOpen() {
    await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Website visitor",
        company: "Not provided",
        email: "website-visitor@greenhub.local",
        phone: "Not provided",
        inquiryType,
        quantity,
        message
      })
    }).catch(() => null);

    window.open(whatsappLink(message), "_blank", "noreferrer");
  }

  return (
    <Button type="button" variant={variant} size={size} className={className} aria-label={ariaLabel} onClick={saveInquiryAndOpen}>
      {children}
    </Button>
  );
}
