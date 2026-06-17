import { Suspense } from "react";
import { getPlayers } from "@/lib/data/players";
import PlayerFilters from "@/components/players/PlayerFilters";
import PlayerGrid from "@/components/players/PlayerGrid";
import type { Division, PlayerStatus } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ division?: string; status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const players = await getPlayers({
    division: (params.division as Division) || undefined,
    status: (params.status as PlayerStatus) || undefined,
    search: params.q || undefined,
  });

  return (
    <div className="section">
      <div className="container-page">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">선수단</h1>
        <p className="mt-2 text-neutral-500">서울대학교 럭비부 선수단을 소개합니다.</p>

        <div className="mt-10">
          <Suspense>
            <PlayerFilters />
          </Suspense>
        </div>

        {players.length === 0 ? (
          <p className="mt-16 text-center text-neutral-400">조건에 맞는 선수가 없습니다.</p>
        ) : (
          <PlayerGrid players={players} />
        )}
      </div>
    </div>
  );
}
