"use client";

import Link from "next/link";
import { StarRating } from "./StarRating";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.featuredImage?.url;
  const minPrice = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Link href={`/produit/${product.handle}`} className="group block focus:outline-none">
      <article className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:bronze-glow hover:border-primary/30">
        <div className="relative overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.featuredImage?.altText || product.title}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover img-ambient"
            />
          ) : (
            <div className="aspect-[3/4] w-full bg-gradient-to-br from-accent to-card flex items-center justify-center">
              <span className="font-serif text-4xl text-bronze-gradient">{product.title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="space-y-2 p-4 sm:p-5">
          <p className="eyebrow text-[10px]">{product.productType || product.vendor}</p>
          <h3 className="font-serif text-lg leading-snug text-foreground line-clamp-1">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <StarRating rating={5} size={12} />
            <span className="font-sans text-base font-medium text-foreground">{formatPrice(minPrice, currency)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
