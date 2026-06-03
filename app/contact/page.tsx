import { Mail, MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/commerce/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { brand } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact Green Hub",
  "Contact Green Hub Assam Tea in Guwahati for retail, wholesale, bulk, distributor, and export inquiries.",
  "/contact"
);

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading align="left" eyebrow="Contact" title="Talk to Green Hub about premium Assam tea supply." />
          <div className="mt-8 grid gap-4">
            <Card><CardContent className="flex gap-4"><Phone className="h-5 w-5 text-brand-gold" /><a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-forest">{brand.phone}</a></CardContent></Card>
            <Card><CardContent className="flex gap-4"><Mail className="h-5 w-5 text-brand-gold" /><a href={`mailto:${brand.email}`} className="font-semibold text-brand-forest">{brand.email}</a></CardContent></Card>
            <Card><CardContent className="flex gap-4"><MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-gold" /><p className="font-semibold text-brand-forest">{brand.address}</p></CardContent></Card>
          </div>
        </div>
        <Card>
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Send Inquiry</h2>
            <div className="mt-6">
              <InquiryForm mode="Contact" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
