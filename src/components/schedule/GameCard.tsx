import type { Game } from "@/types/database";

const DIVISION_LABEL: Record<Game["division"], string> = {
  men: "남자부",
  women: "여자부",
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
  const date = new Date(iso);
  return date.toLocaleString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-navy-50 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-navy-400">
          <span className="rounded-full bg-navy-50 px-2.5 py-1">
            {DIVISION_LABEL[game.division]}
          </span>
          <span>{game.status === "cancelled" ? "취소됨" : formatDate(game.game_date)}</span>
        </div>
        <p className="mt-2 text-lg font-semibold text-neutral-900">
          vs {game.opponent}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          {game.title}
          {game.location ? ` · ${game.location}` : ""}
          {" · "}
          {game.is_home ? "홈" : "어웨이"}
        </p>
      </div>

      {game.status === "completed" && game.result && (
        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${RESULT_COLOR[game.result]}`}
          >
            {RESULT_LABEL[game.result]}
          </span>
          <span className="text-lg font-semibold text-neutral-900">
            {game.our_score} : {game.opponent_score}
          </span>
        </div>
      )}
    </div>
  );
}
