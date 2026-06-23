"use client";

import { useState } from "react";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import ImageCropper from "@/components/admin/ImageCropper";
import { uploadFile } from "@/lib/uploadFile";
import type { Player, Division, PlayerStatus } from "@/types/database";
import type { PlayerInput } from "@/lib/actions/players";

const PHOTO_ASPECT = 4 / 5;

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
  const [recropFile, setRecropFile] = useState<File | null>(null);
  const [recropping, setRecropping] = useState(false);
  const [recropError, setRecropError] = useState<string | null>(null);

  async function handleStartRecrop() {
    if (!photoUrl) return;
    setRecropping(true);
    setRecropError(null);
    try {
      const res = await fetch(photoUrl);
      if (!res.ok) throw new Error("사진을 불러오지 못했습니다.");
      const blob = await res.blob();
      const fileName = decodeURIComponent(photoUrl.split("/").pop() ?? "photo.jpg");
      setRecropFile(new File([blob], fileName, { type: blob.type || "image/jpeg" }));
    } catch (err) {
      setRecropError(err instanceof Error ? err.message : "사진을 불러오지 못했습니다.");
    } finally {
      setRecropping(false);
    }
  }

  async function handleRecropped(croppedFile: File) {
    setRecropping(true);
    setRecropError(null);
    try {
      const url = await uploadFile("players", croppedFile);
      setPhotoUrl(url);
      setRecropFile(null);
    } catch (err) {
      setRecropError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setRecropping(false);
    }
  }

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

        {recropFile ? (
          <div className="mt-2">
            <ImageCropper
              file={recropFile}
              aspect={PHOTO_ASPECT}
              onCancel={() => setRecropFile(null)}
              onCropped={handleRecropped}
            />
          </div>
        ) : (
          <>
            {photoUrl && (
              <div className="group relative mt-2 h-40 w-32 overflow-hidden rounded-xl bg-navy-50">
                <Image src={photoUrl} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={handleStartRecrop}
                  disabled={recropping}
                  className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                >
                  {recropping ? "불러오는 중..." : "재자르기"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;
                    setPhotoUrl("");
                  }}
                  className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  삭제
                </button>
              </div>
            )}
            {recropError && <p className="mt-2 text-sm text-red-600">{recropError}</p>}
            <div className="mt-2">
              <Dropzone
                bucket="players"
                accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
                onUploaded={(urls) => setPhotoUrl(urls[0])}
                label="사진을 드래그하거나 클릭해서 업로드"
                cropAspect={PHOTO_ASPECT}
              />
            </div>
          </>
        )}
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
