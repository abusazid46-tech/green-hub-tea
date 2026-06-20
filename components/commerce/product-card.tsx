import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InquiryAction } from "@/components/commerce/inquiry-action";
import { Product } from "@/lib/data";
import { formatInr } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-forest">
          {product.category}
        </div>
      </div>
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-brand-forest">{product.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-dark/65">{product.short}</p>
          </div>
          <p className="whitespace-nowrap text-sm font-bold text-brand-ember">{formatInr(product.price)}/kg</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.benefits.slice(0, 3).map((benefit) => (
            <span key={benefit} className="rounded-full bg-brand-forest/7 px-3 py-1 text-xs font-medium text-brand-forest">
              {benefit}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <Link href={`/product/${product.slug}`} className="flex-1">
            <Button className="w-full" variant="gold">
              <ShoppingBag className="h-4 w-4" />
              Shop
            </Button>
          </Link>
          <InquiryAction
            inquiryType="Product WhatsApp Inquiry"
            message={`Hello Green Hub, I want to inquire about ${product.name}.`}
            variant="outline"
            size="icon"
            ariaLabel={`WhatsApp inquiry for ${product.name}`}
          >
            <MessageCircle className="h-4 w-4" />
          </InquiryAction>
          <Link href={`/product/${product.slug}`}>
            <Button variant="ghost" size="icon" aria-label={`View ${product.name}`}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
