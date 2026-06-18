"use client";

import NoticeForm from "@/components/admin/NoticeForm";
import BackLink from "@/components/admin/BackLink";
import { createNotice } from "@/lib/actions/notices";

export default function NewNoticePage() {
  return (
    <div>
      <BackLink href="/admin/notices" label="공지사항 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">공지 추가</h1>
      <p className="mt-1 text-sm text-neutral-500">저장 후 첨부파일을 추가할 수 있습니다.</p>
      <div className="mt-6">
        <NoticeForm onSubmit={createNotice} />
      </div>
    </div>
  );
}
