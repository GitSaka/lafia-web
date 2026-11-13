import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProduct, searchProducts } from "@/lib/catalog";
import { formatF } from "@/lib/format";
import { notFound } from "next/navigation";
import { SITE_URL, whatsappUrl } from "@/lib/links";

export default function ProductPage(props: PageProps<"/product/[id]">) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductContent params={props.params} />
    </Suspense>
  );
}

function ProductFallback() {
  return (
    <div className="mx-auto max-w-7xl px-3 py-4">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-2xl bg-brand-softer" />
        <div className="space-y-3">
          <div className="h-6 w-3/4 animate-pulse rounded bg-brand-softer" />
          <div className="h-6 w-1/2 animate-pulse rounded bg-brand-softer" />
        </div>
      </div>
    </div>
  );
}

async function ProductContent({
  params,
}: {
  params: PageProps<"/product/[id]">["params"];
}) {
  const { id } = await params;
  const product = await getProduct(id);

   if (!product) notFound();

  const { products: similar } = await searchProducts({
    cat: product.categoryId ?? undefined,
    page: 1,
  });
  const others = similar.filter((p) => p.id !== product.id).slice(0, 8);

  const promo = product.isOnPromotion && product.promoPriceFCFA != null;
  const price = promo ? (product.promoPriceFCFA as number) : product.priceFCFA;
  const discount =
    promo && product.priceFCFA > 0
      ? Math.round(((product.priceFCFA - price) / product.priceFCFA) * 100)
      : 0;

    const photos = product.images.filter((u) => !u.includes(".mp4"));
  const gallery =
    photos.length > 0 ? photos : product.image ? [product.image] : [];
  const mainImage = gallery[0] ?? null;

  const orderHref = whatsappUrl(
    product.store?.contactPhone,
    `Bonjour, je veux commander : ${product.title} (${formatF(price)})\n${SITE_URL}/product/${product.id}`,
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24 lg:pb-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        {/* BREADCRUMB - comme Alibaba */}
        <div className="flex items-center gap-2 py-3 text-xs text-muted">
          <Link href="/" className="font-bold hover:text-ink">
            ← Accueil
          </Link>
          <span>/</span>
          <span className="truncate text-ink">{product.title}</span>
        </div>

        {/* CARTE PRINCIPALE - 1 col mobile, 2 cols desktop */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm lg:grid lg:grid-cols-[1.05fr_1fr]">
          {/* GAUCHE : GALERIE */}
          <div className="p-2 sm:p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.title}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-5xl">
                  🖼️
                </div>
              )}
              {product.allowTranche && (
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  Tontine {product.maxTranches}j
                </span>
              )}
              {product.hasVideo && (
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-white">
                  ▶ Voir le reel
                </span>
              )}
            </div>

            {/* Miniatures */}
            {gallery.length > 1 && (
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 sm:h-20 sm:w-20 ${i === 0 ? "border-brand" : "border-line"}`}
                  >
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* STATS sous galerie - desktop */}
            <div className="mt-3 hidden flex-wrap gap-4 text-xs text-muted lg:flex">
              <span>👁 {product.views ?? 0} vues</span>
              <span>♥ {product.likes ?? 0} likes</span>
            </div>
          </div>

          {/* DROITE : INFOS - comme Alibaba */}
          <div className="flex flex-col p-3 sm:p-5 lg:border-l lg:border-line lg:p-6">
            {/* TITRE */}
            <h1 className="text-lg font-bold leading-snug text-ink sm:text-2xl lg:text-3xl">
              {product.title}
            </h1>

            {/* STATS mobile */}
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted lg:hidden">
              <span>👁 {product.views ?? 0} vues</span>
              <span>♥ {product.likes ?? 0} likes</span>
            </div>

            {/* PRIX */}
            <div className="mt-4 rounded-xl bg-[#fff5f0] p-3 sm:p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-black text-price sm:text-3xl">
                  {formatF(price)}
                </span>
                {promo && (
                  <>
                    <span className="text-sm text-muted line-through">
                      {formatF(product.priceFCFA)}
                    </span>
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.marketName && (
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold">
                    📍 à {product.marketName}
                  </span>
                )}
                {product.allowTranche && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    Tranche acceptée 📦 {formatF(Math.ceil(price / (product.maxTranches || 5)))} x {product.maxTranches}j
                  </span>
                )}
              </div>
            </div>

            {/* COULEURS */}
            {product.colors?.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                  Couleurs
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c: string) => (
                    <span key={c} className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* TAILLES */}
            {product.sizes?.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">
                  Tailles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s: string) => (
                    <span key={s} className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* STOCK */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-brand-softer px-3 py-2.5">
              <span className="text-xs text-muted">
                Stock: <b className="text-ink">{product.stockQuantity} pièces</b>
              </span>
              <span className="text-xs font-bold text-emerald-600">
                ● {product.isAvailable ? "Disponible" : "Indisponible"}
              </span>
            </div>

            {/* DESCRIPTION - desktop dans colonne droite */}
            <p className="mt-4 hidden text-sm leading-6 text-ink lg:block">
              {product.description}
            </p>

            {/* VENDEUR */}
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-line p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-softer text-base font-black">
                {product.store?.name?.[0] ?? "B"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold">{product.store?.name}</p>
                <p className="truncate text-xs text-muted">
                  📍 {product.store?.market?.name ?? "Marché"} • {product.store?.zone?.name ?? ""}
                </p>
              </div>
                            {product.store?.id && (
                <Link
                  href={`/store/${product.store.id}`}
                  className="shrink-0 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white"
                >
                  Voir
                </Link>
              )}
            </div>

            <div className="mt-4 hidden lg:block">
              <OrderButton href={orderHref} />
            </div>
          </div>
        </div>

        {/* DESCRIPTION mobile */}
        <div className="mt-3 rounded-2xl bg-white p-3 sm:p-4 lg:hidden">
          <h2 className="mb-1 text-sm font-bold">Description</h2>
          <p className="text-sm leading-6 text-ink">{product.description}</p>
        </div>

        {/* SIMILAIRES */}
        <h2 className="mb-2 mt-5 text-base font-bold sm:mt-6">
          Plus de {product.store?.name}
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>

      {/* BOTTOM BAR - mobile seulement, comme avant */}
      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-white lg:hidden">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-2 py-3 sm:px-4">
          {product.store?.id && (
            <Link
              href={`/store/${product.store.id}`}
              className="flex-1 rounded-full border border-line py-3 text-center text-sm font-bold"
            >
              Boutique
            </Link>
          )}
          <div className="flex-[1.6]">
            <OrderButton href={orderHref} />
          </div>
        </div>
      </div>
    </div>
  );
}


function OrderButton({ href }: { href: string | null }) {
  if (!href) {
    return (
      <Link
        href="/download"
        className="block rounded-full bg-ink py-3 text-center text-sm font-bold text-white"
      >
        Télécharger l&apos;app pour commander
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-full bg-[#25D366] py-3 text-center text-sm font-bold text-white"
    >
      Commander sur WhatsApp
    </a>
  );
}