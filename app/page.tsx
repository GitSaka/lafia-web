import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import StoreCard from "@/components/StoreCard";
import ProductCard from "@/components/ProductCard";
import { getCategories, getTopStores, searchProducts } from "@/lib/catalog";

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export default function Home(props: PageProps<"/">) {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeContent searchParams={props.searchParams} />
    </Suspense>
  );
}

function HomeFallback() {
  return (
    <div className="mx-auto max-w-5xl px-2 py-4">
      <div className="h-11 animate-pulse rounded-xl bg-brand-softer" />
      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="aspect-square animate-pulse rounded-2xl bg-brand-softer" />
        ))}
      </div>
    </div>
  );
}

async function HomeContent({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"];
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const [categories, stores, { products, hasMore }] = await Promise.all([
    getCategories(),
    getTopStores(8),
    searchProducts({ page }),
  ]);

  const href = (p: number) => {
    return p > 1 ? `/?page=${p}` : `/`;
  };

  return (
    <div className="mx-auto max-w-5xl px-2 py-2 sm:px-4 sm:py-4">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm">
        <p className="min-w-0 truncate text-sm">
          <span className="font-bold">Lafia Shop</span>
          <span className="text-muted">
            {" "}
            — Les marchés du Bénin, près de chez toi.
          </span>
        </p>
        <Link
          href="/download"
          className="shrink-0 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white"
        >
          Télécharger →
        </Link>
      </div>

     <div className="mt-2 sm:mt-4">
        <SearchBar />
      </div>

      {categories.length > 0 && (
        <section className="mt-3 sm:mt-6">
          <h2 className="mb-3 text-base font-bold">Catégories</h2>
          <CategoryChips categories={categories} />
        </section>
      )}

      {stores.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-1.5 sm:mb-3  text-base font-bold">Top boutiques</h2>
          <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:-mx-4 sm:px-4">
            {stores.map((s) => (
              <StoreCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">Produits récents</h2>
          <Link href="/search" className="text-sm font-semibold text-brand">
            Voir tout ›
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="py-10 text-center text-muted">
            Aucun produit pour le moment.
          </p>
        ) : (
          // APRÈS - Mobile = 4px, PC = pareil qu'avant
            <div className="grid grid-cols-2 gap-1 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {(page > 1 || hasMore) && (
          <div className="mt-6 flex justify-between text-sm font-bold">
            {page > 1 ? (
              <Link href={href(page - 1)} className="text-brand underline">
                ← Page précédente
              </Link>
            ) : (
              <span />
            )}
            {hasMore && (
              <Link href={href(page + 1)} className="text-brand underline">
                Page suivante →
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}