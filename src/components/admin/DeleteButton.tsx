"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  action,
  confirmMessage = "삭제하시겠습니까?",
}: {
  action: () => Promise<{ error?: string } | void>;
  confirmMessage?: string;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        if (!window.confirm(confirmMessage)) return;
        setPending(true);
        const result = await action();
        setPending(false);
        if (result?.error) {
          window.alert(result.error);
          return;
        }
        router.refresh();
      }}
      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      {pending ? "삭제 중..." : "삭제"}
    </button>
  );
}
