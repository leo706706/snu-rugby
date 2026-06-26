-- SNU Rugby — player club role (current_role) and historical roles (past_roles)
-- Run this once in the Supabase SQL editor.

alter table public.players
  add column current_role text,
  add column past_roles text;

notify pgrst, 'reload schema';
