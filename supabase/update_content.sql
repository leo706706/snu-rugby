-- Run this in the Supabase SQL Editor.
-- Updates the two existing notices with real copy, and adds 4 men's-division games.

update public.notices
set content = $$서울대학교 럭비부에서 함께 그라운드를 누빌 2026학년도 신입 부원을 모집합니다.

럭비를 한 번도 해본 적 없어도 괜찮습니다. 전공, 학년, 성별 관계없이 누구나 도전할 수 있는 동아리입니다. 처음엔 패스 한 번, 태클 한 번이 낯설겠지만, 함께 땀 흘리고 부딪히는 사이 어느새 가장 가까운 동료가 되어 있을 거예요.

저희는 매년 KERA 전국 대회와 각종 7인제 토너먼트에 꾸준히 출전하고 있고, 올해 12월에는 대만 유안쿤컵 7인제 토너먼트 해외 원정도 준비하고 있습니다. 그라운드 위에서는 누구보다 치열하게, 그라운드 밖에서는 누구보다 가깝게 — One for All, All for One의 정신을 함께 나눌 동료를 기다립니다.

▪ 모집 대상 : 서울대학교 재학생 (경험 무관, 성별 무관)
▪ 정기 훈련 : 매주 월·수·목 17:30~20:00 (방학 중 일정 변동 가능)
▪ 장소 : 서울대학교 관악캠퍼스 운동장
▪ 준비물 : 운동 가능한 복장과 마음의 준비

자세한 모집 안내와 가입 문의는 인스타그램(@snu__rugby) DM으로 편하게 연락 주세요. 여러분의 합류를 기다리겠습니다.$$
where title = '2026학년도 신입 부원 모집';

update public.notices
set content = $$서울대학교 럭비부 정기 훈련 일정을 안내드립니다.

▪ 훈련 요일 : 매주 월, 수, 목
▪ 훈련 시간 : 17:30 ~ 20:00
▪ 장소 : 서울대학교 관악캠퍼스 운동장
▪ 방학 기간에는 훈련 일정이 변동될 수 있으니, 정확한 일정은 인스타그램 공지를 확인해 주세요.

훈련 참관, 참여 관련 문의는 인스타그램(@snu__rugby) DM으로 연락 주시면 자세히 안내드리겠습니다.$$
where title = '정기 훈련 일정 안내';

insert into public.games (title, opponent, division, game_date, location, is_home, status, our_score, opponent_score, result, notes)
values
  ('KERA 10인제 토너먼트 3차전', '참가팀', 'men', '2026-06-27 12:00:00+09', '서울대학교 종합운동장', true, 'scheduled', null, null, null, null),
  ('대만 유안쿤컵 7인제 토너먼트', '참가팀', 'men', '2026-12-26 09:00:00+09', '대만', false, 'scheduled', null, null, null, '12/26~27 이틀간 진행'),
  ('안산시 전국 7인제 토너먼트', '참가팀', 'men', '2026-06-07 09:00:00+09', '안산시 호수공원 천연잔디구장', false, 'completed', null, null, null, '준우승'),
  ('서울대배 7인제 대회', '참가팀', 'men', '2026-05-23 09:00:00+09', '서울대학교 종합운동장', true, 'completed', null, null, null, '4등');
