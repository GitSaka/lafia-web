import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ code: string }> },
) {
  const { code } = await ctx.params;

  const { data, error } = await supabase
    .from("ShortLink")
    .select("target_type, target_id")
    .eq("code", code)
    .maybeSingle();

  // Visible dans les logs Vercel : permet de distinguer "code inconnu" et "lecture refusée"
  if (error) console.error("ShortLink read error:", error.message);

  let path = "/";
  if (data?.target_type === "product") {
    path = `/product/${encodeURIComponent(data.target_id)}`;
  } else if (data?.target_type === "store") {
    path = `/store/${encodeURIComponent(data.target_id)}`;
  }

  return NextResponse.redirect(new URL(path, request.url), 307);
}