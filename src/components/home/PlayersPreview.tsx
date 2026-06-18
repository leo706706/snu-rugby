import Link from "next/link";
import { getPlayers } from "@/lib/data/players";
import PlayerGrid from "@/components/players/PlayerGrid";
import FadeIn from "@/components/common/FadeIn";

export default async function PlayersPreview() {
  const players = await getPlayers({ status: "current" });
  const featured = players.slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="section bg-navy-50/40">
      <div className="container-page">
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">
              Players
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">선수단</h2>
          </div>
          <Link href="/players" className="text-sm font-medium text-navy hover:underline">
            전체보기 →
          </Link>
        </FadeIn>

        <FadeIn delay={100}>
          <PlayerGrid players={featured} />
        </FadeIn>
      </div>
    </section>
  );
}
