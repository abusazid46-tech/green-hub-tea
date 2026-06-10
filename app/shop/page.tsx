import { ShopGrid } from "@/components/commerce/shop-grid";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/seo";
import { getStoreProducts } from "@/lib/supabase/products";

export const revalidate = 60;

export const metadata = pageMetadata(
  "Shop Premium Assam Tea",
  "Shop Green Hub Assam Orthodox Tea, Assam Black Tea, Assam Green Tea, Black Tea BOPSM, and Black Tea Dust Powder.",
  "/shop"
);

export default async function ShopPage() {
  const products = await getStoreProducts();

  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x">
        <SectionHeading
          eyebrow="Shop Collection"
          title="Premium Assam tea for retail shelves, cafes, hotels, and serious daily drinkers."
          text="Filter by tea type, price, category, and popularity. Product inquiries route directly to WhatsApp for fast buying conversations."
        />
        <div className="mt-12">
          <ShopGrid products={products} />
        </div>
      </div>
    </section>
  );
}
