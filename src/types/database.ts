export type Division = "men" | "women";
export type PlayerStatus = "current" | "ob";
export type GameStatus = "scheduled" | "completed" | "cancelled";
export type GameResult = "win" | "loss" | "draw";

export interface Player {
  id: string;
  name: string;
  name_en: string | null;
  jersey_number: number | null;
  position: string | null;
  division: Division;
  status: PlayerStatus;
  student_id: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  photo_url: string | null;
  bio: string | null;
  order_index: number;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  opponent: string;
  division: Division;
  game_date: string;
  location: string | null;
  is_home: boolean;
  status: GameStatus;
  our_score: number | null;
  opponent_score: number | null;
  result: GameResult | null;
  notes: string | null;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_pinned: boolean;
  category: string | null;
  author: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface NoticeAttachment {
  id: string;
  notice_id: string;
  file_name: string;
  file_url: string;
  file_size: number | null;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  album_date: string | null;
  created_at: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url: string;
  caption: string | null;
  order_index: number;
  created_at: string;
}

export interface NoticeWithAttachments extends Notice {
  notice_attachments: NoticeAttachment[];
}

export interface AlbumWithPhotos extends GalleryAlbum {
  gallery_photos: GalleryPhoto[];
}

export interface AlbumWithPhotoCount extends GalleryAlbum {
  gallery_photos: { count: number }[];
}

export interface Admin {
  id: string;
  email: string;
  created_at: string;
}

export type PageKey = "home" | "players" | "schedule" | "notices" | "gallery";

export interface PageBanner {
  page_key: PageKey;
  image_url: string;
  position_desktop: number;
  position_mobile: number;
  created_at: string;
  updated_at: string;
}
