import Link from "next/link";
import { getAllProducts, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { FAQAccordion } from "@/components/FAQ";
import { CATEGORY_GROUPS, VALUES, TESTIMONIALS, FAQS, RITUALS } from "@/lib/content";
import { ShoppingBag, Sparkles, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    products = await getAllProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : "Erreur de connexion à Shopify";
  }

  // Pick first product as featured/best value
  const featuredProducts = products.slice(0, 4);
  const bestValue = products[0];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-card to-background" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 28% 22%, hsl(38 50% 58% / 0.20) 0, transparent 45%), radial-gradient(circle at 82% 82%, hsl(37 52% 40% / 0.14) 0, transparent 50%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-28 lg:px-8">
          <div>
            <p className="eyebrow mb-4">Pensé à Montréal · Cruelty-free</p>
            <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              L'art du soin
              <br />
              <span className="text-bronze-gradient italic">masculin</span>
            </h1>
            <p className="mt-6 max-w-md text-sm text-muted-foreground sm:text-base">
              Des formules d'exception pour la barbe, le cheveu et la peau.
              Pensées pour les cheveux texturés et les peaux sèches. Ingrédients
              d'origine naturelle, vegan friendly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/boutique"
                className="btn-premium inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
              >
                <ShoppingBag size={16} />
                Découvrir la collection
              </Link>
              <a
                href="#rituels"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Les rituels
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <StarRating rating={4.9} size={14} />
                <span className="text-xs text-muted-foreground">4.9 · 128+ avis</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <p className="text-xs text-muted-foreground">Livraison offerte dès 75 $</p>
            </div>
          </div>
          {bestValue && (
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-border/60 bronze-glow">
                {bestValue.featuredImage ? (
                  <img
                    src={bestValue.featuredImage.url}
                    alt={bestValue.featuredImage.altText || bestValue.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-card">
                    <span className="font-serif text-6xl text-bronze-gradient">{bestValue.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-border/60 bg-card p-4 shadow-lg sm:-left-6">
                <p className="eyebrow text-[10px]">Signature</p>
                <p className="font-serif text-base">{bestValue.title}</p>
                <p className="text-sm font-medium text-primary">
                  {formatPrice(bestValue.priceRange.minVariantPrice.amount, bestValue.priceRange.minVariantPrice.currencyCode)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TRUST MARKERS */}
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border/60 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { label: "Ingrédients naturels", icon: "leaf" },
            { label: "Cruelty-free & vegan", icon: "shield" },
            { label: "Fait à Montréal", icon: "map" },
            { label: "Livraison 2-5 jours", icon: "truck" },
          ].map((m) => (
            <div key={m.label} className="px-4 py-5 text-center">
              <p className="text-xs text-muted-foreground sm:text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="collection" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">Notre collection</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Quatre familles de soins</h2>
        </div>
        <Reveal variant="scale" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_GROUPS.map(({ key, label, blurb, icon: Icon }) => (
            <Link
              key={key}
              href={`/boutique?cat=${key}`}
              className="group rounded-xl border border-border/60 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:bronze-glow hover:border-primary/30"
            >
              <div className="mb-5 inline-flex rounded-full border border-primary/30 bg-accent p-3 text-primary">
                <Icon size={22} />
              </div>
              <h3 className="font-serif text-xl">{label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs text-bronze-gradient">
                Décourir
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">Sélection</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Soins d'exception</h2>
        </div>
        {error ? (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
            <p className="text-sm text-muted-foreground">Impossible de charger les produits depuis Shopify.</p>
            <p className="mt-2 text-xs text-muted-foreground/70">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">Aucun produit pour le moment. Ajoutez des produits dans Shopify pour les voir apparaître ici.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Voir tous les soins
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Notre promesse</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Pourquoi Mondi</h2>
          </div>
          <Reveal variant="scale" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="space-y-3">
                <div className="inline-flex rounded-full border border-primary/30 bg-accent p-3 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* RITUALS */}
      <section id="rituels" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">Le rituel</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Trois gestes, un résultat</h2>
        </div>
        <Reveal variant="scale" className="grid gap-8 md:grid-cols-3">
          {RITUALS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="relative rounded-md border border-border/60 bg-background p-8">
              <span className="absolute right-6 top-6 font-serif text-3xl text-muted-foreground/20">{step}</span>
              <div className="mb-5 inline-flex rounded-full border border-primary/30 bg-accent p-3 text-primary">
                <Icon size={22} />
              </div>
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">Ils nous font confiance</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Avis clients</h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating rating={4.9} size={16} />
            <span className="text-sm text-muted-foreground">4.9 · 128+ avis vérifiés</span>
          </div>
        </div>
        <Reveal variant="scale" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-lg border border-border/60 bg-card p-7">
              <StarRating rating={t.rating} size={14} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">« {t.quote} »</blockquote>
              <figcaption className="mt-5">
                <p className="font-serif text-base">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </section>

      {/* MAISON */}
      <section id="maison" className="overflow-hidden border-y border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl items-center gap-0 px-4 py-0 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="py-16 lg:pr-12">
            <p className="eyebrow mb-3">La maison</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Né à Montréal,
              <br />
              <span className="text-bronze-gradient italic">par passion</span>
            </h2>
            <p className="mt-6 text-sm text-muted-foreground sm:text-base">
              Mondi Grooming est né d'une obsession : créer des soins qui ne
              sacrifient jamais l'efficacité à l'esthétique. Pensées à Montréal,
              nos formules répondent aux besoins réels du cheveu texturé et de la
              peau sèche, avec des ingrédients d'origine naturelle sélectionnés
              pour leur performance.
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              De l'huile à barbe au peigne de santal, chaque produit est un objet
              que l'on garde. Pour les hommes, les femmes et les enfants qui
              voient dans le soin un art de vivre.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="font-serif text-3xl text-bronze-gradient">12+</p>
                <p className="text-xs text-muted-foreground">soins d'exception</p>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <p className="font-serif text-3xl text-bronze-gradient">4.9</p>
                <p className="text-xs text-muted-foreground">note moyenne</p>
              </div>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden lg:h-[36rem]">
            <div className="absolute inset-0 bg-gradient-to-br from-accent via-card to-background" />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 28% 22%, hsl(38 50% 58% / 0.20) 0, transparent 45%), radial-gradient(circle at 82% 82%, hsl(37 52% 40% / 0.14) 0, transparent 50%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <p className="max-w-sm text-center font-serif text-2xl italic leading-snug text-muted-foreground sm:text-3xl">
                « Le soin n'est pas un détail. C'est une signature. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">On vous éclaire</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Questions fréquentes</h2>
        </div>
        <FAQAccordion items={FAQS} />
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Une autre question ?</p>
          <a href="mailto:contact@mondigrooming.ca" className="mt-2 inline-block font-serif text-lg text-bronze-gradient hover:underline">
            contact@mondigrooming.ca
          </a>
        </div>
      </section>

      {/* CTA */}
      {bestValue && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-accent to-card p-10 sm:p-14">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative max-w-xl">
              <p className="eyebrow mb-3">Rituel sur mesure</p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Composez votre rituel</h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Trois gestes, une routine. Commencez par notre signature —{" "}
                <span className="text-foreground">{bestValue.title}</span> à{" "}
                <span className="text-foreground">
                  {formatPrice(bestValue.priceRange.minVariantPrice.amount, bestValue.priceRange.minVariantPrice.currencyCode)}
                </span>{" "}
                — et bâtissez le rituel qui vous ressemble.
              </p>
              <Link
                href="/boutique"
                className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Construire mon rituel
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
