-- Optional sample data so the site isn't empty during local development.
-- Safe to skip — every page renders an empty state without this.

insert into public.players (name, jersey_number, position, division, status, student_id, order_index)
values
  ('김서울', 1, 'Prop', 'men', 'current', '22', 1),
  ('이관악', 7, 'Flanker', 'men', 'current', '23', 2),
  ('박낙성', 10, 'Fly-half', 'men', 'current', '21', 3),
  ('최규장', 4, 'Lock', 'women', 'current', '24', 1),
  ('정대학', 9, 'Scrum-half', 'women', 'current', '22', 2),
  ('한선배', 8, 'Number 8', 'men', 'ob', '15', 1)
on conflict do nothing;

insert into public.games (title, opponent, division, game_date, location, is_home, status, our_score, opponent_score, result)
values
  ('2026 대학럭비 춘계리그', '연세대학교', 'men', now() + interval '14 days', '잠실종합운동장 보조경기장', true, 'scheduled', null, null, null),
  ('2026 대학럭비 춘계리그', '고려대학교', 'women', now() + interval '21 days', '한국체대 럭비장', false, 'scheduled', null, null, null),
  ('2025 전국체전 예선', '한양대학교', 'men', now() - interval '20 days', '잠실종합운동장 보조경기장', true, 'completed', 27, 12, 'win')
on conflict do nothing;

insert into public.notices (title, content, is_pinned, category, author)
values
  ('2026학년도 신입 부원 모집', '2026학년도 신입 부원을 모집합니다. 럭비 경험 무관, 누구나 지원 가능합니다.', true, '모집', '관리자'),
  ('정기 훈련 일정 안내', '매주 화/목 18:00, 토 10:00 관악캠퍼스 운동장에서 정기 훈련을 진행합니다.', false, '공지', '관리자')
on conflict do nothing;

with album as (
  insert into public.gallery_albums (title, description, album_date)
  values ('2025 전국체전', '2025 전국체전 예선 현장 스케치', now()::date)
  returning id
)
insert into public.gallery_photos (album_id, image_url, caption, order_index)
select id, 'https://placehold.co/800x600/1a3a5c/ffffff?text=SNU+Rugby', '경기 전 워밍업', 1
from album;
