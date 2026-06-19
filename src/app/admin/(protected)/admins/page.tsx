import { getAdmins } from "@/lib/data/admins";
import { createClient } from "@/lib/supabase/server";
import AdminManager from "@/components/admin/AdminManager";

export const dynamic = "force-dynamic";

export default async function AdminAdminsPage() {
  const supabase = await createClient();
  const [admins, { data: auth }] = await Promise.all([getAdmins(), supabase.auth.getUser()]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">관리자 계정</h1>
      <p className="mt-2 text-sm text-neutral-500">
        이메일로 초대하면 비밀번호 설정 링크가 발송되고, 설정을 완료하면 관리자 권한이 부여됩니다.
      </p>

      <div className="mt-6">
        <AdminManager admins={admins} currentAdminId={auth.user?.id ?? null} />
      </div>
    </div>
  );
}
