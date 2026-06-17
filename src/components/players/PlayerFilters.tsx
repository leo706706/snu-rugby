"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DIVISIONS = [
  { value: "", label: "전체" },
  { value: "men", label: "남자부" },
  { value: "women", label: "여자부" },
];

const STATUSES = [
  { value: "", label: "전체" },
  { value: "current", label: "재학생" },
  { value: "ob", label: "OB" },
];

function TabGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="inline-flex rounded-full bg-navy-50 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-navy text-white"
              : "text-navy-500 hover:text-navy"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function PlayerFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const division = searchParams.get("division") ?? "";
  const status = searchParams.get("status") ?? "";
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function update(params: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    router.push(`/players?${next.toString()}`);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== (searchParams.get("q") ?? "")) {
        update({ q: search });
      }
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3">
        <TabGroup
          options={DIVISIONS}
          value={division}
          onChange={(v) => update({ division: v })}
        />
        <TabGroup
          options={STATUSES}
          value={status}
          onChange={(v) => update({ status: v })}
        />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="이름으로 검색"
        className="w-full rounded-full border border-navy-100 px-4 py-2 text-sm outline-none focus:border-navy sm:w-56"
      />
    </div>
  );
}
