import { supabase } from "./supabase";
import { cacheLife } from "next/cache";

export type Category = { id: string; name: string; emoji: string };
export type Market = { id: string; name: string };
export type StoreItem = {
  id: string;
  name: string;
  image: string | null;
  rating: number | null; // null si la boutique n'a aucun avis
  reviewsCount: number;
  marketName: string | null;
};
export type ProductItem = {
  id: string;
  title: string;
  priceFCFA: number;
  promoPriceFCFA: number | null;
  isOnPromotion: boolean;
  image: string | null;
  storeId: string;
  storeName: string;
    originalPriceFCFA: number | null;
  hasVideo: boolean;
  allowTranche: boolean;
  marketName: string | null;
};
export type SearchParams = {
  q?: string;
  cat?: string;
  market?: string;
  page?: number;
};

export const PAGE_SIZE = 24;
const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// ---------- Données de démonstration (local seulement) ----------
const DEMO_CATEGORIES: Category[] = [
  { id: "c1", name: "Alimentaire", emoji: "🍎" },
  { id: "c2", name: "Mode", emoji: "👕" },
  { id: "c3", name: "Maison", emoji: "🏠" },
  { id: "c4", name: "Beauté", emoji: "✨" },
  { id: "c5", name: "Électronique", emoji: "📱" },
];
const DEMO_MARKETS: Market[] = [
  { id: "m1", name: "Marché Dantokpa" },
  { id: "m2", name: "Marché Missèbo" },
];
const DEMO_STORES: StoreItem[] = [
  { id: "s1", name: "Boutique Démo 1", image: null, rating: 4.8, reviewsCount: 12, marketName: "Marché Dantokpa" },
  { id: "s2", name: "Boutique Démo 2", image: null, rating: null, reviewsCount: 0, marketName: "Marché Missèbo" },
  { id: "s3", name: "Boutique Démo 3", image: null, rating: 4.5, reviewsCount: 3, marketName: null },
];
const DEMO_PRODUCTS: ProductItem[] = Array.from({ length: 30 }, (_, i) => ({
  id: `p${i + 1}`,
  title: `Produit démo ${i + 1}`,
  priceFCFA: 1000 + i * 350,
  promoPriceFCFA: i % 4 === 0 ? 800 + i * 300 : null,
  isOnPromotion: i % 4 === 0,
  image: null,
  storeId: "s1",
  storeName: "Boutique Démo 1",
    originalPriceFCFA: i % 4 === 0 ? 1000 + i * 350 : null,
  hasVideo: i % 3 === 0,
  allowTranche: i % 5 === 0,
  marketName: "Marché Dantokpa",
}));

// ---------- Lectures ----------
export async function getCategories(): Promise<Category[]> {
      "use cache";
    cacheLife("minutes");

  if (DEMO) return DEMO_CATEGORIES;
  const { data, error } = await supabase
    .from("Category")
    .select("id,name,emoji")
    .order("name");
  if (error) {
    console.error("getCategories:", error.message);
    return [];
  }
  return (data ?? []) as Category[];
}

export async function getMarkets(): Promise<Market[]> {
      "use cache";
  cacheLife("minutes");
  if (DEMO) return DEMO_MARKETS;
  const { data, error } = await supabase
    .from("Market")
    .select("id,name")
    .order("name");
  if (error) {
    console.error("getMarkets:", error.message);
    return [];
  }
  return (data ?? []) as Market[];
}

type StoreRow = {
  id: string;
  name: string;
  shopPicture: string | null;
  rating: number | null;
  reviewsCount: number | null;
  market: { name: string } | null;
};

export async function getTopStores(
  limit = 8,
  marketId?: string
): Promise<StoreItem[]> {
  "use cache";
  cacheLife("minutes");
  if (DEMO) return DEMO_STORES.slice(0, limit);
  let query = supabase
    .from("Store")
    .select("id,name,shopPicture,rating,reviewsCount,market:Market(name)")
    .eq("isOpen", true)
    .order("rating", { ascending: false })
    .order("id", { ascending: true })
    .limit(limit);
  if (marketId && UUID_RE.test(marketId)) {
    query = query.eq("marketId", marketId);
  }
  const { data, error } = await query;
  if (error) {
    console.error("getTopStores:", error.message);
    return [];
  }
  return ((data ?? []) as unknown as StoreRow[]).map((s) => ({
    id: s.id,
    name: s.name,
    image: s.shopPicture,
    // le schéma met 4.8 par défaut : on n'affiche la note que s'il y a des avis
    rating: (s.reviewsCount ?? 0) > 0 ? s.rating : null,
    reviewsCount: s.reviewsCount ?? 0,
    marketName: s.market?.name ?? null,
  }));
}

type ProductRow = {
  id: string;
  title: string;
  priceFCFA: number;
  originalPriceFCFA: number | null;
  promoPriceFCFA: number | null;
  isOnPromotion: boolean | null;
  allowTranche: boolean | null;
  images: string[] | null;
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  store: { id: string; name: string; market: { name: string } | null } | null;
};

