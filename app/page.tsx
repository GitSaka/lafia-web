import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import MarketPicker from "@/components/MarketPicker";
import CategoryBoxes from "@/components/CategoryBoxes";
import StoreCard from "@/components/StoreCard";
import ProductCard from "@/components/ProductCard";
import {
  getCategories,
  getMarkets,
  getTopStores,
  searchProducts,
} from "@/lib/catalog";
import { buildUrl } from "@/lib/url";

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
          <div
            key={i}
            className="aspect-square animate-pulse rounded-2xl bg-brand-softer"
          />
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
  const cat = first(sp.cat) ?? "";
  const market = first(sp.market) ?? "";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const [categories, markets, stores, { products, hasMore }] =
    await Promise.all([
      getCategories(),
      getMarkets(),
      getTopStores(8, market),
      searchProducts({ cat, market, page }),
    ]);

  const href = (p: number) =>
    buildUrl("/", { cat, market, page: p > 1 ? String(p) : undefined });

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

      <div className="mt-2 sm:mt-4">
        <MarketPicker markets={markets} activeId={market} cat={cat} />
      </div>

      {categories.length > 0 && (
        <section className="mt-3 sm:mt-6">
          <h2 className="mb-3 text-base font-bold">Catégories</h2>
          <CategoryBoxes
            categories={categories}
            activeId={cat}
            market={market}
          />
        </section>
      )}

      {stores.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-1.5 text-base font-bold sm:mb-3">Top Vendeurs</h2>
          <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 sm:-mx-4 sm:px-4">
            {stores.map((s) => (
              <StoreCard key={s.id} s={s} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">Populaires au Bénin</h2>
          <Link href="/search" className="text-sm font-semibold text-brand">
            Voir tout ›
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="py-10 text-center text-muted">
            Aucun produit pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} p={p} offset={i % 2 === 1} />
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