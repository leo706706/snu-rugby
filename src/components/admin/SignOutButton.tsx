"use client";

import { signOut } from "@/lib/actions/auth";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut()}
      className="text-sm font-medium text-neutral-500 hover:text-navy"
    >
      로그아웃
    </button>
  );
}
