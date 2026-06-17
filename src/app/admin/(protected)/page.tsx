import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = await createClient();
  const [players, games, notices, albums] = await Promise.all([
    supabase.from("players").select("*", { count: "exact", head: true }),
    supabase.from("games").select("*", { count: "exact", head: true }),
    supabase.from("notices").select("*", { count: "exact", head: true }),
    supabase.from("gallery_albums").select("*", { count: "exact", head: true }),
  ]);

  return {
    players: players.count ?? 0,
    games: games.count ?? 0,
    notices: notices.count ?? 0,
    albums: albums.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/players", label: "선수단", value: counts.players },
    { href: "/admin/games", label: "경기", value: counts.games },
    { href: "/admin/notices", label: "공지사항", value: counts.notices },
    { href: "/admin/gallery", label: "갤러리 앨범", value: counts.albums },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900">대시보드</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-navy-50 p-5 hover:border-navy-200"
          >
            <p className="text-sm text-neutral-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-navy">{card.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
