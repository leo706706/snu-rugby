import Image from "next/image";
import Link from "next/link";
import { getAlbums } from "@/lib/data/gallery";
import { getBanner } from "@/lib/data/banners";
import PageBanner from "@/components/common/PageBanner";
import FadeIn from "@/components/common/FadeIn";

export const dynamic = "force-dynamic";

function formatDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });
}

export default async function GalleryPage() {
  const [albums, bannerImage] = await Promise.all([getAlbums(), getBanner("gallery")]);

  return (
    <div>
      <PageBanner
        imageUrl={bannerImage}
        title="갤러리"
        subtitle="앨범별로 모아보는 서울대학교 럭비부의 순간들입니다."
      />
      <div className="section">
        <div className="container-page">
          {albums.length === 0 ? (
            <p className="mt-16 text-center text-neutral-400">등록된 앨범이 없습니다.</p>
          ) : (
            <FadeIn className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/gallery/${album.id}`}
                  className="group overflow-hidden rounded-2xl border border-navy-50 bg-white"
                >
                  <div className="relative aspect-[4/3] bg-navy-50">
                    {album.cover_image_url ? (
                      <Image
                        src={album.cover_image_url}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 50vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-navy-200">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-neutral-900">{album.title}</p>
                    <p className="mt-1 text-sm text-neutral-400">
                      {formatDate(album.album_date)}
                      {album.gallery_photos?.[0]?.count
                        ? ` · 사진 ${album.gallery_photos[0].count}장`
                        : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
