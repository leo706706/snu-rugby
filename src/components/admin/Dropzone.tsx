"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "@/lib/uploadFile";
import ImageCropper from "@/components/admin/ImageCropper";

interface DropzoneProps {
  bucket: string;
  pathPrefix?: string;
  multiple?: boolean;
  accept?: Record<string, string[]>;
  onUploaded: (urls: string[]) => void;
  label?: string;
  /** When set, a single dropped image is cropped to this aspect ratio (width / height) before upload. */
  cropAspect?: number;
}

export default function Dropzone({
  bucket,
  pathPrefix = "",
  multiple = false,
  accept,
  onUploaded,
  label = "파일을 드래그하거나 클릭해서 업로드",
  cropAspect,
}: DropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cropFile, setCropFile] = useState<File | null>(null);

  const uploadFiles = useCallback(
    async (files: File[]) => {
      setUploading(true);
      setError(null);

      try {
        const urls: string[] = [];
        for (const file of files) {
          urls.push(await uploadFile(bucket, file, pathPrefix));
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      if (cropAspect && !multiple && acceptedFiles[0].type.startsWith("image/")) {
        setError(null);
        setCropFile(acceptedFiles[0]);
        return;
      }

      uploadFiles(acceptedFiles);
    },
    [cropAspect, multiple, uploadFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
  });

  if (cropFile) {
    return (
      <ImageCropper
        file={cropFile}
        aspect={cropAspect!}
        onCancel={() => setCropFile(null)}
        onCropped={(croppedFile) => {
          setCropFile(null);
          uploadFiles([croppedFile]);
        }}
      />
    );
  }

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
