import Link from "next/link";
import Image from "next/image";
import { getPlayers } from "@/lib/data/players";
import { deletePlayer } from "@/lib/actions/players";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const DIVISION_LABEL = { men: "남자부", women: "여자부" };
const STATUS_LABEL = { current: "재학생", ob: "OB" };

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
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {players.map((player) => (
            <div
              key={player.id}
              className="overflow-hidden rounded-2xl border border-navy-50 bg-white"
            >
              <div className="relative aspect-[4/5] bg-navy-50">
                {player.photo_url ? (
                  <Image
                    src={player.photo_url}
                    alt={player.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl font-semibold text-navy-200">
                    {player.name.slice(0, 1)}
                  </div>
                )}
                {player.jersey_number !== null && (
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                    {player.jersey_number}
                  </span>
                )}
                {player.status === "ob" && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-navy">
                    OB
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="font-semibold text-neutral-900">{player.name}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {DIVISION_LABEL[player.division]}
                  {player.position ? ` · ${player.position}` : ""}
                </p>
                <p className="mt-1 text-xs text-neutral-400">{STATUS_LABEL[player.status]}</p>

                <div className="mt-3 flex items-center justify-between border-t border-navy-50 pt-3">
                  <Link
                    href={`/admin/players/${player.id}`}
                    className="text-sm font-medium text-navy hover:underline"
                  >
                    수정
                  </Link>
                  <DeleteButton action={deletePlayer.bind(null, player.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
