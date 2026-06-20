import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Globe2, Leaf, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { ProductCard } from "@/components/commerce/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { aboutStats, blogPosts, buyerTypes, heroImage, highlights, testimonials, whyChoose } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { getStoreProducts } from "@/lib/supabase/products";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

export const metadata = pageMetadata(
  "Green Hub Assam Tea",
  "Premium Assam tea supplier and manufacturer from Guwahati for retail, wholesale, distributors, hotels, cafes, and export buyers.",
  "/home"
);

export default async function HomePage() {
  const products = await getStoreProducts();

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-brand-dark pt-24 text-white">
        <Image src={heroImage} alt="Lush Assam tea plantation" fill priority sizes="100vw" className="object-cover object-[62%_center] opacity-60 saturate-125" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-forest/72 to-brand-dark/22" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.16),rgba(15,61,46,0.18))]" />
        <div className="container-x relative z-10 grid min-h-[calc(92vh-96px)] items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionReveal>
            <Badge className="border-white/30 bg-white/12 text-brand-accent">Premium Assam Tea Supplier</Badge>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-balance md:text-7xl">
              From The Finest Tea Gardens Of Assam To The World
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              Premium Assam Tea crafted for connoisseurs, retailers, hotels, cafes, distributors, and global buyers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg" variant="gold">
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/wholesale">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/18">
                  Wholesale Inquiry
                </Button>
              </Link>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.18} className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.label} className="glass rounded-lg p-5">
                <item.icon className="h-6 w-6 text-brand-accent" />
                <p className="mt-5 font-display text-3xl">{item.value}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.16em] text-white/62">{item.label}</p>
              </div>
            ))}
          </MotionReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Green Hub"
              title="A trusted Guwahati supplier for premium Assam tea."
              text="Green Hub supplies Assam Tea, CTC Tea, Black Tea, and Assam Gold Orthodox Tea in bulk and loose quantities for traders, retailers, distributors, and business buyers across India."
            />
            <Link href="/about" className="mt-7 inline-flex text-sm font-bold text-brand-forest underline decoration-brand-gold underline-offset-4">
              Read Our Story
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutStats.map((item) => (
              <Card key={item.label}>
                <CardContent>
                  <p className="font-display text-3xl text-brand-forest">{item.value}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-dark/48">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured Tea Collection"
            title="Five Assam signatures, curated for premium retail and serious trade buyers."
            text="Every listing reflects Green Hub's current tea categories, rewritten into luxury product language without losing the real specifications buyers need."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <MotionReveal key={product.slug}>
                <ProductCard product={product} />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Why Choose Green Hub" title="Built for buyers who care about flavor, reliability, and supply discipline." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <MotionReveal key={item.title}>
                <Card className="h-full">
                  <CardContent>
                    <div className="grid h-12 w-12 place-items-center rounded-md bg-brand-forest text-brand-accent">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl text-brand-forest">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-brand-dark/64">{item.text}</p>
                  </CardContent>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-dark py-24 text-white">
        <Image
          src="https://images.unsplash.com/photo-1523920290228-4f321a939b4c?auto=format&fit=crop&w=1600&q=82"
          alt="Tea processing and heritage"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
          data-parallax
        />
        <div className="container-x relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1100&q=82" alt="Premium brewed Assam tea" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <MotionReveal>
            <Badge className="border-white/30 bg-white/12 text-brand-accent">Assam Tea Story</Badge>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">A heritage cup with the confidence of modern trade.</h2>
            <p className="mt-6 text-lg leading-8 text-white/72">
              Assam&apos;s tropical climate, river valley soils, and generations of tea craft produce a cup known for depth, briskness, and malty power. Green Hub brings that heritage into a supplier model shaped for Pan India distribution and export conversations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Assam Heritage", "Traditional Processing", "Global Recognition"].map((item) => (
                <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-4 text-sm font-semibold text-brand-accent">
                  {item}
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <SectionHeading align="left" eyebrow="Wholesale & Export" title="For retailers, importers, cafes, hotels, and distribution partners." text="Request MOQ, bulk pricing, private label possibilities, product specifications, and shipment support from one focused inquiry flow." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/wholesale"><Button variant="gold" size="lg">Become A Tea Distribution Partner</Button></Link>
              <a href={whatsappLink("Hello Green Hub, I want to discuss bulk or export Assam tea supply.")} target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg"><MessageCircle className="h-4 w-4" />WhatsApp</Button>
              </a>
            </div>
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {buyerTypes.map((item) => (
              <Card key={item.label}>
                <CardContent className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-brand-forest text-brand-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-brand-forest">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Testimonials" title="Premium buyers need a supplier who answers fast and ships clean." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="glass rounded-lg border-brand-forest/10 bg-brand-forest/7 p-6">
                <p className="font-display text-5xl text-brand-gold">&quot;</p>
                <p className="text-sm leading-7 text-brand-dark/70">{item.quote}</p>
                <p className="mt-5 font-semibold text-brand-forest">{item.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-dark/45">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x">
          <SectionHeading eyebrow="Tea Knowledge Center" title="Useful reading for customers and trade partners." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {blogPosts.map((post) => (
              <Link key={post.slug} href="/blog" className="rounded-lg border border-brand-forest/10 bg-white p-5 shadow-luxury transition hover:-translate-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">{post.minutes}</p>
                <h3 className="mt-4 font-display text-xl leading-tight text-brand-forest">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-dark/60">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tea-radial py-16 text-white">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-4xl">Ready to source premium Assam tea?</p>
            <p className="mt-2 text-white/70">Call, email, or WhatsApp Green Hub for retail, wholesale, and export inquiries.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink("Hello Green Hub, I want premium Assam tea details.")} target="_blank" rel="noreferrer"><Button variant="gold">WhatsApp</Button></a>
            <Link href="/contact"><Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/20">Email / Call</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
