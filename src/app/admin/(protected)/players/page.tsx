import Link from "next/link";
import { getPlayers } from "@/lib/data/players";
import PlayerOrderGrid from "@/components/admin/PlayerOrderGrid";

export const dynamic = "force-dynamic";

export default async function AdminPlayersPage() {
  const players = await getPlayers();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">선수단</h1>
        <Link
          href="/admin/players/new"
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
        >
          + 선수 추가
        </Link>
      </div>

      {players.length === 0 ? (
        <p className="mt-16 text-center text-neutral-400">등록된 선수가 없습니다.</p>
      ) : (
        <PlayerOrderGrid players={players} />
      )}
    </div>
  );
}
