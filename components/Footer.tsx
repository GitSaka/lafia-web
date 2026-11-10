import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-line mt-8">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-muted">
        <div className="font-extrabold text-brand text-lg">Lafia Shop</div>
        <p className="mt-1">
          Les produits des marchés et boutiques du Bénin.
        </p>

        <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-medium">
          <Link href="/about" className="hover:text-brand">À propos</Link>
          <Link href="/sell" className="hover:text-brand">Vendre</Link>
          <Link href="/download" className="hover:text-brand">Télécharger</Link>
          <Link href="/privacy" className="hover:text-brand">Confidentialité</Link>
          <Link href="/delete-account" className="hover:text-brand">
            Supprimer mon compte
          </Link>
        </nav>

        <p className="mt-6 text-xs">© 2026 Lafia Shop</p>
      </div>
    </footer>
  );
}