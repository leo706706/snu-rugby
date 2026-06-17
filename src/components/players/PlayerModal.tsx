"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Player } from "@/types/database";

const DIVISION_LABEL: Record<Player["division"], string> = {
  men: "남자부",
  women: "여자부",
};

export default function PlayerModal({
  player,
  onClose,
}: {
  player: Player | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!player) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [player, onClose]);

  if (!player) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl bg-white sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow hover:bg-white"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="relative w-full bg-navy-50 sm:w-1/2">
          {player.photo_url ? (
            <div className="relative aspect-square w-full sm:h-full">
              <Image
                src={player.photo_url}
                alt={player.name}
                fill
                className="object-contain"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center text-6xl font-semibold text-navy-200 sm:h-full">
              {player.name.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-4 p-6 sm:w-1/2">
          <div>
            <div className="flex items-center gap-2">
              {player.jersey_number !== null && (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
                  {player.jersey_number}
                </span>
              )}
              {player.status === "ob" && (
                <span className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy">
                  OB
                </span>
              )}
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-900">{player.name}</h3>
            {player.name_en && <p className="text-sm text-neutral-400">{player.name_en}</p>}
            <p className="mt-1 text-sm text-neutral-500">
              {DIVISION_LABEL[player.division]}
              {player.position ? ` · ${player.position}` : ""}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3 border-t border-navy-50 pt-4 text-sm">
            {player.student_id && (
              <div>
                <dt className="text-neutral-400">학번</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{player.student_id}</dd>
              </div>
            )}
            {player.height_cm !== null && (
              <div>
                <dt className="text-neutral-400">키</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{player.height_cm}cm</dd>
              </div>
            )}
            {player.weight_kg !== null && (
              <div>
                <dt className="text-neutral-400">몸무게</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{player.weight_kg}kg</dd>
              </div>
            )}
          </dl>

          {player.bio && (
            <div className="border-t border-navy-50 pt-4">
              <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-600">
                {player.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
