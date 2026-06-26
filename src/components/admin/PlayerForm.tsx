"use client";

import { useState } from "react";
import PhotoField from "@/components/admin/PhotoField";
import type { Player, Division, PlayerStatus } from "@/types/database";
import type { PlayerInput } from "@/lib/actions/players";

const PHOTO_ASPECT = 4 / 5;

const POSITIONS = [
  "Prop",
  "Hooker",
  "Lock",
  "Flanker",
  "Number 8",
  "Scrum-half",
  "Fly-half",
  "Center",
  "Wing",
  "Fullback",
  "Utility",
  "미정",
];

const JERSEY_NUMBERS = Array.from({ length: 15 }, (_, i) => i + 1);

const ROLES = ["주장", "부주장", "조교", "일반부원"];

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

export default function PlayerForm({
  initial,
  onSubmit,
}: {
  initial?: Player;
  onSubmit: (input: PlayerInput) => Promise<{ error?: string } | void>;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [nameEn, setNameEn] = useState(initial?.name_en ?? "");
  const [jerseyNumber, setJerseyNumber] = useState(initial?.jersey_number?.toString() ?? "");
  const [positions, setPositions] = useState<string[]>(
    initial?.position ? initial.position.split(",").map((p) => p.trim()).filter(Boolean) : [],
  );
  const [division, setDivision] = useState<Division>(initial?.division ?? "men");
  const [status, setStatus] = useState<PlayerStatus>(initial?.status ?? "current");
  const [studentId, setStudentId] = useState(initial?.student_id ?? "");
  const [heightCm, setHeightCm] = useState(initial?.height_cm?.toString() ?? "");
  const [weightKg, setWeightKg] = useState(initial?.weight_kg?.toString() ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [currentRole, setCurrentRole] = useState(initial?.current_role ?? "");
  const [pastRoles, setPastRoles] = useState(initial?.past_roles ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function togglePosition(pos: string) {
    setPositions((prev) => (prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit({
      name,
      name_en: nameEn || null,
      jersey_number: jerseyNumber ? Number(jerseyNumber) : null,
      position: positions.length > 0 ? positions.join(", ") : null,
      division,
      status,
      student_id: studentId || null,
      height_cm: heightCm ? Number(heightCm) : null,
      weight_kg: weightKg ? Number(weightKg) : null,
      photo_url: photoUrl || null,
      bio: bio || null,
      current_role: currentRole || null,
      past_roles: pastRoles || null,
    });

    setSubmitting(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>선수 사진</label>
        <PhotoField bucket="players" aspect={PHOTO_ASPECT} value={photoUrl} onChange={setPhotoUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>이름 *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>영문 이름</label>
          <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>구분</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value as Division)}
            className={inputClass}
          >
            <option value="men">남자부</option>
            <option value="women">여자부</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>재학/OB</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PlayerStatus)}
            className={inputClass}
          >
            <option value="current">재학생</option>
            <option value="ob">OB</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>등번호</label>
        <select
          value={jerseyNumber}
          onChange={(e) => setJerseyNumber(e.target.value)}
          className={`${inputClass} max-w-[160px]`}
        >
          <option value="">없음</option>
          {JERSEY_NUMBERS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>포지션 (복수 선택 가능)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {POSITIONS.map((pos) => {
            const selected = positions.includes(pos);
            return (
              <button
                key={pos}
                type="button"
                onClick={() => togglePosition(pos)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                  selected
                    ? "border-navy bg-navy text-white"
                    : "border-navy-100 text-neutral-600 hover:border-navy-300"
                }`}
              >
                {pos}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>현재 직책</label>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className={inputClass}
          >
            <option value="">없음</option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>이전 직책</label>
          <input
            value={pastRoles}
            onChange={(e) => setPastRoles(e.target.value)}
            placeholder="예: 2025년도 주장, 2023년도 부주장"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>학번</label>
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>키(cm)</label>
          <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>몸무게(kg)</label>
          <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>소개</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className={inputClass} />
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
