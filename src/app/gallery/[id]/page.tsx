import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlbum } from "@/lib/data/gallery";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";

export const dynamic = "force-dynamic";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbum(id).catch(() => null);

  if (!album) notFound();

  const photos = [...album.gallery_photos].sort((a, b) => a.order_index - b.order_index);

  return (
    <div className="section">
      <div className="container-page">
        <Link href="/gallery" className="text-sm text-navy-400 hover:text-navy">
          ← 갤러리로
        </Link>

        <h1 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">{album.title}</h1>
        {album.description && (
          <p className="mt-2 text-neutral-500">{album.description}</p>
        )}

        {photos.length === 0 ? (
          <p className="mt-16 text-center text-neutral-400">등록된 사진이 없습니다.</p>
        ) : (
          <PhotoLightbox photos={photos} albumTitle={album.title} />
        )}
      </div>
    </div>
  );
}
