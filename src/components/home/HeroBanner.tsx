import Image from "next/image";
import Link from "next/link";

export default function HeroBanner({
  imageUrl,
  instagramUrl,
  positionDesktop = 50,
  positionMobile = 50,
}: {
  imageUrl: string;
  instagramUrl: string;
  positionDesktop?: number;
  positionMobile?: number;
}) {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        style={{ objectPosition: `center ${positionMobile}%` }}
        className="object-cover brightness-[0.45] sm:hidden"
      />
      <Image
        src={imageUrl}
        alt=""
        fill
        priority
        style={{ objectPosition: `center ${positionDesktop}%` }}
        className="hidden object-cover brightness-[0.45] sm:block"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
        <h1 className="text-[clamp(1.8em,6vw,4.5em)] font-bold leading-tight tracking-tight">
          SEOUL NATIONAL UNIVERSITY RUGBY
        </h1>
        <p className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-white/70 sm:text-base">
          One for All, All for One
        </p>
        <Link
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy transition-transform hover:scale-105"
        >
          Join the Team
        </Link>
      </div>
    </section>
  );
}
