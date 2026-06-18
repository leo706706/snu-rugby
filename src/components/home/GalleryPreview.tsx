import Image from "next/image";
import Link from "next/link";
import { getRecentPhotos } from "@/lib/data/gallery";
import FadeIn from "@/components/common/FadeIn";

export default async function GalleryPreview() {
  const photos = await getRecentPhotos(8);

  if (photos.length === 0) return null;

  return (
    <section className="section bg-navy-50/40">
      <div className="container-page">
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">
              Gallery
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
              갤러리 하이라이트
            </h2>
          </div>
          <Link href="/gallery" className="text-sm font-medium text-navy hover:underline">
            사진 더보기 →
          </Link>
        </FadeIn>

        <FadeIn delay={100} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href="/gallery"
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-navy-50"
            >
              <Image
                src={photo.image_url}
                alt={photo.caption ?? ""}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            </Link>
          ))}
        </FadeIn>

        <FadeIn delay={150} className="mt-8 flex justify-center">
          <Link
            href="/gallery"
            className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-700"
          >
            사진 더보기
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
