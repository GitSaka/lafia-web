import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { buildUrl } from "@/lib/url";

function Box({
  href,
  emoji,
  label,
  active,
}: {
  href: string;
  emoji: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link href={href} className="flex shrink-0 flex-col items-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl ${
          active
            ? "border-2 border-brand bg-brand-softer"
            : "border border-line"
        }`}
      >
        {emoji}
      </div>
      <span
        className={`mt-1 text-[11px] ${
          active ? "font-extrabold text-brand" : "font-semibold text-muted"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export default function CategoryBoxes({
  categories,
  activeId,
  market,
}: {
  categories: Category[];
  activeId?: string;
  market?: string;
}) {
  return (
    <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
      <Box
        href={buildUrl("/", { market })}
        emoji="✨"
        label="Tous"
        active={!activeId}
      />
      {categories.map((c) => (
        <Box
          key={c.id}
          href={buildUrl("/", { cat: c.id, market })}
          emoji={c.emoji}
          label={c.name}
          active={c.id === activeId}
        />
      ))}
    </div>
  );
}