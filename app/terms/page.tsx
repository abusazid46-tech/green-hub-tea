import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Terms", "Terms of use for Green Hub Assam Tea.", "/terms");

export default function TermsPage() {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x max-w-3xl">
        <h1 className="font-display text-5xl text-brand-forest">Terms</h1>
        <div className="mt-8 grid gap-5 text-base leading-8 text-brand-dark/68">
          <p>Product availability, grades, packaging, sample pricing, bulk pricing, and export terms are confirmed directly by Green Hub before order acceptance.</p>
          <p>Website product prices are sample-facing placeholders for ecommerce presentation and may vary by grade, quantity, packaging, destination, and market conditions.</p>
          <p>Wholesale, private label, distributor, and export orders may require additional documentation, payment confirmation, and shipment coordination.</p>
        </div>
      </div>
    </section>
  );
}
