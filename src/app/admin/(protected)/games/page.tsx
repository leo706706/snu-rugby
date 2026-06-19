import Link from "next/link";
import { getAllGames } from "@/lib/data/games";
import GameTable from "@/components/admin/GameTable";

export const dynamic = "force-dynamic";

export default async function AdminGamesPage() {
  const games = await getAllGames();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">경기</h1>
        <Link
          href="/admin/games/new"
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700"
        >
          + 경기 추가
        </Link>
      </div>

      <GameTable games={games} />
    </div>
  );
}
