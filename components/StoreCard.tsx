import Link from "next/link";
import type { StoreItem } from "@/lib/catalog";

export default function StoreCard({ s }: { s: StoreItem }) {
  return (
    <Link
      href={`/store/${s.id}`}
      className="flex w-[105px] shrink-0 flex-col items-center rounded-2xl border border-line bg-white p-2.5 text-center"
    >
      <div className="h-14 w-14 overflow-hidden rounded-full border border-line bg-surface">
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
          <div className="flex h-full items-center justify-center text-xl font-bold text-brand">
            {s.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <p className="mt-1.5 w-full truncate text-[11px] font-bold">{s.name}</p>
      {s.rating != null && (
        <p className="mt-0.5 text-[10px] font-bold text-ink">
          <span className="text-amber-500">★</span> {s.rating.toFixed(1)}
        </p>
      )}
    </Link>
  );
}