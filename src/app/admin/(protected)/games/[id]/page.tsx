import { notFound } from "next/navigation";
import { getGame } from "@/lib/data/games";
import { updateGame } from "@/lib/actions/games";
import GameForm from "@/components/admin/GameForm";

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
      <h1 className="text-2xl font-semibold text-neutral-900">경기 수정</h1>
      <div className="mt-6">
        <GameForm initial={game} onSubmit={updateGame.bind(null, id)} />
      </div>
    </div>
  );
}
