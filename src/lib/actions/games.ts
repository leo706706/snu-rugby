"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Division, GameResult, GameStatus } from "@/types/database";

export interface GameInput {
  title: string;
  opponent: string;
  division: Division;
  game_date: string;
  location: string | null;
  is_home: boolean;
  status: GameStatus;
  our_score: number | null;
  opponent_score: number | null;
  result: GameResult | null;
  notes: string | null;
}

export async function createGame(input: GameInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("games").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/schedule");
  revalidatePath("/admin/games");
  redirect("/admin/games");
}

export async function updateGame(id: string, input: GameInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("games").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/schedule");
  revalidatePath("/admin/games");
  redirect("/admin/games");
}

export async function deleteGame(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("games").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/schedule");
  revalidatePath("/admin/games");
}
