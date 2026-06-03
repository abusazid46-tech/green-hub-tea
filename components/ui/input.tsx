import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-brand-forest/15 bg-white px-3 text-sm text-brand-dark outline-none transition placeholder:text-brand-dark/40 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
