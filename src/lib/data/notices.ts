import { createClient } from "@/lib/supabase/server";
import type { NoticeWithAttachments } from "@/types/database";

export async function getNotices() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notices")
    .select("*, notice_attachments(*)")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as NoticeWithAttachments[];
}

export async function getNotice(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notices")
    .select("*, notice_attachments(*)")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as unknown as NoticeWithAttachments;
}
