"use client";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";


const STORES = [
  { name: "Épicerie Mamadou", rate: "4.8 • 1.2k", img: "https://i.pravatar.cc/150?img=12", desc: "Épicerie du quartier, fruits, légumes, poulet et produits frais tous les jours." },
  { name: "Boulangerie Sika", rate: "4.9 • 980", img: "https://i.pravatar.cc/150?img=32", desc: "Pain frais, baguette, viennoiserie. Cuisson le matin et le soir." },
  { name: "Marché Yara", rate: "4.7 • 843", img: "https://i.pravatar.cc/150?img=5", desc: "Fruits et légumes frais du marché de Yara, prix du marché." },
  { name: "TechZone", rate: "4.9 • 340 ventes", img: "https://i.pravatar.cc/150?img=68", desc: "Électronique, accessoires, casques, téléphones. Garantie et livraison." },
];

const PRODUCTS = [
  { title: "Avocats frais", price: "1 200 FCFA", shop: "Épicerie Mamadou", img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=600&q=80" },
  { title: "Fraises 250g", price: "1 800 FCFA", shop: "Marché Yara", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80" },
  { title: "Baguette tradition", price: "500 FCFA", shop: "Boulangerie Sika", img: "https://images.unsplash.com/photo-1549931319-a545dcf3d696?w=600&q=80" },
  { title: "Poulet fermier", price: "3 500 FCFA", shop: "Épicerie Mamadou", img: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80" },
  { title: "Casque Bluetooth", price: "45 000 FCFA", shop: "TechZone", img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80" },
];

export default function StorePage() {
  const params = useParams();
  const id = Number(params.id);
  const store = STORES[id] || STORES[0];
  const products = PRODUCTS.filter((p) => p.shop === store.name);

  return (
    <div className="min-h-screen bg-zinc-50 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <Link href="/" className="text-sm font-bold text-zinc-600">← Retour</Link>
        <div className="mt-4 bg-white rounded-2xl border border-zinc-100 p-5 flex items-center gap-4">
          <img src={store.img} className="w-16 h-16 rounded-full object-cover" alt="" />
          <div>
            <h1 className="text-xl font-black">{store.name}</h1>
            <p className="text-sm text-zinc-500">☆ {store.rate}</p>
            <p className="text-sm text-zinc-600 mt-1">{store.desc}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-bold">Produits de la boutique</h2>
          <Link href="/download" className="text-sm font-bold text-violet-600">Télécharger l&apos;app ›</Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500 bg-white rounded-2xl border p-6 text-center">Aucun produit pour le moment.</p>
        ) : (
          <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {products.map((p, i) => (
              <Link key={p.title} href={`/product/${i}`} className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                <img src={p.img} className="w-full aspect-square object-cover" alt="" />
                <div className="p-3">
                  <p className="text-sm font-semibold line-clamp-2">{p.title}</p>
                  <p className="text-sm font-black text-violet-600 mt-1">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}