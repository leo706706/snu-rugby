"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Division, PlayerStatus } from "@/types/database";

export interface PlayerInput {
  name: string;
  name_en: string | null;
  jersey_number: number | null;
  position: string | null;
  division: Division;
  status: PlayerStatus;
  student_id: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_url: string | null;
  bio: string | null;
  current_role: string | null;
  past_roles: string | null;
}

export async function createPlayer(input: PlayerInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("players").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/players");
  revalidatePath("/admin/players");
  redirect("/admin/players");
}

export async function updatePlayer(id: string, input: PlayerInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("players").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/players");
  revalidatePath("/admin/players");
  redirect("/admin/players");
}

export async function deletePlayer(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("players").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/players");
  revalidatePath("/admin/players");
}

export async function movePlayer(playerId: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("players")
    .select("id")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return { error: error.message };

  const ids = (data ?? []).map((p) => p.id as string);
  const idx = ids.indexOf(playerId);
  if (idx === -1) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= ids.length) return;

  [ids[idx], ids[swapIdx]] = [ids[swapIdx], ids[idx]];

  for (let i = 0; i < ids.length; i++) {
    const { error: updateError } = await supabase
      .from("players")
      .update({ order_index: i })
      .eq("id", ids[i]);
    if (updateError) return { error: updateError.message };
  }

  revalidatePath("/players");
  revalidatePath("/admin/players");
}
