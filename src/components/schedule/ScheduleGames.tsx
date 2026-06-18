"use client";

import { useState } from "react";
import type { Game } from "@/types/database";
import GameCard from "@/components/schedule/GameCard";
import GameModal from "@/components/schedule/GameModal";
import FadeIn from "@/components/common/FadeIn";

function DivisionGroup({
  label,
  games,
  onSelect,
}: {
  label: string;
  games: Game[];
  onSelect: (game: Game) => void;
}) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-400">{label}</h3>
      {games.length === 0 ? (
        <p className="mt-4 text-neutral-400">기록이 없습니다.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {games.map((game) => (
            <button
              key={game.id}
              type="button"
              onClick={() => onSelect(game)}
              className="text-left"
            >
              <GameCard game={game} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ScheduleGames({
  upcoming,
  past,
}: {
  upcoming: Game[];
  past: Game[];
}) {
  const [selected, setSelected] = useState<Game | null>(null);

  return (
    <>
      <FadeIn as="section" className="mt-12">
        <h2 className="text-xl font-semibold text-neutral-900">다가오는 경기</h2>
        <DivisionGroup
          label="남자부"
          games={upcoming.filter((g) => g.division === "men")}
          onSelect={setSelected}
        />
        <DivisionGroup
          label="여자부"
          games={upcoming.filter((g) => g.division === "women")}
          onSelect={setSelected}
        />
      </FadeIn>

      <FadeIn as="section" className="mt-16">
        <h2 className="text-xl font-semibold text-neutral-900">지난 경기</h2>
        <DivisionGroup
          label="남자부"
          games={past.filter((g) => g.division === "men")}
          onSelect={setSelected}
        />
        <DivisionGroup
          label="여자부"
          games={past.filter((g) => g.division === "women")}
          onSelect={setSelected}
        />
      </FadeIn>

      <GameModal game={selected} onClose={() => setSelected(null)} />
    </>
  );
}
