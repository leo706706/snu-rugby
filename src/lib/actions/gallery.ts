"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AlbumInput {
  title: string;
  description: string | null;
  cover_image_url: string | null;
  album_date: string | null;
}

export async function createAlbum(input: AlbumInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_albums")
    .insert(input)
    .select("id")
    .single();
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect(`/admin/gallery/${data.id}`);
}

export async function updateAlbum(id: string, input: AlbumInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_albums").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${id}`);
  revalidatePath(`/admin/gallery/${id}`);
}

export async function deleteAlbum(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_albums").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function addPhotos(albumId: string, imageUrls: string[]) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("gallery_photos")
    .insert(imageUrls.map((url, i) => ({ album_id: albumId, image_url: url, order_index: i })));
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${albumId}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}

export async function deletePhoto(id: string, albumId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/gallery");
  revalidatePath(`/gallery/${albumId}`);
  revalidatePath(`/admin/gallery/${albumId}`);
}
