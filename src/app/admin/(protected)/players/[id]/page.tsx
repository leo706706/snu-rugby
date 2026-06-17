import { notFound } from "next/navigation";
import { getPlayer } from "@/lib/data/players";
import { updatePlayer } from "@/lib/actions/players";
import PlayerForm from "@/components/admin/PlayerForm";

export const dynamic = "force-dynamic";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayer(id).catch(() => null);
  if (!player) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">선수 수정</h1>
      <div className="mt-6">
        <PlayerForm initial={player} onSubmit={updatePlayer.bind(null, id)} />
      </div>
    </div>
  );
}
