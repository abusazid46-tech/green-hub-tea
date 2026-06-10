"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Product } from "@/lib/data";

const categories = ["All", "Orthodox Tea", "Black Tea", "Green Tea", "CTC Tea", "Tea Dust"];

export function ShopGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [price, setPrice] = useState("all");

  const visibleProducts = useMemo(() => {
    let items = products.filter((item) => category === "All" || item.category === category);
    if (price === "under700") items = items.filter((item) => item.price < 700);
    if (price === "above700") items = items.filter((item) => item.price >= 700);
    if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "latest") items = [...items].reverse();
    if (sort === "popular") items = [...items].sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));
    return items;
  }, [category, price, products, sort]);

  return (
    <div>
      <div className="rounded-lg border border-brand-forest/10 bg-white p-4 shadow-luxury">
        <div className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto] md:items-center">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((item) => (
              <Button
                key={item}
                type="button"
                variant={category === item ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(item)}
                className="shrink-0"
              >
                {item}
              </Button>
            ))}
          </div>
          <Select aria-label="Price filter" value={price} onChange={(event) => setPrice(event.target.value)}>
            <option value="all">All Prices</option>
            <option value="under700">Under Rs 700/kg</option>
            <option value="above700">Rs 700+/kg</option>
          </Select>
          <Select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="popular">Popular</option>
            <option value="latest">Latest</option>
            <option value="low">Price Low To High</option>
            <option value="high">Price High To Low</option>
          </Select>
          <div className="hidden items-center gap-2 text-sm font-semibold text-brand-forest md:flex">
            <SlidersHorizontal className="h-4 w-4" />
            {visibleProducts.length} teas
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
