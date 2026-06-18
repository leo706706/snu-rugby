"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import { upsertBanner, deleteBanner } from "@/lib/actions/banners";
import { PAGE_LABELS, DEFAULT_POSITIONS } from "@/lib/pageBanners";
import type { PageKey } from "@/types/database";
import type { BannerData } from "@/lib/data/banners";

export default function BannerManager({
  banners,
}: {
  banners: Record<PageKey, BannerData>;
}) {
  const router = useRouter();
  const [savingKey, setSavingKey] = useState<PageKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<PageKey, { desktop: number; mobile: number }>>(
    () =>
      Object.fromEntries(
        (Object.keys(PAGE_LABELS) as PageKey[]).map((key) => [
          key,
          { desktop: banners[key].positionDesktop, mobile: banners[key].positionMobile },
        ]),
      ) as Record<PageKey, { desktop: number; mobile: number }>,
  );

  async function handleUploaded(pageKey: PageKey, urls: string[]) {
    setSavingKey(pageKey);
    setError(null);
    const { desktop, mobile } = positions[pageKey];
    const result = await upsertBanner(pageKey, urls[0], desktop, mobile);
    setSavingKey(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  async function commitPosition(pageKey: PageKey) {
    setSavingKey(pageKey);
    setError(null);
    const { desktop, mobile } = positions[pageKey];
    const result = await upsertBanner(pageKey, banners[pageKey].imageUrl, desktop, mobile);
    setSavingKey(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    router.refresh();
  }

  function handlePositionChange(pageKey: PageKey, field: "desktop" | "mobile", value: number) {
    setPositions((prev) => ({ ...prev, [pageKey]: { ...prev[pageKey], [field]: value } }));
  }

  async function handleDelete(pageKey: PageKey) {
    if (!window.confirm("이 배너 이미지와 위치 설정을 기본값으로 되돌리시겠습니까?")) return;
    setSavingKey(pageKey);
    setError(null);
    const result = await deleteBanner(pageKey);
    setSavingKey(null);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setPositions((prev) => ({ ...prev, [pageKey]: { ...DEFAULT_POSITIONS[pageKey] } }));
    router.refresh();
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {(Object.keys(PAGE_LABELS) as PageKey[]).map((pageKey) => {
          const pos = positions[pageKey];
          return (
            <div key={pageKey} className="rounded-2xl border border-navy-50 p-5">
              <p className="font-semibold text-neutral-900">{PAGE_LABELS[pageKey]} 페이지</p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-neutral-500">데스크탑 미리보기</p>
                  <div className="group relative mt-1 h-24 w-full overflow-hidden rounded-lg bg-navy-50">
                    <Image
                      src={banners[pageKey].imageUrl}
                      alt=""
                      fill
                      style={{ objectPosition: `center ${pos.desktop}%` }}
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleDelete(pageKey)}
                      disabled={savingKey === pageKey}
                      className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                    >
                      삭제
                    </button>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={pos.desktop}
                    onChange={(e) => handlePositionChange(pageKey, "desktop", Number(e.target.value))}
                    onMouseUp={() => commitPosition(pageKey)}
                    onTouchEnd={() => commitPosition(pageKey)}
                    className="mt-2 w-full"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-500">모바일 미리보기</p>
                  <div className="relative mt-1 h-24 w-full overflow-hidden rounded-lg bg-navy-50">
                    <Image
                      src={banners[pageKey].imageUrl}
                      alt=""
                      fill
                      style={{ objectPosition: `center ${pos.mobile}%` }}
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={pos.mobile}
                    onChange={(e) => handlePositionChange(pageKey, "mobile", Number(e.target.value))}
                    onMouseUp={() => commitPosition(pageKey)}
                    onTouchEnd={() => commitPosition(pageKey)}
                    className="mt-2 w-full"
                  />
                </div>
              </div>

              <p className="mt-2 text-xs text-neutral-400">
                {savingKey === pageKey ? "저장 중..." : "슬라이더로 위/아래 잘리는 부분을 조정하세요."}
              </p>

              <div className="mt-3">
                <Dropzone
                  bucket="gallery"
                  pathPrefix="banners"
                  accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
                  onUploaded={(urls) => handleUploaded(pageKey, urls)}
                  label="새 이미지를 드래그하거나 클릭해서 업로드"
                />
              </div>
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
