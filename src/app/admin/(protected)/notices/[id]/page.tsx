import { notFound } from "next/navigation";
import { getNotice } from "@/lib/data/notices";
import { updateNotice } from "@/lib/actions/notices";
import NoticeForm from "@/components/admin/NoticeForm";
import AttachmentManager from "@/components/admin/AttachmentManager";
import BackLink from "@/components/admin/BackLink";

export const dynamic = "force-dynamic";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id).catch(() => null);
  if (!notice) notFound();

  return (
    <div>
      <BackLink href="/admin/notices" label="공지사항 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">공지 수정</h1>
      <div className="mt-6">
        <NoticeForm initial={notice} onSubmit={updateNotice.bind(null, id)} />
      </div>
      <div className="mt-10 max-w-xl">
        <AttachmentManager noticeId={id} attachments={notice.notice_attachments} />
      </div>
    </div>
  );
}
