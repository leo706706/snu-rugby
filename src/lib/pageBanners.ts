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
  players: "/images/players_banner.jpg",
  schedule: "/images/schedule_banner.jpg",
  notices: "/images/rugby_138.jpg",
  gallery: "/images/rugby_197.jpg",
};

/** Vertical crop focus (0-100, "center Y%") per breakpoint. */
export const DEFAULT_POSITIONS: Record<PageKey, { desktop: number; mobile: number }> = {
  home: { desktop: 50, mobile: 50 },
  players: { desktop: 16, mobile: 16 },
  schedule: { desktop: 13, mobile: 13 },
  notices: { desktop: 50, mobile: 50 },
  gallery: { desktop: 50, mobile: 50 },
};
