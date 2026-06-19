import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";

const LINKS = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/players", label: "선수단" },
  { href: "/admin/games", label: "경기" },
  { href: "/admin/notices", label: "공지사항" },
  { href: "/admin/gallery", label: "갤러리" },
  { href: "/admin/banners", label: "페이지 배너" },
  { href: "/admin/settings", label: "사이트 설정" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page flex flex-col gap-8 py-10 sm:flex-row">
      <aside className="flex shrink-0 flex-row gap-1 overflow-x-auto sm:w-48 sm:flex-col">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-navy-50 hover:text-navy"
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-2 px-3 sm:mt-auto">
          <SignOutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
