-- SNU Rugby — initial schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_en text,
  jersey_number int,
  position text,
  division text not null check (division in ('men', 'women')),
  status text not null check (status in ('current', 'ob')),
  student_id text,
  height_cm int,
  weight_kg int,
  photo_url text,
  bio text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  opponent text not null,
  division text not null check (division in ('men', 'women')),
  game_date timestamptz not null,
  location text,
  is_home boolean not null default true,
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  our_score int,
  opponent_score int,
  result text check (result in ('win', 'loss', 'draw')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  is_pinned boolean not null default false,
  category text,
  author text,
  view_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notice_attachments (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid not null references public.notices(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_size int,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_image_url text,
  album_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.gallery_albums(id) on delete cascade,
  image_url text not null,
  caption text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- Allow-list of admin accounts. Insert a row here (matching an auth.users.id)
-- for every person who should be able to use /admin.
create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists players_division_status_idx on public.players (division, status, order_index);
create index if not exists games_game_date_idx on public.games (game_date desc);
create index if not exists notices_pinned_created_idx on public.notices (is_pinned desc, created_at desc);
create index if not exists gallery_photos_album_idx on public.gallery_photos (album_id, order_index);

-- ---------------------------------------------------------------------------
-- updated_at trigger for notices
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists notices_set_updated_at on public.notices;
create trigger notices_set_updated_at
  before update on public.notices
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Helper: is the current user an admin?
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admins where id = auth.uid()
  );
$$ language sql security definer stable;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.players enable row level security;
alter table public.games enable row level security;
alter table public.notices enable row level security;
alter table public.notice_attachments enable row level security;
alter table public.gallery_albums enable row level security;
alter table public.gallery_photos enable row level security;
alter table public.admins enable row level security;

-- Public can read everything except the admin allow-list.
create policy "public read players" on public.players for select using (true);
create policy "public read games" on public.games for select using (true);
create policy "public read notices" on public.notices for select using (true);
create policy "public read notice_attachments" on public.notice_attachments for select using (true);
create policy "public read gallery_albums" on public.gallery_albums for select using (true);
create policy "public read gallery_photos" on public.gallery_photos for select using (true);

-- Only admins can write.
create policy "admin write players" on public.players for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write games" on public.games for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write notices" on public.notices for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write notice_attachments" on public.notice_attachments for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write gallery_albums" on public.gallery_albums for all using (public.is_admin()) with check (public.is_admin());
create policy "admin write gallery_photos" on public.gallery_photos for all using (public.is_admin()) with check (public.is_admin());

-- Only an admin can see the allow-list itself (so it doesn't leak emails).
create policy "admin read admins" on public.admins for select using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage buckets (player photos, gallery photos, notice attachments)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values
  ('players', 'players', true),
  ('gallery', 'gallery', true),
  ('attachments', 'attachments', true)
on conflict (id) do nothing;

create policy "public read players bucket" on storage.objects
  for select using (bucket_id = 'players');
create policy "public read gallery bucket" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "public read attachments bucket" on storage.objects
  for select using (bucket_id = 'attachments');

create policy "admin write players bucket" on storage.objects
  for all using (bucket_id = 'players' and public.is_admin())
  with check (bucket_id = 'players' and public.is_admin());
create policy "admin write gallery bucket" on storage.objects
  for all using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());
create policy "admin write attachments bucket" on storage.objects
  for all using (bucket_id = 'attachments' and public.is_admin())
  with check (bucket_id = 'attachments' and public.is_admin());
