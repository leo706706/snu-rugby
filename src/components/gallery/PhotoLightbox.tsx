"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/types/database";

export default function PhotoLightbox({
  photos,
  albumTitle,
}: {
  photos: GalleryPhoto[];
  albumTitle: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    if (index === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? i : Math.min(i + 1, photos.length - 1)));
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, photos.length]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setIndex(i)}
            className="relative block aspect-square overflow-hidden rounded-xl bg-navy-50"
          >
            <Image
              src={photo.image_url}
              alt={photo.caption ?? albumTitle}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIndex(null)}
        >
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label="닫고 갤러리로 돌아가기"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
          >
            ✕
          </button>

          {index !== null && index > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
              }}
              aria-label="이전 사진"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-6"
            >
              ‹
            </button>
          )}
          {index !== null && index < photos.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i === null ? i : Math.min(i + 1, photos.length - 1)));
              }}
              aria-label="다음 사진"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-6"
            >
              ›
            </button>
          )}

          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.image_url}
              alt={current.caption ?? albumTitle}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
