import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getStore } from "@/lib/catalog";
import { SITE_URL, whatsappUrl } from "@/lib/links";
import OpenInApp from "@/components/OpenInApp";

export async function generateMetadata({
  params,
}: PageProps<"/store/[id]">): Promise<Metadata> {
  const { id } = await params;
  const store = await getStore(id);
  if (!store) return { title: "Boutique introuvable" };

  const count = store.products.length;
  const description = [
    store.marketName,
    store.zoneName,
    count > 0 ? `${count} produit${count > 1 ? "s" : ""}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const candidate = store.image ?? store.products[0]?.image ?? null;
  const image = candidate?.startsWith("http") ? candidate : null;
  const url = `${SITE_URL}/store/${store.id}`;

  return {
    title: store.name,
    description,
    openGraph: {
      title: store.name,
      description,
      url,
      siteName: "Lafia Shop",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: store.name,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default function StorePage(props: PageProps<"/store/[id]">) {
  return (
    <Suspense fallback={<StoreFallback />}>
      <StoreContent params={props.params} />
    </Suspense>
  );
}

function StoreFallback() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-4">
      <div className="h-28 animate-pulse rounded-2xl bg-brand-softer" />
    </div>
  );
}

async function StoreContent({
  params,
}: {
  params: PageProps<"/store/[id]">["params"];
}) {
  const { id } = await params;
  const store = await getStore(id);
  if (!store) notFound();

  const orderHref = whatsappUrl(
    store.contactPhone,
    `Bonjour, je viens de voir votre boutique ${store.name} sur Lafia Shop.\n${SITE_URL}/store/${store.id}`,
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 py-3 text-xs text-muted">
          <Link href="/" className="font-bold hover:text-ink">
            ← Accueil
          </Link>
          <span>/</span>
          <span className="truncate text-ink">{store.name}</span>
        </div>

                <OpenInApp
          path={`store/${store.id}`}
          fallbackUrl={`${SITE_URL}/download`}
        />

        {/* EN-TÊTE BOUTIQUE */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-softer text-xl font-black">
              {store.image ? (
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                (store.name[0] ?? "B")
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="flex items-center gap-1.5 text-lg font-extrabold leading-snug sm:text-2xl">
                <span className="truncate">{store.name}</span>
                {store.isVerified && (
                  <span className="shrink-0 text-sm text-blue-500">✓</span>
                )}
              </h1>
              <p className="truncate text-xs text-muted">
                📍 {store.marketName ?? "Marché"}
                {store.zoneName ? ` • ${store.zoneName}` : ""}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                {store.rating != null && (
                  <span className="font-bold">
                    ⭐ {store.rating.toFixed(1)} ({store.reviewsCount})
                  </span>
                )}
                <span
                  className={`font-bold ${store.isOpen ? "text-emerald-600" : "text-muted"}`}
                >
                  ● {store.isOpen ? "Ouverte" : "Fermée"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {orderHref ? (
              <a
                href={orderHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-[#25D366] py-3 text-center text-sm font-bold text-white"
              >
                Contacter sur WhatsApp
              </a>
            ) : (
              <Link
                href="/download"
                className="block rounded-full bg-ink py-3 text-center text-sm font-bold text-white"
              >
                Télécharger l&apos;app pour contacter
              </Link>
            )}
          </div>
        </div>

        {/* PRODUITS */}
        <h2 className="mb-2 mt-5 text-base font-bold sm:mt-6">
          Produits ({store.products.length})
        </h2>
        {store.products.length === 0 ? (
          <p className="rounded-2xl bg-white p-4 text-sm text-muted">
            Cette boutique n&apos;a pas encore de produit disponible.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {store.products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}