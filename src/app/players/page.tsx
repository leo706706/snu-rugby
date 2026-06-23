import { Suspense } from "react";
import { getPlayers } from "@/lib/data/players";
import { getBannerData } from "@/lib/data/banners";
import { getAdvisor } from "@/lib/data/advisor";
import PlayerFilters from "@/components/players/PlayerFilters";
import PlayerGrid from "@/components/players/PlayerGrid";
import AdvisorCard from "@/components/players/AdvisorCard";
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
  const [players, banner, advisor] = await Promise.all([
    getPlayers({
      division: (params.division as Division) || undefined,
      status: (params.status as PlayerStatus) || undefined,
      search: params.q || undefined,
    }),
    getBannerData("players"),
    getAdvisor(),
  ]);

  return (
    <div>
      <PageBanner
        imageUrl={banner.imageUrl}
        title="선수단"
        subtitle="서울대학교 럭비부 선수단을 소개합니다."
        positionDesktop={banner.positionDesktop}
        positionMobile={banner.positionMobile}
      />
      <div className="section">
        <div className="container-page">
          {advisor?.name && (
            <FadeIn className="mt-10">
              <AdvisorCard advisor={advisor} />
            </FadeIn>
          )}

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
