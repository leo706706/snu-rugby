import { createClient } from "@/lib/supabase/server";
import { DEFAULT_BANNERS, DEFAULT_POSITIONS } from "@/lib/pageBanners";
import type { PageBanner, PageKey } from "@/types/database";

export interface BannerData {
  imageUrl: string;
  positionDesktop: number;
  positionMobile: number;
}

export async function getBannerDataMap(): Promise<Record<PageKey, BannerData>> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("page_banners").select("*");
  if (error) throw error;

  const map = {} as Record<PageKey, BannerData>;
  for (const key of Object.keys(DEFAULT_BANNERS) as PageKey[]) {
    map[key] = {
      imageUrl: DEFAULT_BANNERS[key],
      positionDesktop: DEFAULT_POSITIONS[key].desktop,
      positionMobile: DEFAULT_POSITIONS[key].mobile,
    };
  }
  for (const row of (data ?? []) as PageBanner[]) {
    map[row.page_key] = {
      imageUrl: row.image_url,
      positionDesktop: row.position_desktop,
      positionMobile: row.position_mobile,
    };
  }
  return map;
}

export async function getBannerMap(): Promise<Record<PageKey, string>> {
  const map = await getBannerDataMap();
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, value.imageUrl]),
  ) as Record<PageKey, string>;
}

export async function getBanner(pageKey: PageKey): Promise<string> {
  const map = await getBannerDataMap();
  return map[pageKey].imageUrl;
}

export async function getBannerData(pageKey: PageKey): Promise<BannerData> {
  const map = await getBannerDataMap();
  return map[pageKey];
}
