import { notFound } from "next/navigation";
import { getGame } from "@/lib/data/games";
import { updateGame } from "@/lib/actions/games";
import GameForm from "@/components/admin/GameForm";
import BackLink from "@/components/admin/BackLink";

export const dynamic = "force-dynamic";

export default async function EditGamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGame(id).catch(() => null);
  if (!game) notFound();

  return (
    <div>
      <BackLink href="/admin/games" label="경기일정 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">경기 수정</h1>
      <div className="mt-6">
        <GameForm initial={game} onSubmit={updateGame.bind(null, id)} />
      </div>
    </div>
  );
}
