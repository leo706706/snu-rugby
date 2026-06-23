import { createClient } from "@/lib/supabase/server";
import type { Advisor } from "@/types/database";

export async function getAdvisor() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("advisor").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  return data as Advisor | null;
}
