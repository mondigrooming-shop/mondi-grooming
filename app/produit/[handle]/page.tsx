import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import { ProductDetail } from "@/components/ProductDetail";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/boutique" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} />
            Boutique
          </Link>
        </div>
      </div>

      <ProductDetail product={product} />
    </div>
  );
}
