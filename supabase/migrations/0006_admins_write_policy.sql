-- SNU Rugby — allow admins to add/remove other admins via the app
-- (the admins table previously only had a SELECT policy, so /admin/admins
-- could never actually insert or delete rows).
-- Run this once in the Supabase SQL editor.

create policy "admin insert admins" on public.admins for insert with check (public.is_admin());
create policy "admin delete admins" on public.admins for delete using (public.is_admin());

notify pgrst, 'reload schema';
