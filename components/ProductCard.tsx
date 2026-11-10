import Link from "next/link";
import { formatF } from "@/lib/format";
import type { ProductItem } from "@/lib/catalog";

export default function ProductCard({
  p,
  offset = false,
}: {
  p: ProductItem;
  offset?: boolean;
}) {
  const promo = p.isOnPromotion && p.promoPriceFCFA != null;
  const oldPrice = p.originalPriceFCFA ?? p.priceFCFA;

  return (
    <Link
      href={`/product/${p.id}`}
      className={`flex flex-col overflow-hidden rounded-lg border border-line bg-white ${
        offset ? "max-sm:mt-3.5" : ""
      }`}
    >
      <div className="relative aspect-[4/5] bg-surface">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-line">
            🖼️
          </div>
        )}
        {p.hasVideo && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-black/65 px-2 py-0.5 text-[10px] font-bold text-white">
            ▶ Vidéo
          </span>
        )}
      </div>

      <div className="p-2">
        <p className="truncate text-[11px] font-bold text-ink">{p.title}</p>

        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="text-[13px] font-black text-price">
            {formatF(promo ? (p.promoPriceFCFA as number) : p.priceFCFA)}
          </span>
          {promo && (
            <span className="text-[11px] text-muted line-through">
              {formatF(oldPrice)}
            </span>
          )}
        </div>

        {p.allowTranche && (
          <span className="mt-1 inline-block rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">
            ⚡ Paiement en tranches
          </span>
        )}

        {p.marketName && (
          <p className="mt-1 line-clamp-2 text-[10px] text-muted">
            📍 {p.marketName}
          </p>
        )}
      </div>
    </Link>
  );
}