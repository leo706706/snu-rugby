"use client";

import { useState } from "react";
import type { Notice } from "@/types/database";
import type { NoticeInput } from "@/lib/actions/notices";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

export default function NoticeForm({
  initial,
  onSubmit,
}: {
  initial?: Notice;
  onSubmit: (input: NoticeInput) => Promise<{ error?: string } | void>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [isPinned, setIsPinned] = useState(initial?.is_pinned ?? false);
  const [category, setCategory] = useState(initial?.category ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit({
      title,
      content,
      is_pinned: isPinned,
      category: category || null,
      author: author || null,
    });

    setSubmitting(false);
    if (result?.error) setError(result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div>
        <label className={labelClass}>제목 *</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>내용 *</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>분류</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>작성자</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <input
          type="checkbox"
          checked={isPinned}
          onChange={(e) => setIsPinned(e.target.checked)}
          className="h-4 w-4 rounded border-navy-200"
        />
        상단 고정
      </label>

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
