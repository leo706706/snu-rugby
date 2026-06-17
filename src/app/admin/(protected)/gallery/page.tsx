import Link from "next/link";
import { getAlbums } from "@/lib/data/gallery";
import { deleteAlbum } from "@/lib/actions/gallery";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const albums = await getAlbums();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">갤러리</h1>
        <Link
          href="/admin/gallery/new"
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
        >
          + 앨범 추가
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-50">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-navy-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">앨범</th>
              <th className="px-4 py-3">사진 수</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {albums.map((album) => (
              <tr key={album.id}>
                <td className="px-4 py-3 font-medium text-neutral-900">{album.title}</td>
                <td className="px-4 py-3 text-neutral-500">{album.gallery_photos?.[0]?.count ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/gallery/${album.id}`}
                      className="text-sm font-medium text-navy hover:underline"
                    >
                      관리
                    </Link>
                    <DeleteButton action={deleteAlbum.bind(null, album.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {albums.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-neutral-400">
                  등록된 앨범이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
