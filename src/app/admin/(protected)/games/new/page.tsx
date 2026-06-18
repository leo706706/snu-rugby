"use client";

import GameForm from "@/components/admin/GameForm";
import BackLink from "@/components/admin/BackLink";
import { createGame } from "@/lib/actions/games";

export default function NewGamePage() {
  return (
    <div>
      <BackLink href="/admin/games" label="경기일정 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">경기 추가</h1>
      <div className="mt-6">
        <GameForm onSubmit={createGame} />
      </div>
    </div>
  );
}
