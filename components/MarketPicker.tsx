import Link from "next/link";
import type { Market } from "@/lib/catalog";
import { buildUrl } from "@/lib/url";

export default function MarketPicker({
  markets,
  activeId,
  cat,
}: {
  markets: Market[];
  activeId?: string;
  cat?: string;
}) {
  const active = markets.find((m) => m.id === activeId);
  return (
    <div className="flex items-center gap-2">
      <details className="relative">
        <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-full border border-line bg-white px-3 text-sm font-extrabold text-ink [&::-webkit-details-marker]:hidden">
          <span>🏪</span>
          <span className="max-w-40 truncate">
            {active ? active.name : "Tous les marchés"}
          </span>
          <span className="text-xs">▾</span>
        </summary>
        <ul className="absolute left-0 top-11 z-20 max-h-72 w-64 overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-lg">
          <li>
            <Link
              href={buildUrl("/", { cat })}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-softer"
            >
              Tous les marchés
            </Link>
          </li>
          {markets.map((m) => (
            <li key={m.id}>
              <Link
                href={buildUrl("/", { market: m.id, cat })}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-softer"
              >
                {m.name}
              </Link>
            </li>
          ))}
        </ul>
      </details>
      {active && (
        <Link
          href={buildUrl("/", { cat })}
          aria-label="Retirer le filtre marché"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-500"
        >
          ✕
        </Link>
      )}
    </div>
  );
}