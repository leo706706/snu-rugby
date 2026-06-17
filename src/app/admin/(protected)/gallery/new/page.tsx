"use client";

import AlbumForm from "@/components/admin/AlbumForm";
import { createAlbum } from "@/lib/actions/gallery";

export default function NewAlbumPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">앨범 추가</h1>
      <p className="mt-1 text-sm text-neutral-500">저장 후 사진을 추가할 수 있습니다.</p>
      <div className="mt-6">
        <AlbumForm onSubmit={createAlbum} />
      </div>
    </div>
  );
}
