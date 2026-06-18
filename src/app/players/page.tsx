import { Suspense } from "react";
import { getPlayers } from "@/lib/data/players";
import { getBanner } from "@/lib/data/banners";
import PlayerFilters from "@/components/players/PlayerFilters";
import PlayerGrid from "@/components/players/PlayerGrid";
import PageBanner from "@/components/common/PageBanner";
import FadeIn from "@/components/common/FadeIn";
import type { Division, PlayerStatus } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ division?: string; status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const [players, bannerImage] = await Promise.all([
    getPlayers({
      division: (params.division as Division) || undefined,
      status: (params.status as PlayerStatus) || undefined,
      search: params.q || undefined,
    }),
    getBanner("players"),
  ]);

  return (
    <div>
      <PageBanner
        imageUrl={bannerImage}
        title="선수단"
        subtitle="서울대학교 럭비부 선수단을 소개합니다."
        objectPosition="center 16%"
      />
      <div className="section">
        <div className="container-page">
          <div className="mt-10">
            <Suspense>
              <PlayerFilters />
            </Suspense>
          </div>

          {players.length === 0 ? (
            <p className="mt-16 text-center text-neutral-400">조건에 맞는 선수가 없습니다.</p>
          ) : (
            <FadeIn>
              <PlayerGrid players={players} />
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}
