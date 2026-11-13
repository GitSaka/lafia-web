// buildUrl("/", { market: "abc", cat: "" }) -> "/?market=abc"
export function buildUrl(
  path: string,
  params: Record<string, string | undefined | null>
): string {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) u.set(k, v);
  const s = u.toString();
  return s ? `${path}?${s}` : path;
}