"use client";

import { useState } from "react";
import type { Player } from "@/types/database";
import PlayerCard from "@/components/players/PlayerCard";
import PlayerModal from "@/components/players/PlayerModal";

export default function PlayerGrid({ players }: { players: Player[] }) {
  const [selected, setSelected] = useState<Player | null>(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => (
          <button
            key={player.id}
            type="button"
            onClick={() => setSelected(player)}
            className="text-left"
          >
            <PlayerCard player={player} />
          </button>
        ))}
      </div>
      <PlayerModal player={selected} onClose={() => setSelected(null)} />
    </>
  );
}
