"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Notice } from "@/types/database";
import { deleteNotice } from "@/lib/actions/notices";
import DeleteButton from "@/components/admin/DeleteButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function NoticeTable({ notices }: { notices: Notice[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notices;
    return notices.filter((n) => n.title.toLowerCase().includes(q));
  }, [notices, search]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="제목으로 검색"
        className="mt-4 w-full max-w-xs rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
      />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-50">
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
            {filtered.map((notice) => (
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-neutral-400">
                  {notices.length === 0 ? "등록된 공지사항이 없습니다." : "검색 결과가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
