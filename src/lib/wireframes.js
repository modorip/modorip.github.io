// 와이어프레임 갤러리 빌더 (순수 문자열 → SSR 안전). 화면설계서 / 와이어프레임 저충실도 본.
const CAT = ['var(--nature)', 'var(--heritage)', 'var(--culture)', 'var(--festival)'];
const CATN = ['자연', '유적', '문화', '축제'];
const R = {
  box: (l, h = 40) => `<div class="b box" style="height:${h}px">${l || ''}</div>`,
  img: (l, h = 80) => `<div class="b box img" style="height:${h}px">${l || '이미지'}</div>`,
  bar: (l) => `<div class="b bar">${l}<span class="icns"><span class="ic"></span><span class="ic"></span></span></div>`,
  hdr: (s, t, tr) => `<div class="b hdr"><div class="sub">${s}</div><div class="ttl">${t}${tr ? `<span class="tr">${tr}</span>` : ''}</div></div>`,
  stat: (arr) => `<div class="b stat">${arr.map(([v, k]) => `<div class="c"><div class="v">${v}</div><div class="k">${k}</div></div>`).join('')}</div>`,
  chips: (arr, on = 0) => `<div class="b chips">${arr.map((c, i) => `<span class="chip${i === on ? ' on' : ''}">${c}</span>`).join('')}</div>`,
  seg: (arr, on = 0) => `<div class="b seg">${arr.map((s, i) => `<div class="s${i === on ? ' on' : ''}">${s}</div>`).join('')}</div>`,
  cta: (l, v = 'p') => `<div class="b cta ${v}">${l}</div>`,
  pager: (n, on = 0) => `<div class="b pager">${Array.from({ length: n }, (_, i) => `<span class="d${i === on ? ' on' : ''}"></span>`).join('')}</div>`,
  cat: (fill = [1, 0, 0, 0]) => `<div class="b cat">${CAT.map((c, i) => `<div class="cb" style="background:${fill[i] ? c : '#eef1f4'};color:${fill[i] ? '#fff' : '#9aa2ab'}">${CATN[i]}</div>`).join('')}</div>`,
  note: (t) => `<div class="note">${t}</div>`,
  sect: (t) => `<div class="sect">${t}</div>`,
  hint: (t) => `<div class="hint">${t}</div>`,
  sp: (h = 6) => `<div style="height:${h}px"></div>`,
  prog: (p) => `<div class="prog"><i style="width:${p}%"></i></div>`,
  row: (items) => `<div class="b row">${items.join('')}</div>`,
  listrow: (t, s, tr = '') => `<div class="listrow"><span class="ld"></span><span class="tx"><span class="t">${t}</span><br><span class="s">${s}</span></span><span class="tr">${tr}</span></div>`,
  avrow: (nm, sub, tr = '') => `<div class="listrow"><span class="av">${nm[0]}</span><span class="tx"><span class="t">${nm}</span><br><span class="s">${sub}</span></span><span class="tr">${tr}</span></div>`,
  hero: (small, big, tone = false, extra = '') => `<div class="b hero${tone ? ' tone' : ''}"><div class="small">${small}</div><div class="big">${big}</div>${extra}</div>`,
  grid: (cols, cells) => `<div class="b grid" style="grid-template-columns:repeat(${cols},1fr)">${cells.join('')}</div>`,
  cell: (idx, label, locked = false, badge = false) => `<div class="cell${locked ? ' locked' : ''}"><div class="ci">${idx ? `<span class="idx">${idx}</span>` : ''}${badge ? '<span class="bdg"></span>' : ''}사진</div><div class="ct">${label}</div></div>`,
};
const tabbar = (on) => { const T = ['홈', '발견', '도감', '광장', '나']; return `<div class="tabbar">${T.map((t, i) => `<div class="t${i === on ? ' on' : ''}"><span class="g"></span>${t}</div>`).join('')}</div>`; };

