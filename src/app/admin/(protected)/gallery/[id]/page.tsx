import { notFound } from "next/navigation";
import { getAlbum } from "@/lib/data/gallery";
import { updateAlbum } from "@/lib/actions/gallery";
import AlbumForm from "@/components/admin/AlbumForm";
import PhotoManager from "@/components/admin/PhotoManager";

export const dynamic = "force-dynamic";

export default async function EditAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbum(id).catch(() => null);
  if (!album) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">앨범 수정</h1>
      <div className="mt-6">
        <AlbumForm initial={album} onSubmit={updateAlbum.bind(null, id)} />
      </div>
      <div className="mt-10 max-w-2xl">
        <PhotoManager albumId={id} photos={album.gallery_photos} />
      </div>
    </div>
  );
}
