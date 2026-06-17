import Link from "next/link";
import { getNotices } from "@/lib/data/notices";
import { deleteNotice } from "@/lib/actions/notices";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">공지사항</h1>
        <Link
          href="/admin/notices/new"
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
        >
          + 공지 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-50">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">고정</th>
              <th className="px-4 py-3">제목</th>
              <th className="px-4 py-3">작성일</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {notices.map((notice) => (
              <tr key={notice.id}>
                <td className="px-4 py-3">{notice.is_pinned ? "📌" : ""}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{notice.title}</td>
                <td className="px-4 py-3 text-neutral-500">{formatDate(notice.created_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/notices/${notice.id}`}
                      className="text-sm font-medium text-navy hover:underline"
                    >
                      수정
                    </Link>
                    <DeleteButton action={deleteNotice.bind(null, notice.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-neutral-400">
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
