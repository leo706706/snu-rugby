import { createClient } from "@/lib/supabase/server";
import { DEFAULT_BANNERS } from "@/lib/pageBanners";
import type { PageBanner, PageKey } from "@/types/database";

export async function getBannerMap(): Promise<Record<PageKey, string>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("page_banners").select("*");
  if (error) throw error;

  const map = { ...DEFAULT_BANNERS };
  for (const row of (data ?? []) as PageBanner[]) {
    map[row.page_key] = row.image_url;
  }
  return map;
}

export async function getBanner(pageKey: PageKey): Promise<string> {
  const map = await getBannerMap();
  return map[pageKey];
}
