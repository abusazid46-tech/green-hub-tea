import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded-md border border-brand-forest/15 bg-white px-3 py-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-dark/40 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
