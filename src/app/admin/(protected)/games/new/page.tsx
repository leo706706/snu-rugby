"use client";

import GameForm from "@/components/admin/GameForm";
import { createGame } from "@/lib/actions/games";

export default function NewGamePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">경기 추가</h1>
      <div className="mt-6">
        <GameForm onSubmit={createGame} />
      </div>
    </div>
  );
}
