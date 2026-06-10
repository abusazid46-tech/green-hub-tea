import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, ShoppingCart, Zap } from "lucide-react";
import type { Metadata } from "next";
import { BrewingTimer } from "@/components/commerce/brewing-timer";
import { FlavorWheel } from "@/components/commerce/flavor-wheel";
import { StrengthMeter } from "@/components/commerce/strength-meter";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";
import { getStoreProductBySlug } from "@/lib/supabase/products";
import { formatInr, whatsappLink } from "@/lib/utils";
import { pageMetadata, productSchema } from "@/lib/seo";

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);
  if (!product) return pageMetadata("Product Not Found", "Green Hub Assam Tea product page.");
  return pageMetadata(product.name, product.description, `/product/${product.slug}`);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <JsonLd data={productSchema(product.slug)} />
      <div className="container-x grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-white shadow-luxury">
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.gallery.map((image) => (
              <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-brand-forest/10">
                <Image src={image} alt={`${product.name} gallery`} fill sizes="180px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">{product.category}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-brand-forest md:text-6xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-brand-dark/68">{product.description}</p>
          <p className="mt-6 font-display text-4xl text-brand-ember">{formatInr(product.price)}<span className="text-base font-sans text-brand-dark/55"> / kg sample price</span></p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={whatsappLink(`Hello Green Hub, I want to buy ${product.name}. Please share availability and pricing.`)} target="_blank" rel="noreferrer">
              <Button variant="gold" size="lg"><ShoppingCart className="h-4 w-4" />Buy Now</Button>
            </a>
            <a href={whatsappLink(`Hello Green Hub, I need bulk pricing for ${product.name}.`)} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg"><MessageCircle className="h-4 w-4" />WhatsApp Inquiry</Button>
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="rounded-lg bg-white p-4 text-sm font-semibold text-brand-forest shadow-luxury">
                <Check className="mb-2 h-4 w-4 text-brand-gold" />
                {benefit}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <StrengthMeter value={product.strength} />
          </div>
        </div>
      </div>

      <div className="container-x mt-12 grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Brewing Instructions</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {Object.entries(product.brew).map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-brand-forest/10 pb-2">
                  <span className="capitalize text-brand-dark/58">{label}</span>
                  <span className="font-semibold text-brand-forest">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <BrewingTimer time={product.brew.time} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Taste Notes</h2>
            <div className="mt-7">
              <FlavorWheel notes={product.notes} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-display text-3xl text-brand-forest">Specifications</h2>
            <div className="mt-5 grid gap-3 text-sm">
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 border-b border-brand-forest/10 pb-2">
                  <span className="text-brand-dark/58">{label}</span>
                  <span className="text-right font-semibold text-brand-forest">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-brand-forest p-4 text-white">
              <Zap className="h-5 w-5 text-brand-accent" />
              <p className="mt-3 text-sm leading-6 text-white/78">Wholesale, distributor, private label, and export inquiries are supported for this product.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container-x mt-10">
        <Link href="/shop" className="text-sm font-bold text-brand-forest underline decoration-brand-gold underline-offset-4">
          Back to shop
        </Link>
      </div>
    </section>
  );
}
