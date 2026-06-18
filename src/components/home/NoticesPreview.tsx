import Link from "next/link";
import { getNotices } from "@/lib/data/notices";
import FadeIn from "@/components/common/FadeIn";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NoticesPreview() {
  const notices = await getNotices();
  const featured = notices.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="section bg-navy-50/40">
      <div className="container-page">
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">
              Notices
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">공지사항</h2>
          </div>
          <Link href="/notices" className="text-sm font-medium text-navy hover:underline">
            전체보기 →
          </Link>
        </FadeIn>

        <FadeIn delay={100}>
          <ul className="mt-10 divide-y divide-navy-100 border-y border-navy-100">
            {featured.map((notice) => (
              <li key={notice.id}>
                <Link
                  href={`/notices/${notice.id}`}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-center gap-3">
                    {notice.is_pinned && (
                      <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-medium text-white">
                        고정
                      </span>
                    )}
                    <span className="font-medium text-neutral-900">{notice.title}</span>
                  </span>
                  <span className="text-sm text-neutral-400">{formatDate(notice.created_at)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
