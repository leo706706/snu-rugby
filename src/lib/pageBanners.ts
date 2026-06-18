import type { PageKey } from "@/types/database";

export const PAGE_LABELS: Record<PageKey, string> = {
  players: "선수단",
  schedule: "경기일정",
  notices: "공지사항",
  gallery: "갤러리",
};

export const DEFAULT_BANNERS: Record<PageKey, string> = {
  players: "/images/players_banner.jpg",
  schedule: "/images/schedule_banner.jpg",
  notices: "/images/rugby_138.jpg",
  gallery: "/images/rugby_197.jpg",
};
