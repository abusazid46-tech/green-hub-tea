import { Calculator, Factory, PackageCheck, Store } from "lucide-react";
import { InquiryForm } from "@/components/commerce/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Wholesale Assam Tea Supplier India",
  "Wholesale Assam tea supplier for bulk CTC Tea, Black Tea, Orthodox Tea, dealer registration, distributors, and private label inquiries.",
  "/wholesale"
);

export default function WholesalePage() {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionHeading align="left" eyebrow="B2B Wholesale Portal" title="Bulk Assam tea supply for dealers, retailers, hotels, cafes, and distributors." text="Submit MOQ, bulk pricing, distributor application, and private label inquiries through WhatsApp and email." />
          <div className="mt-8 grid gap-4">
            {[
              { title: "MOQ Request", text: "Start with 25 kg sample trade requests or larger recurring supply.", icon: Calculator },
              { title: "Bulk Order", text: "Ask for CTC, orthodox, black, green, or dust tea availability.", icon: PackageCheck },
              { title: "Dealer Registration", text: "Register interest for city, state, or category distribution.", icon: Store },
              { title: "Private Label Inquiry", text: "Discuss packaging, grade selection, and buyer positioning.", icon: Factory }
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="flex gap-4">
                  <item.icon className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
                  <div>
                    <p className="font-semibold text-brand-forest">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-brand-dark/62">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Card>
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Wholesale Inquiry Form</h2>
            <p className="mt-2 text-sm leading-6 text-brand-dark/62">Form submissions generate pre-filled WhatsApp and email messages.</p>
            <div className="mt-6">
              <InquiryForm mode="Wholesale" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
