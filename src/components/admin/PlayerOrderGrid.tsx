"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Division, Player, PlayerStatus } from "@/types/database";
import { deletePlayer, movePlayer } from "@/lib/actions/players";
import DeleteButton from "@/components/admin/DeleteButton";

const DIVISION_LABEL: Record<Division, string> = { men: "남자부", women: "여자부" };
const STATUS_LABEL: Record<PlayerStatus, string> = { current: "재학생", ob: "OB" };

export default function PlayerOrderGrid({ players }: { players: Player[] }) {
  const router = useRouter();
  const [movingId, setMovingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState<Division | "">("");
  const [status, setStatus] = useState<PlayerStatus | "">("");

  const hasFilter = search.trim() !== "" || division !== "" || status !== "";

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return players.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !(p.name_en ?? "").toLowerCase().includes(q)) {
        return false;
      }
      if (division && p.division !== division) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }, [players, search, division, status]);

  async function handleMove(playerId: string, direction: "up" | "down") {
    setMovingId(playerId);
    await movePlayer(playerId, direction);
    setMovingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="이름으로 검색"
          className="w-full max-w-xs rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
        />
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value as Division | "")}
          className="rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
        >
          <option value="">전체 구분</option>
          <option value="men">남자부</option>
          <option value="women">여자부</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PlayerStatus | "")}
          className="rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
        >
          <option value="">전체</option>
          <option value="current">재학생</option>
          <option value="ob">OB</option>
        </select>
      </div>

      {hasFilter && (
        <p className="mt-3 text-xs text-neutral-400">
          검색/필터 중에는 순서 변경 버튼이 비활성화됩니다. 전체 목록에서 순서를 바꿔주세요.
        </p>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-neutral-400">검색 결과가 없습니다.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((player, i) => (
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
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900">{player.name}</p>
                  {player.current_role && player.current_role !== "일반부원" && (
                    <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy">
                      {player.current_role}
                    </span>
                  )}
                </div>
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
                      disabled={hasFilter || i === 0 || movingId === player.id}
                      aria-label="순서 위로"
                      className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-400 hover:bg-navy-50 hover:text-navy disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(player.id, "down")}
                      disabled={hasFilter || i === filtered.length - 1 || movingId === player.id}
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
      )}
    </div>
  );
}
