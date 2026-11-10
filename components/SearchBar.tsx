export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" method="get" className="flex gap-2">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Rechercher un produit..."
        className="h-11 min-w-0 flex-1 rounded-full border border-line bg-white px-4 text-sm outline-none focus:border-brand"
      />
      <button
        type="submit"
        className="h-11 rounded-full bg-brand px-5 text-sm font-bold text-white hover:bg-brand-dark"
      >
        Chercher
      </button>
    </form>
  );
}