const S = [
  { id: '00', nm: '공통 · 탭바/토큰', scroll: [R.sect('디자인 시스템 (Wanted DS)'), R.box('AppHeader · subtitle / title / trailing', 46), R.row([R.cta('Primary', 'p'), R.cta('Outline', 'd')]), R.chips(['active', 'inactive', '칩'], 0), R.cat([1, 1, 0, 0]), R.sect('Badge 9변형'), R.chips(['발견', '인기', '혼잡', '유적', '축제'], 0), R.note('하단 5탭은 모든 루트 화면 공통 · 온보딩/모달 숨김')], tabbarOn: 0 },
  { id: '01', nm: '온보딩', noTab: true, scroll: [R.row([R.box('', 10), R.cta('건너뛰기', 'd')]), R.img('핀 글리프 + 동심원', 150), R.sect('한국에는 꼭 가야 할 곳이 없었습니다'), R.note('5장 풀스크린 페이저 · 스와이프/탭 이동'), R.box('① 핀  ② 3×3 타일  ③ GPS  ④ 칭호  ⑤ 이름입력', 54), R.sp(8), R.pager(5, 0), R.row([R.cta('이전', 'd'), R.cta('계속', 'p')]), R.note("5장: 이름 입력 → '도감 시작하기' · 미입력 시 꼬마탐험가")] },
  { id: '02', nm: '홈', scroll: [R.bar('모두립'), R.sect('안녕하세요, 탐험가님'), R.box('오늘 어디 가볼까요?', 30), R.stat([['12/40', '발견 자원'], ['5/17', '방문 지역'], ['30%', '달성률']]), R.sect('오늘의 추천'), R.row([R.box('설악산\n혼잡 92', 70), R.box('팔공산\n한산 28', 70)]), R.note('좌 danger·빨강 / 우 success·초록 progress + API 출처'), R.sect('최근 발견'), R.row([R.img('', 54), R.img('', 54), R.img('', 54)]), R.sect('아직 안 가본 지역'), R.grid(2, [R.cell('', '경북'), R.cell('', '전남')]), R.note('7초마다 4개씩 fade-up · 우측 dot')], tabbarOn: 0 },
  { id: '03', nm: '발견 (GPS 지도)', custom: `${R.box('자원 검색', 34)}<div class="b map" style="height:300px">한반도 SVG · 도로 점선<span class="pin" style="left:38%;top:30%;background:var(--nature)"></span><span class="pin" style="left:60%;top:46%;background:#fff;border-color:var(--blue);transform:rotate(-45deg) scale(1.4)"></span><span class="pin" style="left:50%;top:62%;background:var(--festival)"></span><div class="zoom"><span class="zb">+</span><span class="zp">5km</span><span class="zb">&minus;</span></div></div>${R.note('핀 3상태: 미발견(흰)·발견(색+체크)·선택(파란보더+pulse 1.4×) · 줌 9단계')}<div class="sheet">${R.row([R.img('', 46), R.box('설악산\n자연 · 1.2km', 46)])}${R.cta('여기에서 발견하기', 'p')}</div>`, tabbarOn: 1 },
  { id: '04', nm: '발견 성공 (오버레이)', dark: true, noTab: true, scroll: [R.sect('✦ 발견!'), `<div class="card3d"><div class="ph"></div><div class="meta"><div class="nm">설악산</div><div class="sm">#012 · 자연 · 방금</div></div></div>`, R.hint('Stage1: X축 720° flip → Stage2: spring 안착 + confetti 56'), R.seg(['가벼운 발견', '깊은 발견'], 0), R.box('강원 진행률  +1 → 13/40', 40), R.row([R.cta('닫기', 'd'), R.cta('도감에서 확인', 'p')])] },
  { id: '05', nm: '도감 — 전국', scroll: [R.hdr('전국 도감', '대한민국', ''), R.seg(['지도', '카드'], 0), R.stat([['120/640', '발견'], ['5/17', '지역'], ['19%', '달성']]), `<div class="b map" style="height:230px">17광역 폴리곤 · 채움률 알파<span class="pin" style="left:46%;top:40%;background:var(--blue)"></span></div>`, R.note('선택 시 1.14× + 검정 보더 + 글로우 · 라벨 halo'), R.row([R.box('강원\n실루엣', 60), R.box('강원 · 38/120\n자연·유적·문화·축제', 60)])], tabbarOn: 2 },
  { id: '06', nm: '도감 — 지역 상세', scroll: [R.hero('강원', '강원 · 38/120곳 발견', false, R.prog(32)), R.row([R.box('', 10), R.cta('프리셋 만들기', 'd')]), R.note("우상단 '프리셋 만들기'는 2곳 이상 발견 시에만 노출"), R.cat([1, 0, 0, 0]), R.chips(['전체', '산', '해변·섬', '계곡', '숲'], 0), R.seg(['전체', '발견', '미발견'], 0), R.grid(2, [R.cell('#001', '설악산', false, true), R.cell('#002', '경포대', false, true), R.cell('#003', '오대산', true), R.cell('#004', '정동진', true)]), R.note('미발견: grayscale·실제 이름 노출 / 발견: 컬러+success 뱃지')], tabbarOn: 2 },
  { id: '07', nm: '장소 상세', scroll: [R.img('헤로 320px · 탭 시 3D 카드 모달', 118), R.note('좌 뒤로/우 하트 · 우하단 발견·내사진 뱃지 · 좌하단 KTO코드'), R.row([R.box('자연·산·강원\n설악산', 46), R.box('카카오\n길찾기', 46)]), R.box('내 사진 카드 · 등록/바꾸기/제거', 40), R.box('설명 · 머무는 시간 / 희귀도 / 시즌', 46), R.sect('30일 혼잡도'), R.grid(10, Array.from({ length: 10 }, (_, i) => `<div class="cell"><div class="ci" style="height:18px;background:${i === 3 ? '#FF8C8C' : (i % 3 ? '#FFD49C' : '#7DF5A5')}"></div></div>`)), R.note('한산/보통/혼잡 3색 · 오늘 cell 검정 보더'), R.box('자원 정보 · 주소/전화/시간 + 공식 페이지', 46), R.box('반경 5km 주변 · 식당/카페/숙박', 40), R.cta('여기로 떠나기', 'p')], tabbarOn: 2 },
  { id: '08', nm: '3D 카드 모달', dark: true, noTab: true, scroll: [R.row([R.box('앞면 / 뒷면', 26), R.box('✕', 26)]), `<div class="card3d"><div class="ph"></div><div class="meta"><div class="nm">설악산</div><div class="sm">#012 · 자연 · 강원</div></div></div>`, R.hint('탭 시 flip (rotateY 0↔180, 700ms) · 홀로그래픽 shine'), R.box('뒷면: 당신은 N번째 발견자 · N명이 담음 · 모두립 2026', 54)] },
  { id: '09', nm: '광장', scroll: [R.seg(['피드', '인기 프리셋', '리더보드', '동행'], 1), R.box('제목/지역/태그 통합 검색', 32), R.chips(['전체', '일출', '당일치기', '자연', '산악'], 0), R.note('태그 칩 다중 선택 · savedCount 내림차순 · Top3 메달'), R.row([R.box('🥇 강원 일출 코스\n5곳 · 담음 320', 70), R.box('🥈 제주 오름\n4곳 · 담음 210', 70)]), R.avrow('작성자', '등록 12 · 퍼감 540')], tabbarOn: 3 },
  { id: '10', nm: '칭호 (5티어)', scroll: [R.box('획득 14 / 전체 60 · 5티어 시스템 · 대표 변경', 46), R.sect('티어 범례'), R.chips(['입문', '광역', '카테고리', '표고', '마스터'], 0), R.sect('획득'), R.row([R.box('제주를\n발견한 자', 54), R.box('봉우리\n수집가', 54)]), R.sect('진행 중'), R.listrow('에베레스트를 넘다', '누적 표고', '8/14'), R.note('획득: 티어색 강조 / 진행중: 회색 + progress')], tabbarOn: 4 },
  { id: '11', nm: '프로필 (나)', scroll: [R.hero('나의 발견', '탐험가', false, R.row([R.box('5\n지역', 30), R.box('120\n발견', 30), R.box('14\n칭호', 30)])), R.listrow('칭호', '5티어 시스템', '›'), R.listrow('가고싶다', '저장한 장소', '›'), R.listrow('협력 혜택', '배지 3', '›'), R.sect('계열별 진행'), R.row([R.box('자연 40%', 40), R.box('유적 22%', 40)]), R.sect('내 프리셋'), R.box('아직 등록한 코스가 없어요', 40)], tabbarOn: 4 },
  { id: '12', nm: '프리셋 — 만들기', noTab: true, scroll: [R.hdr('', '강원 프리셋 만들기', ''), R.box('코스 이름 (필수)', 36), R.box('설명 (선택, 멀티라인)', 50), R.sect('태그 (최대 6)'), R.chips(['+ 일출', '+ 당일치기', '+ 자연', '+ 산악'], 99), R.row([R.box('강원에서 발견한 자원 · 12곳', 34), R.box('검색', 34)]), R.grid(3, [R.cell('', '설악산'), R.cell('', '경포대'), R.cell('', '오대산')]), R.sect('코스 순서'), R.listrow('1. 설악산', '위/아래/X', '↑↓✕'), R.cta('등록', 'p')] },
  { id: '13', nm: '프리셋 — 상세', noTab: true, scroll: [R.hero('강원', '강원 일출 코스', true, `<div class="small" style="margin-top:4px">자원 5곳 · 담음 320회</div>`), R.avrow('작성자', '등록 12 · 퍼감 540', '›'), R.box('설명 · 멀티라인 본문', 40), R.chips(['일출', '당일치기', '자연'], 99), R.seg(['리스트 뷰', '지도 뷰'], 0), R.listrow('1. 설악산', '자연 · 강원', '›'), R.listrow('2. 경포대', '자연 · 강원', '›'), R.cta('내 프리셋에 가져오기', 'p'), R.note("본인: CTA 없음 / 담음: '담았어요' 초록 토글")] },
  { id: '14', nm: '타 유저 프로필', noTab: true, scroll: [R.hero('', '여행자 닉네임', false, R.row([R.box('210\n발견', 30), R.box('8\n지역', 30), R.box('1.2k\n퍼감', 30)])), R.sect('수집된 칭호 · 8개'), R.chips(['입문', '제주발견자', '봉우리수집가', '해양탐험가'], 0), R.sect('수집한 도감 · 많이 모은 순'), R.grid(3, [R.cell('', '제주 88%'), R.cell('', '강원 64%'), R.cell('', '경북 40%')]), R.pager(2, 0), R.note('2×3 슬라이드 · 7초 자동회전 · fade-up stagger'), R.sect('등록한 프리셋'), R.box('제주 오름 코스 · 4곳', 40)] },
];

export function buildGallery() {
  return S.map((s) => {
    const body = s.custom || (s.scroll ? s.scroll.join('') : '');
    const tb = s.noTab ? '' : (typeof s.tabbarOn === 'number' ? tabbar(s.tabbarOn) : '');
    return `<div class="device"><div class="cap"><span class="no">${s.id}</span><span class="nm">${s.nm}</span><span class="tb">${s.noTab ? 'overlay/flow' : 'tab'}</span></div><div class="screen"><div class="notch"></div><div class="scroll${s.dark ? ' dark' : ''}">${body}</div>${tb}</div></div>`;
  }).join('');
}
