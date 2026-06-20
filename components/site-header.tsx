"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/home", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/export", label: "Export" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-brand-forest/85 text-white backdrop-blur-xl">
      <div className="container-x flex h-18 items-center justify-between">
        <Link href="/home" className="flex items-center gap-3">
          <span className="relative h-12 w-12 overflow-hidden rounded-md border border-white/20 bg-white shadow-gold">
            <Image src="/brand/greenhub-logo.webp" alt="Green Hub logo" fill sizes="48px" className="object-cover" priority />
          </span>
          <span>
            <span className="block font-display text-xl leading-none">Green Hub</span>
            <span className="text-xs uppercase tracking-[0.28em] text-brand-accent">Assam Tea</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-white/12 text-brand-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/shop">
            <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20">
              <ShoppingBag className="h-4 w-4" aria-hidden />
              Collection
            </Button>
          </Link>
          <Link href="/wholesale">
            <Button variant="gold">Inquiry</Button>
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-white/20 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/12 bg-brand-forest lg:hidden">
          <div className="container-x grid gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
