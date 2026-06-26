"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-navy-400">오류</p>
      <h1 className="mt-3 text-2xl font-semibold text-neutral-900 sm:text-3xl">
        문제가 발생했습니다
      </h1>
      <p className="mt-2 text-neutral-500">
        페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy-700"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded-full border border-navy-100 px-6 py-2.5 text-sm font-medium text-neutral-600 hover:bg-navy-50"
        >
          홈으로 가기
        </Link>
      </div>
    </div>
  );
}
