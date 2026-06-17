import type { PageKey } from "@/types/database";

export const PAGE_LABELS: Record<PageKey, string> = {
  home: "홈",
  players: "선수단",
  schedule: "경기일정",
  notices: "공지사항",
  gallery: "갤러리",
};

export const DEFAULT_BANNERS: Record<PageKey, string> = {
  home: "/images/rugby_197.jpg",
  players: "/images/rugby_08.jpg",
  schedule: "/images/rugby_62.jpg",
  notices: "/images/rugby_138.jpg",
  gallery: "/images/rugby_197.jpg",
};
