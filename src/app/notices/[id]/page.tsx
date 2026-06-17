import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotice } from "@/lib/data/notices";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)}KB`;
  return `${(kb / 1024).toFixed(1)}MB`;
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id).catch(() => null);

  if (!notice) notFound();

  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <Link href="/notices" className="text-sm text-navy-400 hover:text-navy">
          ← 목록으로
        </Link>

        <div className="mt-6 border-b border-navy-50 pb-6">
          <div className="flex items-center gap-3">
            {notice.is_pinned && (
              <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-medium text-white">
                고정
              </span>
            )}
            {notice.category && (
              <span className="text-xs font-medium text-navy-400">{notice.category}</span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {notice.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            {notice.author ? `${notice.author} · ` : ""}
            {formatDate(notice.created_at)}
          </p>
        </div>

        <div className="whitespace-pre-wrap py-8 leading-7 text-neutral-700">
          {notice.content}
        </div>

        {notice.notice_attachments.length > 0 && (
          <div className="mt-4 rounded-2xl bg-navy-50/60 p-5">
            <p className="text-sm font-medium text-navy">첨부파일</p>
            <ul className="mt-3 flex flex-col gap-2">
              {notice.notice_attachments.map((file) => (
                <li key={file.id}>
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-700 hover:text-navy hover:underline"
                  >
                    📎 {file.file_name}
                    {file.file_size && (
                      <span className="text-neutral-400">({formatFileSize(file.file_size)})</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
