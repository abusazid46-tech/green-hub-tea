import { Globe2, Package, Plane, ShieldCheck } from "lucide-react";
import { InquiryForm } from "@/components/commerce/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Assam Tea Export Inquiry",
  "Export inquiry page for international buyers seeking premium Assam tea from Green Hub, Guwahati.",
  "/export"
);

export default function ExportPage() {
  return (
    <section className="min-h-screen bg-white pt-32 section-padding">
      <div className="container-x">
        <SectionHeading eyebrow="Export Ready" title="Premium Assam tea for international buyers and import partners." text="Green Hub supplies Pan India and supports worldwide export inquiries with clear product specs, buyer communication, and shipment-focused coordination." />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { label: "Global Inquiry", icon: Globe2 },
            { label: "Export Packing", icon: Package },
            { label: "Shipment Support", icon: Plane },
            { label: "FSSAI Products", icon: ShieldCheck }
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="text-center">
                <item.icon className="mx-auto h-7 w-7 text-brand-gold" />
                <p className="mt-4 font-semibold text-brand-forest">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mx-auto mt-10 max-w-3xl">
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Export Inquiry</h2>
            <div className="mt-6">
              <InquiryForm mode="Export" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
