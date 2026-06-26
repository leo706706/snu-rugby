import Image from "next/image";
import type { Player } from "@/types/database";

const DIVISION_LABEL: Record<Player["division"], string> = {
  men: "남자부",
  women: "여자부",
};

export default function PlayerCard({ player }: { player: Player }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-navy-50 bg-white transition-shadow hover:shadow-lg">
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
      </div>
    </div>
  );
}
