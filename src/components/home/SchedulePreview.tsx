import Link from "next/link";
import { getAllGames } from "@/lib/data/games";
import GameCard from "@/components/schedule/GameCard";
import FadeIn from "@/components/common/FadeIn";

export default async function SchedulePreview() {
  const games = await getAllGames();
  const now = Date.now();

  const upcoming = games
    .filter((g) => new Date(g.game_date).getTime() >= now)
    .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime());
  const past = games
    .filter((g) => new Date(g.game_date).getTime() < now)
    .sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime());

  const featured = [...upcoming.slice(0, 2), ...past.slice(0, 1)];

  if (featured.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">
              Schedule
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">경기 일정</h2>
          </div>
          <Link href="/schedule" className="text-sm font-medium text-navy hover:underline">
            전체보기 →
          </Link>
        </FadeIn>

        <FadeIn delay={100} className="mt-10 flex flex-col gap-4">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
