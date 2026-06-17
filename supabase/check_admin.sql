-- Supabase 대시보드 -> SQL Editor -> New query 에서 이거 그대로 실행하면 됩니다.
-- 지금 가입된 로그인 계정을 전부 관리자로 등록해줍니다.
insert into public.admins (id, email)
select id, email from auth.users
on conflict do nothing;
