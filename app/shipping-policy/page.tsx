import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Shipping Policy", "Shipping policy for Green Hub Assam Tea.", "/shipping-policy");

export default function ShippingPolicyPage() {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x max-w-3xl">
        <h1 className="font-display text-5xl text-brand-forest">Shipping Policy</h1>
        <div className="mt-8 grid gap-5 text-base leading-8 text-brand-dark/68">
          <p>Green Hub supports Pan India supply and worldwide export inquiries. Shipment timelines depend on product availability, order volume, packaging, and destination.</p>
          <p>Bulk orders, distributor shipments, and export consignments are confirmed after buyer communication through WhatsApp, email, or phone.</p>
          <p>For urgent hospitality or retail requirements, buyers should mention delivery city, quantity, and preferred dispatch timeline in the inquiry form.</p>
        </div>
      </div>
    </section>
  );
}
