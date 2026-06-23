import { createClient } from "@/lib/supabase/client";

export async function uploadFile(bucket: string, file: File, pathPrefix = "") {
  const supabase = createClient();
  const path = `${pathPrefix ? `${pathPrefix}/` : ""}${crypto.randomUUID()}-${file.name}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
