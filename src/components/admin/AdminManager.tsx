"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Admin } from "@/types/database";
import { inviteAdmin, removeAdmin } from "@/lib/actions/admins";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminManager({
  admins,
  currentAdminId,
}: {
  admins: Admin[];
  currentAdminId: string | null;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const result = await inviteAdmin(email);

    setSubmitting(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSuccess(`${email}로 초대 메일을 보냈습니다.`);
    setEmail("");
    router.refresh();
  }

  async function handleRemove(adminId: string) {
    if (!window.confirm("이 관리자의 접근 권한을 삭제하시겠습니까?")) return;
    setRemovingId(adminId);
    setError(null);
    const result = await removeAdmin(adminId);
    setRemovingId(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <form onSubmit={handleInvite} className="flex max-w-md flex-col gap-3">
        <label className="text-sm font-medium text-neutral-700">새 관리자 이메일로 초대</label>
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="flex-1 rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-navy px-5 py-2 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-60"
          >
            {submitting ? "초대 중..." : "초대"}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}
      </form>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-navy-50">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-navy-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">등록일</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {admin.email}
                  {admin.id === currentAdminId && (
                    <span className="ml-2 rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy">
                      나
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-neutral-500">{formatDate(admin.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  {admin.id !== currentAdminId && (
                    <button
                      type="button"
                      disabled={removingId === admin.id}
                      onClick={() => handleRemove(admin.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {removingId === admin.id ? "삭제 중..." : "삭제"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
