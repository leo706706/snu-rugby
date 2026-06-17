-- SNU Rugby — page banners (per-page hero image, managed from /admin/banners)
-- Run this once in the Supabase SQL editor.

create table if not exists public.page_banners (
  page_key text primary key,
  image_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists page_banners_set_updated_at on public.page_banners;
create trigger page_banners_set_updated_at
  before update on public.page_banners
  for each row
  execute function public.set_updated_at();

alter table public.page_banners enable row level security;

create policy "public read page_banners" on public.page_banners for select using (true);
create policy "admin write page_banners" on public.page_banners for all using (public.is_admin()) with check (public.is_admin());
