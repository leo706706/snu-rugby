import { createClient } from "@/lib/supabase/client";

const COMBINING_MARKS = new RegExp("[̀-ͯ]", "g");

function sanitizeFileName(name: string) {
  const lastDot = name.lastIndexOf(".");
  const base = lastDot > 0 ? name.slice(0, lastDot) : name;
  const ext = lastDot > 0 ? name.slice(lastDot) : "";

  const safeBase = base
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  const safeExt = ext.replace(/[^a-zA-Z0-9.]/g, "");

  return `${safeBase || "file"}${safeExt}`;
}

export async function uploadFile(bucket: string, file: File, pathPrefix = "") {
  const supabase = createClient();
  const path = `${pathPrefix ? `${pathPrefix}/` : ""}${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
