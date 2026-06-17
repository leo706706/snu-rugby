"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";

interface DropzoneProps {
  bucket: string;
  pathPrefix?: string;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  onUploaded: (urls: string[]) => void;
  label?: string;
}

export default function Dropzone({
  bucket,
  pathPrefix = "",
  multiple = false,
  accept,
  onUploaded,
  label = "파일을 드래그하거나 클릭해서 업로드",
}: DropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      setUploading(true);
      setError(null);

      try {
        const supabase = createClient();
        const urls: string[] = [];

        for (const file of acceptedFiles) {
          const path = `${pathPrefix ? `${pathPrefix}/` : ""}${crypto.randomUUID()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(path, file, { cacheControl: "3600", upsert: false });

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from(bucket).getPublicUrl(path);
          urls.push(data.publicUrl);
        }

        onUploaded(urls);
      } catch (err) {
        setError(err instanceof Error ? err.message : "업로드에 실패했습니다.");
      } finally {
        setUploading(false);
      }
    },
    [bucket, pathPrefix, onUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragActive ? "border-navy bg-navy-50" : "border-navy-100 hover:border-navy-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-neutral-500">
          {uploading ? "업로드 중..." : label}
        </p>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
