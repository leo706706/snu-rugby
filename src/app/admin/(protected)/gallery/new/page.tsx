"use client";

import AlbumForm from "@/components/admin/AlbumForm";
import BackLink from "@/components/admin/BackLink";
import { createAlbum } from "@/lib/actions/gallery";

export default function NewAlbumPage() {
  return (
    <div>
      <BackLink href="/admin/gallery" label="갤러리 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">앨범 추가</h1>
      <p className="mt-1 text-sm text-neutral-500">저장 후 사진을 추가할 수 있습니다.</p>
      <div className="mt-6">
        <AlbumForm onSubmit={createAlbum} />
      </div>
    </div>
  );
}
