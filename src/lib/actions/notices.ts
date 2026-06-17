"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface NoticeInput {
  title: string;
  content: string;
  is_pinned: boolean;
  category: string | null;
  author: string | null;
}

export async function createNotice(input: NoticeInput) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("notices").insert(input).select("id").single();
  if (error) return { error: error.message };

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
  redirect(`/admin/notices/${data.id}`);
}

export async function updateNotice(id: string, input: NoticeInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("notices").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/notices");
  revalidatePath(`/notices/${id}`);
  revalidatePath("/admin/notices");
  redirect("/admin/notices");
}

export async function deleteNotice(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/notices");
  revalidatePath("/admin/notices");
}

export async function addNoticeAttachments(
  noticeId: string,
  files: { file_name: string; file_url: string; file_size: number | null }[],
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("notice_attachments")
    .insert(files.map((f) => ({ ...f, notice_id: noticeId })));
  if (error) return { error: error.message };

  revalidatePath(`/notices/${noticeId}`);
  revalidatePath(`/admin/notices/${noticeId}`);
}

export async function deleteNoticeAttachment(id: string, noticeId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("notice_attachments").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/notices/${noticeId}`);
  revalidatePath(`/admin/notices/${noticeId}`);
}
