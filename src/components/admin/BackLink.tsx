import Link from "next/link";

export default function BackLink({ href, label = "목록으로" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-navy"
    >
      ← {label}
    </Link>
  );
}
