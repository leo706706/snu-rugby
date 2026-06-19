import Image from "next/image";
import { getInstagramFeed } from "@/lib/instagram";
import { getSiteSettings } from "@/lib/data/settings";

export default async function InstagramFeed() {
  const [posts, { instagramUrl, instagramHandle }] = await Promise.all([
    getInstagramFeed(4),
    getSiteSettings(),
  ]);

  return (
    <section className="section">
      <div className="container-page">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">
              Instagram
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
              {instagramHandle}
            </h2>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-navy hover:underline"
          >
            팔로우하기 →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-navy-50"
            >
              <Image
                src={post.mediaUrl}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 640px) 25vw, 50vw"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
