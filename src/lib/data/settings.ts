import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

export const DEFAULT_SITE_SETTINGS = {
  instagramUrl: "https://www.instagram.com/snu__rugby/",
  instagramHandle: "@snu__rugby",
};

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;

  const row = data as SiteSettings | null;
  return {
    instagramUrl: row?.instagram_url ?? DEFAULT_SITE_SETTINGS.instagramUrl,
    instagramHandle: row?.instagram_handle ?? DEFAULT_SITE_SETTINGS.instagramHandle,
  };
}
