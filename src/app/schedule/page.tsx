import { getAllGames } from "@/lib/data/games";
import GameCard from "@/components/schedule/GameCard";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const games = await getAllGames();
  const now = Date.now();
  const upcoming = games
    .filter((g) => new Date(g.game_date).getTime() >= now)
    .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime());
  const past = games
    .filter((g) => new Date(g.game_date).getTime() < now)
    .sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime());

  return (
    <div className="section">
      <div className="container-page">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">경기 일정 및 결과</h1>
        <p className="mt-2 text-neutral-500">서울대학교 럭비부의 경기 일정과 결과입니다.</p>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-neutral-900">다가오는 경기</h2>
          {upcoming.length === 0 ? (
            <p className="mt-6 text-neutral-400">예정된 경기가 없습니다.</p>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {upcoming.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-neutral-900">지난 경기</h2>
          {past.length === 0 ? (
            <p className="mt-6 text-neutral-400">지난 경기 기록이 없습니다.</p>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {past.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
