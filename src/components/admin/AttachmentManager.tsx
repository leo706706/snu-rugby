"use client";

import { useRouter } from "next/navigation";
import Dropzone from "@/components/admin/Dropzone";
import type { NoticeAttachment } from "@/types/database";
import { addNoticeAttachments, deleteNoticeAttachment } from "@/lib/actions/notices";

export default function AttachmentManager({
  noticeId,
  attachments,
}: {
  noticeId: string;
  attachments: NoticeAttachment[];
}) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-navy-50 p-5">
      <p className="text-sm font-medium text-neutral-700">첨부파일</p>

      <ul className="mt-3 flex flex-col gap-2">
        {attachments.map((file) => (
          <li key={file.id} className="flex items-center justify-between text-sm">
            <a
              href={file.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-navy hover:underline"
            >
              📎 {file.file_name}
            </a>
            <button
              type="button"
              onClick={async () => {
                await deleteNoticeAttachment(file.id, noticeId);
                router.refresh();
              }}
              className="text-red-600 hover:text-red-700"
            >
              삭제
            </button>
          </li>
        ))}
        {attachments.length === 0 && (
          <li className="text-sm text-neutral-400">등록된 첨부파일이 없습니다.</li>
        )}
      </ul>

      <div className="mt-4">
        <Dropzone
          bucket="attachments"
          pathPrefix={noticeId}
          multiple
          label="파일을 드래그하거나 클릭해서 업로드"
          onUploaded={async (urls) => {
            await addNoticeAttachments(
              noticeId,
              urls.map((url) => ({
                file_name: decodeURIComponent(url.split("/").pop() ?? "file").replace(/^[0-9a-f-]{36}-/, ""),
                file_url: url,
                file_size: null,
              })),
            );
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
