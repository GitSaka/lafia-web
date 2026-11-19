"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getPlatform(): "android" | "ios" | null {
  if (typeof window === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) return "ios";
  return null;
}

export default function OpenInApp({
  path,
  fallbackUrl,
}: {
  path: string;
  fallbackUrl: string;
}) {
  const platform = useSyncExternalStore(subscribe, getPlatform, () => null);

  if (!platform) return null;

  const href =
    platform === "android"
      ? `intent://${path}#Intent;scheme=lafia;package=com.lafia.shop;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`
      : `lafia://${path}`;

  return (
    <a
      href={href}
      className="mb-3 flex items-center justify-between rounded-xl bg-brand-softer px-3 py-2.5 text-xs font-bold text-brand"
    >
      <span>Tu as l&apos;app Lafia ?</span>
      <span className="rounded-full bg-brand px-3 py-1.5 text-white">
        Ouvrir dans l&apos;app
      </span>
    </a>
  );
}