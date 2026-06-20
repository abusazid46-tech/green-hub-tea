import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle2, Globe2, Quote, ShieldCheck, Truck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { aboutStats, brand, missionVision, testimonials, whyChoose } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export const metadata = pageMetadata(
  "About Green Hub Assam Tea Supplier",
  "About Green Hub, a trusted wholesale supplier of premium Assam Tea, CTC Tea, Black Tea, and Assam Gold Orthodox Tea based in Guwahati.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark pt-32 text-white section-padding">
        <Image
          src="https://images.pexels.com/photos/36906757/pexels-photo-36906757.jpeg?auto=compress&cs=tinysrgb&w=1800&h=1200&fit=crop"
          alt="Assam tea garden landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/96 via-brand-forest/78 to-brand-dark/35" />
        <div className="container-x relative z-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <Badge className="border-white/30 bg-white/12 text-brand-accent">Established {brand.founded}</Badge>
            <h1 className="mt-6 max-w-4xl font-display text-5xl leading-tight md:text-7xl">About Green Hub</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">
              Green Hub is a trusted wholesale supplier of premium Assam tea, offering Assam Tea, CTC Tea, Black Tea,
              and Assam Gold Orthodox Tea for traders, retailers, distributors, and businesses across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg" variant="gold">Explore Products</Button>
              </Link>
              <a href={whatsappLink("Hello Green Hub, I want wholesale Assam tea details.")} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/18">Wholesale Inquiry</Button>
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {aboutStats.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/15 bg-white/12 p-5 backdrop-blur">
                <p className="font-display text-3xl text-brand-accent">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/68">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=1200&q=82"
              alt="Fresh Assam tea leaves"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A Guwahati-based wholesale tea partner built on quality and trust."
              text="Based in Guwahati, Green Hub specializes in supplying premium tea in both bulk and loose quantities, giving customers flexible solutions for different business needs."
            />
            <div className="mt-7 grid gap-4 text-base leading-8 text-brand-dark/68">
              <p>
                Since our establishment in 2018, we have steadily expanded our presence by consistently delivering
                superior-quality products, reliable service, and customer satisfaction.
              </p>
              <p>
                Our focus on premium sourcing, high standards, and ethical business practices has helped Green Hub earn
                a reputation as a dependable partner in the tea industry.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Quality Assurance", icon: ShieldCheck },
                { label: "Nationwide Reach", icon: Truck },
                { label: "Trade Focused", icon: Award }
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-brand-forest/10 bg-white p-4 text-sm font-semibold text-brand-forest">
                  <item.icon className="mb-3 h-5 w-5 text-brand-gold" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Mission & Vision" title="Focused on authentic Assam taste and dependable trade relationships." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {missionVision.map((item) => (
              <Card key={item.title} className="h-full">
                <CardContent>
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-brand-forest text-brand-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl text-brand-forest">{item.title}</h2>
                  <p className="mt-4 text-base leading-8 text-brand-dark/68">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Choose Green Hub"
            title="Practical wholesale advantages for buyers who need consistency."
            text="Our service model is shaped around product quality, flexible supply, competitive pricing, and prompt support."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <Card key={item.title}>
                <CardContent>
                  <CheckCircle2 className="h-6 w-6 text-brand-gold" />
                  <h3 className="mt-4 font-display text-2xl text-brand-forest">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-dark/64">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Testimonials" title="Trusted by buyers who need reliable Assam tea supply." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name}>
                <CardContent>
                  <Quote className="h-6 w-6 text-brand-gold" />
                  <p className="mt-5 text-sm leading-7 text-brand-dark/70">{item.quote}</p>
                  <div className="mt-6 border-t border-brand-forest/10 pt-4">
                    <p className="font-semibold text-brand-forest">{item.name}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-dark/45">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tea-radial py-16 text-white">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-brand-accent">
              <Globe2 className="h-5 w-5" />
              <p className="text-sm font-bold uppercase tracking-[0.16em]">Wholesale Assam Tea</p>
            </div>
            <h2 className="mt-3 font-display text-4xl">Bring authentic Assam tea into your business.</h2>
          </div>
          <Link href="/contact">
            <Button variant="gold" size="lg">Contact Green Hub</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
