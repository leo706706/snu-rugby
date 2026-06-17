import { createClient } from "@/lib/supabase/server";
import type { Division, Player, PlayerStatus } from "@/types/database";

export async function getPlayers(filters?: {
  division?: Division;
  status?: PlayerStatus;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("players")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: true });

  if (filters?.division) query = query.eq("division", filters.division);
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%`,
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Player[];
}

export async function getPlayer(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("players").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Player;
}
