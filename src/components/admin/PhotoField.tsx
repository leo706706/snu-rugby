"use client";

import { useState } from "react";
import Image from "next/image";
import Dropzone from "@/components/admin/Dropzone";
import ImageCropper from "@/components/admin/ImageCropper";
import { uploadFile } from "@/lib/uploadFile";

export default function PhotoField({
  bucket,
  aspect,
  value,
  onChange,
  previewClassName = "h-40 w-32",
}: {
  bucket: string;
  aspect: number;
  value: string;
  onChange: (url: string) => void;
  previewClassName?: string;
}) {
  const [recropFile, setRecropFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStartRecrop() {
    if (!value) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(value);
      if (!res.ok) throw new Error("사진을 불러오지 못했습니다.");
      const blob = await res.blob();
      const fileName = decodeURIComponent(value.split("/").pop() ?? "photo.jpg");
      setRecropFile(new File([blob], fileName, { type: blob.type || "image/jpeg" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "사진을 불러오지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }

  async function handleRecropped(croppedFile: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await uploadFile(bucket, croppedFile);
      onChange(url);
      setRecropFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  if (recropFile) {
    return (
      <div className="mt-2">
        <ImageCropper
          file={recropFile}
          aspect={aspect}
          onCancel={() => setRecropFile(null)}
          onCropped={handleRecropped}
        />
      </div>
    );
  }

  return (
    <div>
      {value && (
        <div className={`group relative mt-2 overflow-hidden rounded-xl bg-navy-50 ${previewClassName}`}>
          <Image src={value} alt="" fill className="object-cover" />
          <button
            type="button"
            onClick={handleStartRecrop}
            disabled={busy}
            className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
          >
            {busy ? "처리 중..." : "재자르기"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;
              onChange("");
            }}
            className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            삭제
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <div className="mt-2">
        <Dropzone
          bucket={bucket}
          accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
          onUploaded={(urls) => onChange(urls[0])}
          label="사진을 드래그하거나 클릭해서 업로드"
          cropAspect={aspect}
        />
      </div>
    </div>
  );
}
