"use client";

import { useState } from "react";
import type { Game, Division, GameResult, GameStatus } from "@/types/database";
import type { GameInput } from "@/lib/actions/games";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

function toLocalInputValue(iso?: string) {
  const date = iso ? new Date(iso) : new Date();
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export default function GameForm({
  initial,
  onSubmit,
}: {
  initial?: Game;
  onSubmit: (input: GameInput) => Promise<{ error?: string } | void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [opponent, setOpponent] = useState(initial?.opponent ?? "");
  const [division, setDivision] = useState<Division>(initial?.division ?? "men");
  const [gameDate, setGameDate] = useState(toLocalInputValue(initial?.game_date));
  const [location, setLocation] = useState(initial?.location ?? "");
  const [isHome, setIsHome] = useState(initial?.is_home ?? true);
  const [status, setStatus] = useState<GameStatus>(initial?.status ?? "scheduled");
  const [ourScore, setOurScore] = useState(initial?.our_score?.toString() ?? "");
  const [opponentScore, setOpponentScore] = useState(initial?.opponent_score?.toString() ?? "");
  const [result, setResult] = useState<GameResult | "">(initial?.result ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result_ = await onSubmit({
      title,
      opponent,
      division,
      game_date: new Date(gameDate).toISOString(),
      location: location || null,
      is_home: isHome,
      status,
      our_score: ourScore ? Number(ourScore) : null,
      opponent_score: opponentScore ? Number(opponentScore) : null,
      result: result || null,
      notes: notes || null,
    });

    setSubmitting(false);
    if (result_?.error) setError(result_.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>대회명 *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>상대팀 *</label>
          <input required value={opponent} onChange={(e) => setOpponent(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>구분</label>
          <select value={division} onChange={(e) => setDivision(e.target.value as Division)} className={inputClass}>
            <option value="men">남자부</option>
            <option value="women">여자부</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>일시 *</label>
          <input
            type="datetime-local"
            required
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>장소</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>홈/어웨이</label>
          <select
            value={isHome ? "home" : "away"}
            onChange={(e) => setIsHome(e.target.value === "home")}
            className={inputClass}
          >
            <option value="home">홈</option>
            <option value="away">어웨이</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>상태</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as GameStatus)} className={inputClass}>
            <option value="scheduled">예정</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
        </div>
      </div>

      {status === "completed" && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>우리 점수</label>
            <input type="number" value={ourScore} onChange={(e) => setOurScore(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>상대 점수</label>
            <input
              type="number"
              value={opponentScore}
              onChange={(e) => setOpponentScore(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>결과</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value as GameResult | "")}
              className={inputClass}
            >
              <option value="">선택</option>
              <option value="win">승</option>
              <option value="loss">패</option>
              <option value="draw">무</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>비고</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputClass} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-60"
      >
        {submitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
