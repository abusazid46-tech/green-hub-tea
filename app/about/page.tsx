import Image from "next/image";
import { Award, Globe2, ShieldCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { brand } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Green Hub",
  "Learn about Green Hub, a Guwahati-based Assam tea supplier and manufacturer established in 2018.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <section className="bg-tea-radial pt-32 text-white section-padding">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-brand-accent">Established {brand.founded}</p>
            <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">A premium Assam supplier from Guwahati.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Green Hub professionally supplies and manufactures Assam tea, serving Pan India buyers and worldwide export inquiries with cost-effective products, quality checks, and on-time shipment.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=1200&q=82" alt="Assam tea leaves" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x">
          <SectionHeading eyebrow="Business Profile" title="Client-centric tea supply with a global ambition." text="The brand promise centers on aromatic, healthy, high-taste products, transparency, strict quality checks, and lasting buyer relationships." />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              { label: "Manufacturer & Supplier", icon: Award },
              { label: "Pan India Supply", icon: Truck },
              { label: "Export Inquiry Support", icon: Globe2 },
              { label: "FSSAI Certified Products", icon: ShieldCheck }
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="text-center">
                  <item.icon className="mx-auto h-7 w-7 text-brand-gold" />
                  <p className="mt-4 font-semibold text-brand-forest">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
