"use client";

import { useState } from "react";
import { ShoppingBag, Check, Minus, Plus, Clock, Package, Shield, Truck } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatPrice, type ShopifyProduct, type ShopifyVariant } from "@/lib/shopify";

export function ProductDetail({ product }: { product: ShopifyProduct }) {
  const { addItem, isLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(
    product.variants.edges[0]?.node
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const images = [
    product.featuredImage,
    ...product.images.edges.map((e) => e.node),
  ].filter(Boolean);

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const price = selectedVariant?.price || product.priceRange.minVariantPrice;
  const compareAt = selectedVariant?.compareAtPrice;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border/60 bg-card">
            {images[activeImage] ? (
              <img
                src={images[activeImage]!.url}
                alt={images[activeImage]!.altText || product.title}
                className="h-full w-full object-cover gallery-fade"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-card">
                <span className="font-serif text-7xl text-bronze-gradient">{product.title.charAt(0)}</span>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square overflow-hidden rounded-lg border transition-all ${
                    activeImage === i ? "border-primary ring-2 ring-primary/20" : "border-border/60 hover:border-primary/30"
                  }`}
                >
                  <img src={img!.url} alt={img!.altText || product.title} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Pre-order banner */}
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
            <Clock size={16} className="text-primary shrink-0" />
            <p className="text-sm font-medium text-primary">
              Précommande — Expédition sous 2 à 3 semaines
            </p>
          </div>

          <div>
            <h1 className="font-serif text-3xl sm:text-4xl">{product.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.vendor}</p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl">{formatPrice(price.amount, price.currencyCode)}</span>
            {compareAt && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
            )}
          </div>

          <div className="luxe-divider" />

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Variants */}
          {product.variants.edges.length > 1 && (
            <div>
              <p className="eyebrow mb-3">
                {product.options[0]?.name || "Variantes"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map(({ node: variant }) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/60 text-foreground hover:border-primary/30"
                    }`}>
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <p className="eyebrow">Quantité</p>
            <div className="flex items-center rounded-lg border border-border/60">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Diminuer la quantité"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Augmenter la quantité"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="btn-premium flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {added ? (
              <>
                <Check size={18} />
                Précommande ajoutée
              </>
            ) : isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                <ShoppingBag size={18} />
                Précommander
              </>
            )}
          </button>

          {/* Shipping info */}
          <div className="space-y-3 rounded-xl border border-border/60 bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <Package size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Fabrication sur commande</p>
                <p className="text-xs text-muted-foreground">Chaque produit est fabriqué à la commande. Délai d'expédition : 2 à 3 semaines.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Paiement sécurisé</p>
                <p className="text-xs text-muted-foreground">Paiement chiffré via Shopify. Annulation possible avant expédition.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck size={16} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Livraison au Canada</p>
                <p className="text-xs text-muted-foreground">Livraison standard 3-5 jours · Gratuite dès 75 $ d'achat.</p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {[
              "Ingrédients d'origine naturelle",
              "Cruelty-free & vegan",
              "Fabriqué au Canada",
              "Livraison offerte dès 75 $",
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-7">
          <h3 className="font-serif text-xl mb-3">Bénéfices</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Nourrit et fortifie en profondeur</li>
            <li>• Pénètre sans laisser de résidu</li>
            <li>• Adapté aux cheveux texturés et peaux sèches</li>
            <li>• Ingrédients d'origine naturelle</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-7">
          <h3 className="font-serif text-xl mb-3">Ingrédients clés</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Huile de jojoba — hydratation profonde</li>
            <li>• Argan — nourrit et fortifie</li>
            <li>• Cire d'abeille — tenue protectrice</li>
            <li>• Vitamine E — antioxydant naturel</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-7">
          <h3 className="font-serif text-xl mb-3">Mode d'emploi</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Appliquer sur barbe ou cheveu propre et sec.</li>
            <li>2. Masser en mouvements circulaires.</li>
            <li>3. Peigner ou façonner selon votre style.</li>
            <li>4. Utiliser matin et soir pour un résultat optimal.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
