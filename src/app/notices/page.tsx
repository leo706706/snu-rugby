import Link from "next/link";
import { getNotices } from "@/lib/data/notices";
import { getBannerData } from "@/lib/data/banners";
import PageBanner from "@/components/common/PageBanner";
import FadeIn from "@/components/common/FadeIn";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NoticesPage() {
  const [notices, banner] = await Promise.all([getNotices(), getBannerData("notices")]);

  return (
    <div>
      <PageBanner
        imageUrl={banner.imageUrl}
        title="공지사항"
        subtitle="서울대학교 럭비부의 공지사항입니다."
        positionDesktop={banner.positionDesktop}
        positionMobile={banner.positionMobile}
      />
      <div className="section">
        <div className="container-page">
          {notices.length === 0 ? (
            <p className="mt-16 text-center text-neutral-400">등록된 공지사항이 없습니다.</p>
          ) : (
            <FadeIn>
              <ul className="mt-10 divide-y divide-navy-50 border-y border-navy-50">
                {notices.map((notice) => (
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
                        {notice.notice_attachments?.length > 0 && (
                          <span className="text-xs text-navy-400">📎 {notice.notice_attachments.length}</span>
                        )}
                      </span>
                      <span className="text-sm text-neutral-400">{formatDate(notice.created_at)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
