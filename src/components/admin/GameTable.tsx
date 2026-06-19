"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Division, Game, GameStatus } from "@/types/database";
import { deleteGame } from "@/lib/actions/games";
import DeleteButton from "@/components/admin/DeleteButton";

const DIVISION_LABEL: Record<Division, string> = { men: "남자부", women: "여자부" };
const STATUS_LABEL: Record<GameStatus, string> = { scheduled: "예정", completed: "완료", cancelled: "취소" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GameTable({ games }: { games: Game[] }) {
  const [search, setSearch] = useState("");
  const [division, setDivision] = useState<Division | "">("");
  const [status, setStatus] = useState<GameStatus | "">("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return games.filter((g) => {
      if (q && !g.opponent.toLowerCase().includes(q) && !g.title.toLowerCase().includes(q)) return false;
      if (division && g.division !== division) return false;
      if (status && g.status !== status) return false;
      return true;
    });
  }, [games, search, division, status]);

  return (
    <div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="상대팀·대회명으로 검색"
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
          onChange={(e) => setStatus(e.target.value as GameStatus | "")}
          className="rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
        >
          <option value="">전체 상태</option>
          <option value="scheduled">예정</option>
          <option value="completed">완료</option>
          <option value="cancelled">취소</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-navy-50">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-navy-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">일시</th>
              <th className="px-4 py-3">상대</th>
              <th className="px-4 py-3">구분</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">스코어</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {filtered.map((game) => (
              <tr key={game.id}>
                <td className="px-4 py-3">{formatDate(game.game_date)}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{game.opponent}</td>
                <td className="px-4 py-3">{DIVISION_LABEL[game.division]}</td>
                <td className="px-4 py-3">{STATUS_LABEL[game.status]}</td>
                <td className="px-4 py-3">
                  {game.our_score !== null && game.opponent_score !== null
                    ? `${game.our_score} : ${game.opponent_score}`
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/games/${game.id}`}
                      className="text-sm font-medium text-navy hover:underline"
                    >
                      수정
                    </Link>
                    <DeleteButton action={deleteGame.bind(null, game.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                  {games.length === 0 ? "등록된 경기가 없습니다." : "검색 결과가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
