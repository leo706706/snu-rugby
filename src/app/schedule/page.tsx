import type { Game } from "@/types/database";
import { getAllGames } from "@/lib/data/games";
import { getBanner } from "@/lib/data/banners";
import GameCard from "@/components/schedule/GameCard";
import PageBanner from "@/components/common/PageBanner";
import FadeIn from "@/components/common/FadeIn";

export const dynamic = "force-dynamic";

function DivisionGroup({ label, games }: { label: string; games: Game[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-400">{label}</h3>
      {games.length === 0 ? (
        <p className="mt-4 text-neutral-400">기록이 없습니다.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function SchedulePage() {
  const [games, bannerImage] = await Promise.all([getAllGames(), getBanner("schedule")]);
  const now = Date.now();
  const upcoming = games
    .filter((g) => new Date(g.game_date).getTime() >= now)
    .sort((a, b) => new Date(a.game_date).getTime() - new Date(b.game_date).getTime());
  const past = games
    .filter((g) => new Date(g.game_date).getTime() < now)
    .sort((a, b) => new Date(b.game_date).getTime() - new Date(a.game_date).getTime());

  return (
    <div>
      <PageBanner
        imageUrl={bannerImage}
        title="경기 일정 및 결과"
        subtitle="서울대학교 럭비부의 경기 일정과 결과입니다."
      />
      <div className="section">
        <div className="container-page">
          <FadeIn as="section" className="mt-12">
            <h2 className="text-xl font-semibold text-neutral-900">다가오는 경기</h2>
            <DivisionGroup label="남자부" games={upcoming.filter((g) => g.division === "men")} />
            <DivisionGroup label="여자부" games={upcoming.filter((g) => g.division === "women")} />
          </FadeIn>

          <FadeIn as="section" className="mt-16">
            <h2 className="text-xl font-semibold text-neutral-900">지난 경기</h2>
            <DivisionGroup label="남자부" games={past.filter((g) => g.division === "men")} />
            <DivisionGroup label="여자부" games={past.filter((g) => g.division === "women")} />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
