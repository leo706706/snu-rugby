"use client";

import PlayerForm from "@/components/admin/PlayerForm";
import { createPlayer } from "@/lib/actions/players";

export default function NewPlayerPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">선수 추가</h1>
      <div className="mt-6">
        <PlayerForm onSubmit={createPlayer} />
      </div>
    </div>
  );
}
