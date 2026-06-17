import { createClient } from "@/lib/supabase/server";
import type { AlbumWithPhotoCount, AlbumWithPhotos } from "@/types/database";

export async function getAlbums() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*, gallery_photos(count)")
    .order("album_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as AlbumWithPhotoCount[];
}

export async function getAlbum(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*, gallery_photos(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as AlbumWithPhotos;
}
