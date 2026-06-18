"use client";

import { useEffect } from "react";
import type { Game } from "@/types/database";

const DIVISION_LABEL: Record<Game["division"], string> = {
  men: "남자부",
  women: "여자부",
};

const STATUS_LABEL: Record<Game["status"], string> = {
  scheduled: "예정",
  completed: "완료",
  cancelled: "취소",
};

const RESULT_LABEL: Record<NonNullable<Game["result"]>, string> = {
  win: "승",
  loss: "패",
  draw: "무",
};

const RESULT_COLOR: Record<NonNullable<Game["result"]>, string> = {
  win: "bg-emerald-50 text-emerald-700",
  loss: "bg-red-50 text-red-700",
  draw: "bg-neutral-100 text-neutral-600",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GameModal({
  game,
  onClose,
}: {
  game: Game | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!game) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [game, onClose]);

  if (!game) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-neutral-700 hover:bg-navy-100"
          aria-label="닫기"
        >
          ✕
        </button>

        <p className="text-xs font-medium text-navy-400">
          {game.status === "cancelled" ? "취소됨" : formatDate(game.game_date)}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-neutral-900">vs {game.opponent}</h3>
        <p className="mt-1 text-sm text-neutral-500">
          {game.title} · {DIVISION_LABEL[game.division]} · {game.is_home ? "홈" : "어웨이"}
          {game.location ? ` · ${game.location}` : ""}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-navy-50 pt-5">
          <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy">
            {STATUS_LABEL[game.status]}
          </span>
          {game.status === "completed" && game.result && (
            <>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${RESULT_COLOR[game.result]}`}
              >
                {RESULT_LABEL[game.result]}
              </span>
              <span className="text-lg font-semibold text-neutral-900">
                {game.our_score} : {game.opponent_score}
              </span>
            </>
          )}
        </div>

        {game.notes && (
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
            {game.notes}
          </p>
        )}
      </div>
    </div>
  );
}
