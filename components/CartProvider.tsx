"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { createCart, addToCart, getCart, removeFromCart, type ShopifyCart } from "@/lib/shopify";

interface CartContextValue {
  cartId: string | null;
  cart: ShopifyCart | null;
  count: number;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      if (cartId) {
        const updated = await addToCart(cartId, variantId, quantity);
        setCart(updated);
      } else {
        const newCart = await createCart(variantId, quantity);
        setCartId(newCart.id);
        setCart(newCart);
      }
      setIsOpen(true);
    } catch (e) {
      console.error("Failed to add to cart:", e);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cartId) return;
    setIsLoading(true);
    try {
      const updated = await removeFromCart(cartId, [lineId]);
      setCart(updated);
    } catch (e) {
      console.error("Failed to remove from cart:", e);
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }, [cart]);

  const count = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider value={{ cartId, cart, count, isOpen, isLoading, openCart, closeCart, addItem, removeItem, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
