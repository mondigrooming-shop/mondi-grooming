import Link from "next/link";
import { getAllProducts, type ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_GROUPS } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const params = await searchParams;
  const cat = params?.cat;

  let products: ShopifyProduct[] = [];
  try {
    products = await getAllProducts();
  } catch (e) {
    console.error("Failed to fetch products:", e);
  }

  // Filter by category if specified
  const filtered = cat
    ? products.filter((p) => {
        const productType = p.productType.toLowerCase();
        const tags = p.tags.map((t) => t.toLowerCase());
        return productType.includes(cat) || tags.some((t) => t.includes(cat));
      })
    : products;

  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <section className="border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} />
            Accueil
          </Link>
          <p className="eyebrow mb-2">Boutique</p>
          <h1 className="font-serif text-4xl sm:text-5xl">
            {cat ? CATEGORY_GROUPS.find((g) => g.key === cat)?.label || "Boutique" : "Tous les soins"}
          </h1>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            {cat
              ? CATEGORY_GROUPS.find((g) => g.key === cat)?.blurb
              : "Découvrez notre collection de soins d'exception, pensés à Montréal."}
          </p>
        </div>
      </section>

      {/* Category filter pills */}
      <section className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/boutique"
            className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
              !cat ? "border-primary bg-primary text-primary-foreground" : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Tout
          </Link>
          {CATEGORY_GROUPS.map((g) => (
            <Link
              key={g.key}
              href={`/boutique?cat=${g.key}`}
              className={`rounded-full border px-4 py-1.5 text-xs transition-colors ${
                cat === g.key ? "border-primary bg-primary text-primary-foreground" : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {products.length === 0
                ? "Aucun produit pour le moment. Ajoutez des produits dans Shopify pour les voir apparaître ici."
                : "Aucun produit dans cette catégorie."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
