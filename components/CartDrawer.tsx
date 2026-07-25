"use client";

import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/shopify";

export function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, checkout, isLoading } = useCart();

  const lines = cart?.lines?.edges ?? [];
  const subtotal = lines.reduce((sum, edge) => {
    const amount = parseFloat(edge.node.merchandise.price.amount);
    return sum + amount * edge.node.quantity;
  }, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 className="font-serif text-lg flex items-center gap-2">
            <ShoppingBag size={18} />
            Panier {cart && `(${cart.totalQuantity})`}
          </h2>
          <button onClick={closeCart} aria-label="Fermer le panier" className="rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading && !lines.length ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={40} className="text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">Votre panier est vide</p>
              <button onClick={closeCart} className="mt-4 text-sm text-bronze-gradient hover:underline">
                Continuer mes achats
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map((edge) => {
                const line = edge.node;
                const img = line.merchandise.image?.url || line.merchandise.product.featuredImage?.url;
                return (
                  <li key={line.id} className="flex gap-3 border-b border-border/40 pb-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border/60 bg-accent">
                      {img && <img src={img} alt={line.merchandise.product.title} className="h-full w-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-serif text-sm leading-tight">{line.merchandise.product.title}</p>
                      <p className="text-xs text-muted-foreground">{line.merchandise.title}</p>
                      <p className="mt-1 text-sm font-medium">{formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)} × {line.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeItem(line.id)}
                      aria-label="Retirer l'article"
                      className="self-start rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border/60 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Sous-total</span>
              <span className="font-serif text-lg">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={checkout}
              className="btn-premium w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Passer la commande
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Paiement sécurisé via Shopify
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
