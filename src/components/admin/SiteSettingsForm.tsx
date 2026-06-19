"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/lib/actions/settings";

const inputClass =
  "mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy";
const labelClass = "text-sm font-medium text-neutral-700";

export default function SiteSettingsForm({
  instagramUrl,
  instagramHandle,
}: {
  instagramUrl: string;
  instagramHandle: string;
}) {
  const [url, setUrl] = useState(instagramUrl);
  const [handle, setHandle] = useState(instagramHandle);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);

    const result = await updateSiteSettings(url, handle);

    setSubmitting(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
      <div>
        <label className={labelClass}>인스타그램 주소</label>
        <input
          required
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setSaved(false);
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>인스타그램 표시 이름</label>
        <input
          required
          value={handle}
          onChange={(e) => {
            setHandle(e.target.value);
            setSaved(false);
          }}
          placeholder="@snu__rugby"
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
