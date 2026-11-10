import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import ProductCard from "@/components/ProductCard";
import { getCategories, getMarkets, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Recherche" };

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export default function SearchPage(props: PageProps<"/search">) {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent searchParams={props.searchParams} />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <div className="mx-auto max-w-5xl px-2 py-2 sm:px-4 sm:py-6">
      <h1 className="text-xl font-extrabold sm:text-2xl">Recherche</h1>
      <div className="mt-2 h-11 animate-pulse rounded-full bg-brand-soft sm:mt-4" />
      <div className="mt-3 grid grid-cols-2 gap-1 sm:mt-4 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

async function SearchContent({
  searchParams,
}: {
  searchParams: PageProps<"/search">["searchParams"];
}) {
  const sp = await searchParams;
  const q = first(sp.q) ?? "";
  const cat = first(sp.cat) ?? "";
  const market = first(sp.market) ?? "";
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  const [categories, markets, { products, hasMore }] = await Promise.all([
    getCategories(),
    getMarkets(),
    searchProducts({ q, cat, market, page }),
  ]);

  const href = (p: number) => {
    const u = new URLSearchParams();
    if (q) u.set("q", q);
    if (cat) u.set("cat", cat);
    if (market) u.set("market", market);
    if (p > 1) u.set("page", String(p));
    const s = u.toString();
    return s ? `/search?${s}` : "/search";
  };

  return (
    <div className="mx-auto max-w-5xl px-2 py-2 sm:px-4 sm:py-6">
      <h1 className="text-xl font-extrabold sm:text-2xl">Recherche</h1>

      <div className="mt-2 sm:mt-4">
        <SearchBar defaultValue={q} />
      </div>

      <form action="/search" method="get" className="mt-2 flex gap-1 sm:mt-3 sm:gap-2">
        {q && <input type="hidden" name="q" value={q} />}
        {cat && <input type="hidden" name="cat" value={cat} />}
        <select
          name="market"
          defaultValue={market}
          className="h-10 min-w-0 flex-1 rounded-full border border-line bg-white px-3 text-sm"
        >
          <option value="">Tous les marchés</option>
          {markets.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 rounded-full bg-brand-soft px-4 text-sm font-bold text-brand-dark"
        >
          Filtrer
        </button>
      </form>

      <div className="mt-3 sm:mt-4">
        <CategoryChips categories={categories} activeId={cat} />
      </div>

      {products.length === 0 ? (
        <p className="mt-10 text-center text-muted">
          Aucun produit trouvé. Essaie un autre mot ou un autre marché.
        </p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-1 sm:mt-4 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {(page > 1 || hasMore) && (
        <div className="mt-4 flex justify-between text-sm font-bold sm:mt-6">
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
    </div>
  );
}