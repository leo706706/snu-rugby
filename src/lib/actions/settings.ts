"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteSettings(instagramUrl: string, instagramHandle: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .upsert(
      { id: 1, instagram_url: instagramUrl, instagram_handle: instagramHandle },
      { onConflict: "id" },
    );
  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
