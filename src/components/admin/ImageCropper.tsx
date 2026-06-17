"use client";

import { useCallback, useMemo, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

async function cropImageToBlob(imageSrc: string, area: Area, mimeType: string): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = area.width;
  canvas.height = area.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("캔버스를 생성할 수 없습니다.");

  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("이미지 자르기에 실패했습니다."))),
      mimeType,
      0.92,
    );
  });
}

export default function ImageCropper({
  file,
  aspect,
  onCancel,
  onCropped,
}: {
  file: File;
  aspect: number;
  onCancel: () => void;
  onCropped: (file: File) => void;
}) {
  const imageSrc = useMemo(() => URL.createObjectURL(file), [file]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedArea) return;
    setProcessing(true);
    try {
      const mimeType = file.type || "image/jpeg";
      const blob = await cropImageToBlob(imageSrc, croppedArea, mimeType);
      onCropped(new File([blob], file.name, { type: mimeType }));
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="rounded-xl border border-navy-100 bg-white p-4">
      <div className="relative h-72 w-full overflow-hidden rounded-lg bg-neutral-900">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-neutral-500">확대</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-navy-100 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-navy-50"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={processing}
          className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-700 disabled:opacity-60"
        >
          {processing ? "처리 중..." : "자르기 완료"}
        </button>
      </div>
    </div>
  );
}
