"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "./CartProvider";
import { scrollToId } from "@/lib/shopify";

const NAV = [
  { label: "Boutique", href: "/boutique" },
  { label: "Collection", action: "collection" },
  { label: "Rituels", action: "rituels" },
  { label: "Maison", action: "maison" },
  { label: "FAQ", action: "faq" },
  { label: "Contact", action: "contact" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleNav = (action: string) => {
    setMobileOpen(false);
    scrollToId(action);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus:outline-none" aria-label="Mondi Grooming accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} onClick={() => handleNav(item.action!)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </button>
            )
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={openCart}
            aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
            className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/60 bg-background px-4 py-3 lg:hidden">
          {NAV.map((item) =>
            item.href ? (
              <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="block w-full py-3 text-left text-sm text-foreground">
                {item.label}
              </Link>
            ) : (
              <button key={item.label} onClick={() => handleNav(item.action!)} className="block w-full py-3 text-left text-sm text-foreground">
                {item.label}
              </button>
            )
          )}
        </nav>
      )}
    </header>
  );
}
