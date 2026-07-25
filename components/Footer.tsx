"use client";

import Link from "next/link";
import { LogoMark } from "./Logo";
import { scrollToId } from "@/lib/shopify";

export function Footer() {
  const goToHomeSection = (id: string) => {
    scrollToId(id);
  };

  return (
    <footer id="contact" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <LogoMark className="h-8 w-8 text-foreground" />
              <span className="font-serif text-lg">
                Mondi<span className="text-bronze-gradient"> Grooming</span>
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              L'art du soin masculin. Des formules d'exception, pensées à Montréal pour la barbe, le cheveu et la peau.
            </p>
            <p className="text-xs text-muted-foreground/70">Conçu pour hommes, femmes et enfants.</p>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Boutique</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/boutique" className="hover:text-foreground transition-colors">Tous les soins</Link></li>
              <li><Link href="/boutique?cat=barbe" className="hover:text-foreground transition-colors">La barbe</Link></li>
              <li><Link href="/boutique?cat=cheveux" className="hover:text-foreground transition-colors">Le cheveu</Link></li>
              <li><Link href="/boutique?cat=accessoires" className="hover:text-foreground transition-colors">Les accessoires</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Maison</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={() => goToHomeSection("maison")} className="hover:text-foreground transition-colors">Notre histoire</button></li>
              <li><button onClick={() => goToHomeSection("rituels")} className="hover:text-foreground transition-colors">Les rituels</button></li>
              <li><button onClick={() => goToHomeSection("faq")} className="hover:text-foreground transition-colors">FAQ</button></li>
              <li className="hover:text-foreground transition-colors">contact@mondigrooming.ca</li>
              <li>Montréal, Québec</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Mondi Grooming. Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            <span>Fait à Montréal</span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            <span>Paiement sécurisé</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
