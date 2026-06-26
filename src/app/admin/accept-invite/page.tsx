"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AcceptInvitePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let resolved = false;

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        resolved = true;
        setReady(true);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        resolved = true;
        setReady(true);
      }
    });

    const timeout = setTimeout(() => {
      if (!resolved) {
        setError("초대 링크가 만료되었거나 올바르지 않습니다. 관리자에게 다시 초대를 요청해주세요.");
      }
    }, 4000);

    return () => {
      subscription.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== confirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (!ready) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6 text-center">
        <p className="text-sm text-neutral-500">{error ?? "초대 확인 중..."}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-navy-50 p-8"
      >
        <h1 className="text-xl font-semibold text-neutral-900">비밀번호 설정</h1>
        <p className="mt-1 text-sm text-neutral-500">SNU RUGBY 관리자 계정의 비밀번호를 설정해주세요.</p>

        <div className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-neutral-700">새 비밀번호</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">비밀번호 확인</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-navy-100 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-navy py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700 disabled:opacity-60"
        >
          {submitting ? "설정 중..." : "비밀번호 설정"}
        </button>
      </form>
    </div>
  );
}
