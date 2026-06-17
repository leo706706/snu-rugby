"use client";

import { useState } from "react";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import type { GalleryAlbum } from "@/types/database";
import type { AlbumInput } from "@/lib/actions/gallery";

const IMAGE_ACCEPT = { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] };
const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

export default function AlbumForm({
  initial,
  onSubmit,
}: {
  initial?: GalleryAlbum;
  onSubmit: (input: AlbumInput) => Promise<{ error?: string } | void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url ?? "");
  const [albumDate, setAlbumDate] = useState(initial?.album_date ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit({
      title,
      description: description || null,
      cover_image_url: coverImageUrl || null,
      album_date: albumDate || null,
    });

    setSubmitting(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>커버 이미지</label>
        {coverImageUrl && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-xl bg-navy-50">
            <Image src={coverImageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="mt-2">
          <Dropzone
            bucket="gallery"
            accept={IMAGE_ACCEPT}
            onUploaded={(urls) => setCoverImageUrl(urls[0])}
            label="커버 이미지를 드래그하거나 클릭해서 업로드"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>앨범 제목 *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>설명</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>날짜</label>
        <input
          type="date"
          value={albumDate ?? ""}
          onChange={(e) => setAlbumDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-60"
      >
        {submitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
