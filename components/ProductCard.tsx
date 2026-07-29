"use client";

import Link from "next/link";
import { formatPrice, type ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const image = product.featuredImage?.url;
  const minPrice = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Link href={`/produit/${product.handle}`} className="group block focus:outline-none">
      <article className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:bronze-glow hover:border-primary/30">
        <div className="relative overflow-hidden">
          <div className="absolute left-3 top-3 z-10 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-medium text-primary-foreground">
            Précommande
          </div>
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
          <h3 className="font-serif text-base leading-snug text-foreground line-clamp-2">{product.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-primary">Précommande</span>
            <span className="font-sans text-base font-medium text-foreground">{formatPrice(minPrice, currency)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
