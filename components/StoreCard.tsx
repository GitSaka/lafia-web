import Link from "next/link";
import type { StoreItem } from "@/lib/catalog";

export default function StoreCard({ s }: { s: StoreItem }) {
  return (
    <Link
      href={`/store/${s.id}`}
      className="flex w-36 shrink-0 flex-col items-center rounded-2xl border border-line bg-white p-3 text-center"
    >
      <div className="h-14 w-14 overflow-hidden rounded-full bg-brand-soft">
        {s.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={s.image}
            alt={s.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xl font-bold text-brand-dark">
            {s.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-xs font-bold leading-tight">
        {s.name}
      </p>
      {s.rating != null && (
        <p className="mt-1 text-xs text-muted">
          ★ {s.rating.toFixed(1)} · {s.reviewsCount}
        </p>
      )}
      {s.marketName && (
        <p className="mt-0.5 line-clamp-1 text-xs text-muted">{s.marketName}</p>
      )}
    </Link>
  );
}