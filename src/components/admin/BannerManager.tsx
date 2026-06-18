"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import { upsertBanner, deleteBanner } from "@/lib/actions/banners";
import { PAGE_LABELS } from "@/lib/pageBanners";
import type { PageKey } from "@/types/database";

export default function BannerManager({
  banners,
}: {
  banners: Record<PageKey, string>;
}) {
  const router = useRouter();
  const [savingKey, setSavingKey] = useState<PageKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUploaded(pageKey: PageKey, urls: string[]) {
    setSavingKey(pageKey);
    setError(null);
    const result = await upsertBanner(pageKey, urls[0]);
    setSavingKey(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  async function handleDelete(pageKey: PageKey) {
    if (!window.confirm("이 배너 이미지를 기본 이미지로 되돌리시겠습니까?")) return;
    setSavingKey(pageKey);
    setError(null);
    const result = await deleteBanner(pageKey);
    setSavingKey(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(PAGE_LABELS) as PageKey[]).map((pageKey) => (
          <div key={pageKey} className="rounded-2xl border border-navy-50 p-5">
            <p className="font-semibold text-neutral-900">{PAGE_LABELS[pageKey]} 페이지</p>

            <div className="group relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-50">
              <Image src={banners[pageKey]} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(pageKey)}
                disabled={savingKey === pageKey}
                className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
              >
                삭제
              </button>
            </div>

            <div className="mt-3">
              <Dropzone
                bucket="gallery"
                pathPrefix="banners"
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
                onUploaded={(urls) => handleUploaded(pageKey, urls)}
                label={savingKey === pageKey ? "저장 중..." : "새 이미지를 드래그하거나 클릭해서 업로드"}
              />
            </div>
          </div>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
