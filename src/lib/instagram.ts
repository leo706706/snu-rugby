export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}

const MOCK_POSTS: InstagramPost[] = [
  {
    id: "mock-1",
    caption: "2025 전국체전 예선 승리! 🏉 #서울대럭비부 #snurugby",
    mediaUrl: "https://placehold.co/600x600/1a3a5c/ffffff?text=SNU+Rugby+1",
    permalink: "https://www.instagram.com/snu__rugby/",
    timestamp: "2025-09-20T10:00:00.000Z",
  },
  {
    id: "mock-2",
    caption: "신입 부원 환영합니다! 매주 화목토 정기훈련 📍 관악캠퍼스",
    mediaUrl: "https://placehold.co/600x600/2f5d83/ffffff?text=SNU+Rugby+2",
    permalink: "https://www.instagram.com/snu__rugby/",
    timestamp: "2025-08-15T10:00:00.000Z",
  },
  {
    id: "mock-3",
    caption: "여자부 정기 훈련 현장 💪",
    mediaUrl: "https://placehold.co/600x600/102338/ffffff?text=SNU+Rugby+3",
    permalink: "https://www.instagram.com/snu__rugby/",
    timestamp: "2025-07-30T10:00:00.000Z",
  },
  {
    id: "mock-4",
    caption: "OB-재학생 친선 경기 후기",
    mediaUrl: "https://placehold.co/600x600/4f7da3/ffffff?text=SNU+Rugby+4",
    permalink: "https://www.instagram.com/snu__rugby/",
    timestamp: "2025-06-10T10:00:00.000Z",
  },
];

interface GraphMediaItem {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

async function fetchGraphFeed(limit: number): Promise<InstagramPost[]> {
  const accessToken = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (!accessToken || !userId) {
    return MOCK_POSTS.slice(0, limit);
  }

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const url = `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Instagram API error: ${res.status}`);

    const json = (await res.json()) as { data?: GraphMediaItem[] };
    const items = json.data ?? [];

    return items.map((item) => ({
      id: item.id,
      caption: item.caption ?? "",
      mediaUrl: item.media_type === "VIDEO" ? item.thumbnail_url ?? item.media_url : item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));
  } catch {
    return MOCK_POSTS.slice(0, limit);
  }
}

export async function getInstagramFeed(limit = 4): Promise<InstagramPost[]> {
  const useMock = process.env.NEXT_PUBLIC_USE_INSTAGRAM_MOCK !== "false";

  if (useMock) {
    return MOCK_POSTS.slice(0, limit);
  }

  return fetchGraphFeed(limit);
}
