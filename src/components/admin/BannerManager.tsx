"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import { upsertBanner } from "@/lib/actions/banners";
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

  return (
    <div className="flex flex-col gap-8">
      {(Object.keys(PAGE_LABELS) as PageKey[]).map((pageKey) => (
        <div key={pageKey} className="rounded-2xl border border-navy-50 p-5">
          <p className="font-semibold text-neutral-900">{PAGE_LABELS[pageKey]} 페이지</p>

          <div className="relative mt-3 h-32 w-full max-w-md overflow-hidden rounded-xl bg-navy-50 sm:h-40">
            <Image src={banners[pageKey]} alt="" fill className="object-cover" />
          </div>

          <div className="mt-3 max-w-md">
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

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
