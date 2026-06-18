"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { PageKey } from "@/types/database";

export async function upsertBanner(
  pageKey: PageKey,
  imageUrl: string,
  positionDesktop: number,
  positionMobile: number,
) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_banners").upsert(
    {
      page_key: pageKey,
      image_url: imageUrl,
      position_desktop: positionDesktop,
      position_mobile: positionMobile,
    },
    { onConflict: "page_key" },
  );
  if (error) return { error: error.message };

  revalidateBannerPaths();
}

export async function deleteBanner(pageKey: PageKey) {
  const supabase = await createClient();
  const { error } = await supabase.from("page_banners").delete().eq("page_key", pageKey);
  if (error) return { error: error.message };

  revalidateBannerPaths();
}

function revalidateBannerPaths() {
  revalidatePath("/");
  revalidatePath("/players");
  revalidatePath("/schedule");
  revalidatePath("/notices");
  revalidatePath("/gallery");
  revalidatePath("/admin/banners");
}
