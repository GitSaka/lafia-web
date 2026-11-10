import Link from "next/link";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/sell", label: "Vendre" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-3 flex flex-wrap items-center justify-between gap-y-2">
        <Link href="/" className="text-xl font-extrabold text-brand">
          Lafia Shop
        </Link>

        <nav className="order-last w-full flex gap-5 text-sm font-medium text-muted md:order-none md:w-auto md:ml-auto md:mr-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/download"
          className="bg-brand text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-dark"
        >
          Télécharger
        </Link>
      </div>
    </header>
  );
}