export async function searchProducts(
  params: SearchParams
): Promise<{ products: ProductItem[]; hasMore: boolean }> {
      "use cache";
  cacheLife("minutes");
  const page = Math.max(1, params.page ?? 1);

  if (DEMO) {
    const q = params.q?.trim().toLowerCase() ?? "";
    const all = DEMO_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
    const from = (page - 1) * PAGE_SIZE;
    return {
      products: all.slice(from, from + PAGE_SIZE),
      hasMore: all.length > from + PAGE_SIZE,
    };
  }

  const from = (page - 1) * PAGE_SIZE;
  let query = supabase
    .from("Product")
        .select(
      "id,title,priceFCFA,originalPriceFCFA,promoPriceFCFA,isOnPromotion,allowTranche,images,videoUrl,videoThumbnailUrl,store:Store!Product_storeId_fkey!inner(id,name,isOpen,marketId,market:Market(name))"
    )
    .eq("isAvailable", true)
    .eq("store.isOpen", true)
    .order("createdAt", { ascending: false })
    .order("id", { ascending: true })
    .range(from, from + PAGE_SIZE); // PAGE_SIZE + 1 lignes pour savoir s'il y a une suite

  const q = params.q?.trim().slice(0, 60).replace(/[%_,()\\]/g, " ").trim();
  if (q) query = query.ilike("title", `%${q}%`);
  if (params.cat && UUID_RE.test(params.cat)) {
    query = query.eq("categoryId", params.cat);
  }
  if (params.market && UUID_RE.test(params.market)) {
    query = query.eq("store.marketId", params.market);
  }

  const { data, error } = await query;
  if (error) {
    console.error("searchProducts:", error.message);
    return { products: [], hasMore: false };
  }
  const rows = (data ?? []) as unknown as ProductRow[];
  return {
    hasMore: rows.length > PAGE_SIZE,
        products: rows.slice(0, PAGE_SIZE).map((r) => ({
      id: r.id,
      title: r.title,
      priceFCFA: r.priceFCFA,
      promoPriceFCFA: r.promoPriceFCFA,
      isOnPromotion: Boolean(r.isOnPromotion),
      originalPriceFCFA: r.originalPriceFCFA,
      hasVideo:
        Boolean(r.videoUrl) || Boolean(r.images?.[0]?.includes(".mp4")),
      allowTranche: Boolean(r.allowTranche),
      marketName: r.store?.market?.name ?? null,
      // jamais un .mp4 dans une balise <img>
      image:
        r.images?.find((u) => !u.includes(".mp4")) ??
        r.videoThumbnailUrl ??
        null,
      storeId: r.store?.id ?? "",
      storeName: r.store?.name ?? "",
    })),
  };
}

type ProductDetailStoreRow = {
  id: string;
  name: string;
  shopPicture: string | null;
  isVerified: boolean | null;
  userId: string | null;
  contactPhone: string | null;
  market: { name: string } | null;
  zone: { name: string } | null;
};

type ProductDetailRow = {
  id: string;
  title: string;
  priceFCFA: number;
  originalPriceFCFA: number | null;
  promoPriceFCFA: number | null;
  isOnPromotion: boolean | null;
  allowTranche: boolean | null;
  maxTranches: number | null;
  description: string | null;
  images: string[] | null;
  videoUrl: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  stockQuantity: number | null;
  isAvailable: boolean | null;
  categoryId: string | null;
  views: number | null;
  likes: number | null;
  createdAt: string;
  store: ProductDetailStoreRow | null;
};

export async function getProduct(id: string) {
  "use cache";
  cacheLife("minutes");

  if (DEMO) {
    const p = DEMO_PRODUCTS.find((x) => x.id === id);
    if (!p) return null;
    return {
      ...p,
      description: "Produit démo - description.",
      images: p.image ? [p.image] : [],
      videoUrl: null as string | null,
      colors: [] as string[],
      sizes: [] as string[],
      stockQuantity: 10,
      isAvailable: true,
      categoryId: null as string | null,
      maxTranches: 5,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      store: {
        id: p.storeId,
        name: p.storeName,
        shopPicture: null as string | null,
        isVerified: false,
        userId: "",
        contactPhone: "0140033344" as string | null,
        market: p.marketName ? { name: p.marketName } : null,
        zone: null as { name: string } | null,
      },
    };
  }

  if (!UUID_RE.test(id)) return null;

  const { data, error } = await supabase
    .from("Product")
    .select(
      `id,title,priceFCFA,originalPriceFCFA,promoPriceFCFA,isOnPromotion,allowTranche,maxTranches,description,images,videoUrl,colors,sizes,stockQuantity,isAvailable,categoryId,views,likes,createdAt,store:Store!Product_storeId_fkey!inner(id,name,shopPicture,isVerified,userId,contactPhone,market:Market(name),zone:MarketZone(name))`
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;

  const r = data as unknown as ProductDetailRow;
  const store = r.store;

  return {
    id: r.id,
    title: r.title,
    priceFCFA: r.priceFCFA,
    promoPriceFCFA: r.promoPriceFCFA,
    isOnPromotion: Boolean(r.isOnPromotion),
    originalPriceFCFA: r.originalPriceFCFA,
    hasVideo: Boolean(r.videoUrl),
    allowTranche: Boolean(r.allowTranche),
    marketName: store?.market?.name ?? null,
    image: r.images?.find((u) => !u.includes(".mp4")) ?? null,
    storeId: store?.id ?? "",
    storeName: store?.name ?? "",
    description: r.description ?? null,
    images: (r.images ?? []).filter((u) => !u.includes(".mp4")),
    videoUrl: r.videoUrl ?? null,
    colors: r.colors ?? [],
    sizes: r.sizes ?? [],
    stockQuantity: r.stockQuantity ?? 0,
    isAvailable: Boolean(r.isAvailable),
    categoryId: r.categoryId ?? null,
    maxTranches: r.maxTranches ?? 5,
    views: r.views ?? 0,
    likes: r.likes ?? 0,
    createdAt: r.createdAt,
    store: store
      ? {
          id: store.id,
          name: store.name,
          shopPicture: store.shopPicture ?? null,
          isVerified: Boolean(store.isVerified),
          userId: store.userId ?? "",
           contactPhone: store.contactPhone ?? null,  
          market: store.market ?? null,
          zone: store.zone ?? null,
        }
      : null,
  };
}