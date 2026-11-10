// Adresse publique du site (sans "/" final)
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

// Lien de téléchargement de l'APK (vide tant qu'il n'existe pas)
export const APK_URL = process.env.NEXT_PUBLIC_APK_URL || "";

// Vrai quand un lien APK est configuré
export const HAS_APK = APK_URL.length > 0;

// Ouvre l'app installée (schéma de l'app)
export const getAppLink = (path: string = "") =>
  `lafia://${path.replace(/^\/+/, "")}`;

// Contact WhatsApp (une seule source pour tout le site)
export const CONTACT_LABEL = "+229 01 40 03 33 44";
export const CONTACT_URL =
  "https://wa.me/2290140033344?text=" +
  encodeURIComponent("Bonjour, j'ai une question sur Lafia Shop.");

// Pages du site
export const getProductUrl = (id: string) => `${SITE_URL}/product/${id}`;
export const getStoreUrl = (id: string) => `${SITE_URL}/store/${id}`;
export const getShareUrl = (code: string) => `${SITE_URL}/x/${code}`;