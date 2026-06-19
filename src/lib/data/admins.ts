import { createClient } from "@/lib/supabase/server";
import type { Admin } from "@/types/database";

export async function getAdmins() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Admin[];
}
