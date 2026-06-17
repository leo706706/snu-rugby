"use client";

import { useState } from "react";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import type { Player, Division, PlayerStatus } from "@/types/database";
import type { PlayerInput } from "@/lib/actions/players";

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
  const [position, setPosition] = useState(initial?.position ?? "");
  const [division, setDivision] = useState<Division>(initial?.division ?? "men");
  const [status, setStatus] = useState<PlayerStatus>(initial?.status ?? "current");
  const [studentId, setStudentId] = useState(initial?.student_id ?? "");
  const [heightCm, setHeightCm] = useState(initial?.height_cm?.toString() ?? "");
  const [weightKg, setWeightKg] = useState(initial?.weight_kg?.toString() ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit({
      name,
      name_en: nameEn || null,
      jersey_number: jerseyNumber ? Number(jerseyNumber) : null,
      position: position || null,
      division,
      status,
      student_id: studentId || null,
      height_cm: heightCm ? Number(heightCm) : null,
      weight_kg: weightKg ? Number(weightKg) : null,
      photo_url: photoUrl || null,
      bio: bio || null,
    });

    setSubmitting(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>선수 사진</label>
        {photoUrl && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-xl bg-navy-50">
            <Image src={photoUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="mt-2">
          <Dropzone
            bucket="players"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
            onUploaded={(urls) => setPhotoUrl(urls[0])}
            label="사진을 드래그하거나 클릭해서 업로드"
          />
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>등번호</label>
          <input
            type="number"
            value={jerseyNumber}
            onChange={(e) => setJerseyNumber(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>포지션</label>
          <input value={position} onChange={(e) => setPosition(e.target.value)} className={inputClass} />
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
