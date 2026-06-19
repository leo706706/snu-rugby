-- SNU Rugby — site-wide settings (Instagram link, etc.), managed from /admin/settings
-- Run this once in the Supabase SQL editor.

create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  instagram_url text not null default 'https://www.instagram.com/snu__rugby/',
  instagram_handle text not null default '@snu__rugby',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

alter table public.site_settings enable row level security;

create policy "public read site_settings" on public.site_settings for select using (true);
create policy "admin write site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

notify pgrst, 'reload schema';
