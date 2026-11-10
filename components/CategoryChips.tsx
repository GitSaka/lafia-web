import Link from "next/link";
import type { Category } from "@/lib/catalog";

export default function CategoryChips({
  categories,
  activeId,
}: {
  categories: Category[];
  activeId?: string;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/search?cat=${c.id}`}
          className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium ${
            c.id === activeId
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-ink"
          }`}
        >
          <span>{c.emoji}</span>
          {c.name}
        </Link>
      ))}
    </div>
  );
}