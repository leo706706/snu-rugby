"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface AdvisorInput {
  name: string;
  title: string;
  photo_url: string | null;
  career: string;
}

export async function updateAdvisor(input: AdvisorInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("advisor").upsert({ id: 1, ...input }, { onConflict: "id" });
  if (error) return { error: error.message };

  revalidatePath("/players");
  revalidatePath("/admin/advisor");
}
