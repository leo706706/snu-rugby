-- SNU Rugby — faculty advisor (지도교수) profile, managed from /admin/advisor
-- Run this once in the Supabase SQL editor.

create table if not exists public.advisor (
  id smallint primary key default 1 check (id = 1),
  name text not null default '',
  title text not null default '',
  photo_url text,
  career text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.advisor (id) values (1) on conflict (id) do nothing;

drop trigger if exists advisor_set_updated_at on public.advisor;
create trigger advisor_set_updated_at
  before update on public.advisor
  for each row
  execute function public.set_updated_at();

alter table public.advisor enable row level security;

create policy "public read advisor" on public.advisor for select using (true);
create policy "admin write advisor" on public.advisor for all using (public.is_admin()) with check (public.is_admin());

notify pgrst, 'reload schema';
