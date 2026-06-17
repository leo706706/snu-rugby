"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import type { GalleryPhoto } from "@/types/database";
import { addPhotos, deletePhoto } from "@/lib/actions/gallery";

const IMAGE_ACCEPT = { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] };

export default function PhotoManager({
  albumId,
  photos,
}: {
  albumId: string;
  photos: GalleryPhoto[];
}) {
  const router = useRouter();

  return (
    <div>
      <p className="text-sm font-medium text-neutral-700">사진</p>

      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl bg-navy-50">
            <Image src={photo.image_url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={async () => {
                if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;
                await deletePhoto(photo.id, albumId);
                router.refresh();
              }}
              className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 max-w-xl">
        <Dropzone
          bucket="gallery"
          pathPrefix={albumId}
          multiple
          accept={IMAGE_ACCEPT}
          label="사진을 드래그하거나 클릭해서 업로드 (여러 장 가능)"
          onUploaded={async (urls) => {
            await addPhotos(albumId, urls);
            router.refresh();
          }}
        />
      </div>
    </div>
  );
}
