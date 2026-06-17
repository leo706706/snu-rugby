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

export async function getInstagramFeed(limit = 4): Promise<InstagramPost[]> {
  const useMock = process.env.NEXT_PUBLIC_USE_INSTAGRAM_MOCK !== "false";

  if (useMock) {
    return MOCK_POSTS.slice(0, limit);
  }

  // Real integration point: call the Instagram Graph API here using a
  // long-lived access token (IG_ACCESS_TOKEN, server-only env var) and map
  // the response into InstagramPost[]. Left unimplemented for Phase 1.
  return MOCK_POSTS.slice(0, limit);
}
