# SNU Rugby — 서울대학교 럭비부 공식 홈페이지

Next.js 14 (App Router) + Supabase + Tailwind CSS. MVP Phase 1.

## 1. Supabase 프로젝트 설정

1. [supabase.com](https://supabase.com) 에서 새 프로젝트를 생성합니다.
2. **Project Settings → API** 에서 `Project URL` 과 `anon public` key를 복사합니다.
3. **SQL Editor** 를 열고 [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) 의 내용을 그대로 실행합니다.
   - 테이블 7개(players, games, notices, notice_attachments, gallery_albums, gallery_photos, admins), RLS 정책, 스토리지 버킷 3개(players/gallery/attachments)가 생성됩니다.
4. (선택) 샘플 데이터를 보고 싶다면 [`supabase/seed.sql`](supabase/seed.sql) 도 실행합니다.
5. 관리자 계정 만들기:
   - **Authentication → Users → Add user** 에서 관리자로 쓸 이메일/비밀번호로 계정을 생성합니다.
   - SQL Editor에서 아래 쿼리로 그 계정을 admin 허용 목록에 추가합니다 (이메일만 본인 것으로 변경):
     ```sql
     insert into public.admins (id, email)
     select id, email from auth.users where email = 'your-email@snu.ac.kr';
     ```
   - 이 테이블에 등록된 사용자만 `/admin` 에서 데이터를 추가/수정/삭제할 수 있습니다 (RLS로 강제됨).

## 2. 환경변수

`.env.local.example` 을 복사해 `.env.local` 을 만들고 1번에서 복사한 값을 채웁니다.

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

## 3. 로컬 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인, 관리자 페이지는 [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## 구조

- `src/app` — 페이지 (홈, 선수단, 경기일정, 공지사항, 갤러리, 관리자)
- `src/lib/data` — 공개 페이지용 Supabase 조회 함수 (서버 컴포넌트에서 사용)
- `src/lib/actions` — 관리자 CRUD용 Server Actions
- `src/lib/instagram.ts` — 인스타그램 피드 (현재 mock 데이터, `NEXT_PUBLIC_USE_INSTAGRAM_MOCK=false` + Graph API 토큰 연동 시 실데이터로 교체)
- `src/components/admin/Dropzone.tsx` — 드래그 앤 드롭 업로드 (Supabase Storage 직접 업로드)
- `supabase/migrations/0001_init.sql` — 전체 스키마, RLS, 스토리지 버킷

## Instagram 연동 (Phase 2)

지금은 `NEXT_PUBLIC_USE_INSTAGRAM_MOCK=true` 로 mock 데이터를 보여줍니다. 실제 `@snu__rugby` 피드를 연결하려면:

1. Instagram Graph API (또는 Basic Display API 후속인 Instagram API with Instagram Login) 로 long-lived access token 발급
2. 서버 전용 환경변수(`IG_ACCESS_TOKEN`, `NEXT_PUBLIC` 접두사 없이)로 추가
3. `src/lib/instagram.ts` 의 `getInstagramFeed` 안 mock 분기를 실제 API 호출로 교체

## Vercel 배포

1. GitHub 저장소에 push 후 Vercel에서 import
2. Vercel 프로젝트 환경변수에 `.env.local` 과 동일한 키/값 등록
3. Build Command/Output은 기본값(Next.js) 그대로 사용
