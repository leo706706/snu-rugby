"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function inviteAdmin(email: string) {
  const supabase = await createClient();
  const adminClient = createAdminClient();

  const { data: existing } = await supabase.from("admins").select("id").eq("email", email).maybeSingle();
  if (existing) return { error: "이미 등록된 관리자 이메일입니다." };

  const { data: invited, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email);
  if (inviteError || !invited.user) {
    return { error: inviteError?.message ?? "초대에 실패했습니다." };
  }

  const { error: insertError } = await supabase
    .from("admins")
    .insert({ id: invited.user.id, email });
  if (insertError) return { error: insertError.message };

  revalidatePath("/admin/admins");
}

export async function removeAdmin(adminId: string) {
  const supabase = await createClient();

  const { data: auth } = await supabase.auth.getUser();
  if (auth.user?.id === adminId) {
    return { error: "본인 계정은 여기서 삭제할 수 없습니다." };
  }

  const { count } = await supabase.from("admins").select("id", { count: "exact", head: true });
  if ((count ?? 0) <= 1) {
    return { error: "마지막 남은 관리자는 삭제할 수 없습니다." };
  }

  const { error } = await supabase.from("admins").delete().eq("id", adminId);
  if (error) return { error: error.message };

  revalidatePath("/admin/admins");
}
