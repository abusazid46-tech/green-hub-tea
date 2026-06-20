import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { brand, products } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative h-14 w-14 overflow-hidden rounded-md border border-white/15 bg-white">
              <Image src="/brand/greenhub-logo.webp" alt="Green Hub logo" fill sizes="56px" className="object-cover" />
            </span>
            <p className="font-display text-3xl leading-none">Green Hub Assam Tea</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">
            Premium Assam tea supplier and manufacturer from Guwahati, serving retail, wholesale, hospitality, distributor, and export buyers.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-brand-accent">GST {brand.gst}</p>
        </div>

        <div>
          <p className="font-semibold text-brand-accent">Pages</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            {["About", "Shop", "Wholesale", "Export", "Blog", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-white">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-brand-accent">Teas</p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            {products.slice(0, 5).map((item) => (
              <Link key={item.slug} href={`/product/${item.slug}`} className="hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-brand-accent">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <span className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{brand.address}</span>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex gap-2 hover:text-white"><Phone className="h-4 w-4" />{brand.phone}</a>
            <a href={`mailto:${brand.email}`} className="flex gap-2 hover:text-white"><Mail className="h-4 w-4" />{brand.email}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Green Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/shipping-policy" className="hover:text-white">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
