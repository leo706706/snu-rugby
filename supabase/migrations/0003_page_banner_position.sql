-- SNU Rugby — per-breakpoint banner crop position (desktop vs mobile)
-- Run this once in the Supabase SQL editor.

alter table public.page_banners
  add column position_desktop smallint not null default 50,
  add column position_mobile smallint not null default 50;

alter table public.page_banners
  add constraint page_banners_position_desktop_range check (position_desktop between 0 and 100),
  add constraint page_banners_position_mobile_range check (position_mobile between 0 and 100);

notify pgrst, 'reload schema';
