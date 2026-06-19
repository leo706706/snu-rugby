import Link from "next/link";
import { getNotices } from "@/lib/data/notices";
import NoticeTable from "@/components/admin/NoticeTable";

export const dynamic = "force-dynamic";

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

      <NoticeTable notices={notices} />
    </div>
  );
}
