"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Player } from "@/types/database";
import { deletePlayer, movePlayer } from "@/lib/actions/players";
import DeleteButton from "@/components/admin/DeleteButton";

const DIVISION_LABEL = { men: "남자부", women: "여자부" };
const STATUS_LABEL = { current: "재학생", ob: "OB" };

export default function PlayerOrderGrid({ players }: { players: Player[] }) {
  const router = useRouter();
  const [movingId, setMovingId] = useState<string | null>(null);

  async function handleMove(playerId: string, direction: "up" | "down") {
    setMovingId(playerId);
    await movePlayer(playerId, direction);
    setMovingId(null);
    router.refresh();
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {players.map((player, i) => (
        <div key={player.id} className="overflow-hidden rounded-2xl border border-navy-50 bg-white">
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
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(player.id, "up")}
                  disabled={i === 0 || movingId === player.id}
                  aria-label="순서 위로"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-navy-50 hover:text-navy disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(player.id, "down")}
                  disabled={i === players.length - 1 || movingId === player.id}
                  aria-label="순서 아래로"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-navy-50 hover:text-navy disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
              <div className="flex items-center gap-3">
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
        </div>
      ))}
    </div>
  );
}
