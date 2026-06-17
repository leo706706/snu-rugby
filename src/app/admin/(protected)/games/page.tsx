import Link from "next/link";
import { getAllGames } from "@/lib/data/games";
import { deleteGame } from "@/lib/actions/games";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

const DIVISION_LABEL = { men: "남자부", women: "여자부" };
const STATUS_LABEL = { scheduled: "예정", completed: "완료", cancelled: "취소" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-50">
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
            {games.map((game) => (
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
            {games.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                  등록된 경기가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
