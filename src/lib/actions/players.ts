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
