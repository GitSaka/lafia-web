import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});

// Ce que l'on accepte d'envoyer : type de fichier, poids maximum, dossier
const MB = 1024 * 1024;
const RULES: Record<string, { ext: string; max: number; folder: string }> = {
  "image/jpeg": { ext: "jpg", max: 5 * MB, folder: "images" },
  "image/png": { ext: "png", max: 5 * MB, folder: "images" },
  "image/webp": { ext: "webp", max: 5 * MB, folder: "images" },
  "video/mp4": { ext: "mp4", max: 30 * MB, folder: "videos" },
  "audio/mp4": { ext: "m4a", max: 5 * MB, folder: "voices" },
  "audio/mpeg": { ext: "mp3", max: 5 * MB, folder: "voices" },
};

export async function POST(request: Request) {
  // 1. Qui es-tu ? On vérifie le jeton de connexion envoyé par l'app
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  // 2. Que veux-tu envoyer ?
  let contentType = "";
  let size = 0;
  try {
    const body = await request.json();
    contentType = String(body.contentType ?? "");
    size = Number(body.size ?? 0);
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const rule = RULES[contentType];
  if (!rule) {
    return NextResponse.json({ error: "Type de fichier refusé" }, { status: 400 });
  }
  if (!Number.isFinite(size) || size <= 0 || size > rule.max) {
    return NextResponse.json({ error: "Fichier trop lourd" }, { status: 400 });
  }

  // 3. On fabrique l'autorisation pour UN fichier, valable 5 minutes
  const key = `${rule.folder}/${data.user.id}/${Date.now()}_${randomUUID().slice(0, 8)}.${rule.ext}`;
  try {
    const uploadUrl = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        ContentType: contentType,
        ContentLength: size,
      }),
      { expiresIn: 300 },
    );
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
    return NextResponse.json({ uploadUrl, publicUrl, key });
  } catch (e) {
    console.error("upload-url error", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}