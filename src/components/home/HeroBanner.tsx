import Image from "next/image";
import Link from "next/link";

export default function HeroBanner({ imageUrl }: { imageUrl: string }) {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        className="object-cover object-[center_25%] brightness-[0.38]"
      />
      <div className="container-page relative z-10 flex flex-col items-center text-center text-white">
        <Image
          src="/images/rugby_logo.png"
          alt="SNU Rugby Club"
          width={80}
          height={80}
          className="mb-6"
        />
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
          Seoul National University
        </p>
        <h1 className="mt-3 text-[clamp(2.4em,6vw,5em)] font-bold leading-tight tracking-tightish">
          Rugby Club
        </h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70 sm:text-base">
          ONE FOR ALL, ALL FOR ONE
        </p>
        <div className="mt-10 flex gap-3">
          <Link
            href="/players"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            선수단 보기
          </Link>
          <Link
            href="/schedule"
            className="rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            경기 일정
          </Link>
        </div>
      </div>
    </section>
  );
}
