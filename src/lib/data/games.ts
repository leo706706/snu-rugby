import { createClient } from "@/lib/supabase/server";
import type { Game } from "@/types/database";

export async function getAllGames() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("game_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Game[];
}

export async function getGame(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("games").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Game;
}
