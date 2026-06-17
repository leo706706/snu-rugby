-- Run this in the Supabase SQL Editor.
-- Replaces the placeholder seed players with the real roster, and removes
-- the placeholder seed games (real games were already added separately).

delete from public.players
where name in ('김서울', '이관악', '박낙성', '최규장', '정대학', '한선배');

insert into public.players (name, jersey_number, position, division, status, student_id, order_index)
values
  ('김지홍', 8, 'NO.8', 'men', 'current', '21', 1),
  ('공태현', 7, 'Flanker', 'men', 'current', '25', 2),
  ('STAN', 10, 'Fly-half', 'men', 'current', 'EXCHANGE-STUDENTS', 3),
  ('손승환', 4, 'Lock', 'men', 'current', '26', 4),
  ('김가연', 9, 'Scrum-half', 'women', 'current', '20', 1),
  ('이철민', 13, 'Center', 'men', 'ob', '15', 1);

delete from public.games
where opponent in ('연세대학교', '고려대학교', '한양대학교');
