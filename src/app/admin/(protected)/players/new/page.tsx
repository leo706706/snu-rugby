"use client";

import PlayerForm from "@/components/admin/PlayerForm";
import BackLink from "@/components/admin/BackLink";
import { createPlayer } from "@/lib/actions/players";

export default function NewPlayerPage() {
  return (
    <div>
      <BackLink href="/admin/players" label="선수단 목록으로" />
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900">선수 추가</h1>
      <div className="mt-6">
        <PlayerForm onSubmit={createPlayer} />
      </div>
    </div>
  );
}
