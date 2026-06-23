"use client";

import { useState } from "react";
import PhotoField from "@/components/admin/PhotoField";
import { updateAdvisor } from "@/lib/actions/advisor";
import type { Advisor } from "@/types/database";

const PHOTO_ASPECT = 4 / 5;

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

export default function AdvisorForm({ initial }: { initial: Advisor | null }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photo_url ?? "");
  const [career, setCareer] = useState(initial?.career ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);

    const result = await updateAdvisor({
      name,
      title,
      photo_url: photoUrl || null,
      career,
    });

    setSubmitting(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>지도교수 사진</label>
        <PhotoField bucket="players" aspect={PHOTO_ASPECT} value={photoUrl} onChange={setPhotoUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>이름</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>직함</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 서울대학교 OO학과 교수"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>경력사항</label>
        <textarea
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          rows={6}
          placeholder={"한 줄에 하나씩 입력하세요. 예:\n서울대학교 OO학과 교수\nOO학회 회장"}
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-emerald-600">저장됐습니다.</p>}

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
