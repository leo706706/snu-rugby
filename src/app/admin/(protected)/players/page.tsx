import Link from "next/link";
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

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-50">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-navy-50 text-neutral-500">
            <tr>
              <th className="px-4 py-3">번호</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">구분</th>
              <th className="px-4 py-3">재학/OB</th>
              <th className="px-4 py-3">포지션</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-4 py-3">{player.jersey_number ?? "-"}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">{player.name}</td>
                <td className="px-4 py-3">{DIVISION_LABEL[player.division]}</td>
                <td className="px-4 py-3">{STATUS_LABEL[player.status]}</td>
                <td className="px-4 py-3">{player.position ?? "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/players/${player.id}`}
                      className="text-sm font-medium text-navy hover:underline"
                    >
                      수정
                    </Link>
                    <DeleteButton action={deletePlayer.bind(null, player.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-neutral-400">
                  등록된 선수가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
