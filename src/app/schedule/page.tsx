import { getAllGames } from "@/lib/data/games";
import { getBanner } from "@/lib/data/banners";
import PageBanner from "@/components/common/PageBanner";
import ScheduleGames from "@/components/schedule/ScheduleGames";

export const dynamic = "force-dynamic";

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
        objectPosition="center 13%"
      />
      <div className="section">
        <div className="container-page">
          <ScheduleGames upcoming={upcoming} past={past} />
        </div>
      </div>
    </div>
  );
}
