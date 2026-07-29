// 와이어프레임 갤러리 빌더 (순수 문자열 → SSR 안전).
// src/lib/screens.js의 정본 15개 화면(번호/이름/순서)에 1:1 정렬.
// 각 화면은 실제 design/bundle.tsx 컴포넌트 구조를 저충실도(박스+레이블)로 표현한다.
// 디바이스 비율 402×874 (MockFrame CANVAS_W/H) · seed-design CSS 토큰 사용.

import { WF_CAT, WF_HEAT, WF_SOFT, WF_SUB, inlineStyles } from './wireframeStyles';

const CAT = WF_CAT;
const CATN = ['자연', '유적', '문화', '축제'];

/** 통계 스트립 한 칸: `[값, 라벨]`. */
type StatPair = readonly [value: string, key: string];

/** CTA 변형. p=primary · s=success · d=disabled/outline. */
type CtaVariant = 'p' | 's' | 'd';

/**
 * 한 화면의 저충실도 정의.
 * `scroll` 과 `custom` 은 배타적이다 - `custom` 이 있으면 그것만 쓴다.
 */
interface WireframeScreen {
  /** 기능명세서 화면 번호. `06B` 처럼 접미사가 붙어 문자열이다. */
  id: string;
  /** 화면 이름 */
  nm: string;
  /** 스크롤 영역에 세로로 쌓을 HTML 조각들 */
  scroll?: readonly string[];
  /** scroll 대신 통째로 넣을 HTML (오버레이 등 특수 레이아웃) */
  custom?: string;
  /** 하단 탭바를 그리지 않는다 (온보딩·오버레이·플로우) */
  noTab?: boolean;
  /** 다크 오버레이 화면 */
  dark?: boolean;
  /** 하단 탭 활성 인덱스. 홈0·발견1·도감2·광장3·나4 */
  tabbarOn?: number;
}

// ── low-fi 블록 빌더 ─────────────────────────────────────────────
const R = {
  // 텍스트 박스 (멀티라인 \n 지원)
  box: (l: string, h = 40): string => `<div class="b box" style="min-height:${h}px">${l || ''}</div>`,
  // 이미지/사진 placeholder
  img: (l: string, h = 80): string => `<div class="b box img" style="min-height:${h}px">${l || '이미지'}</div>`,
  // 앱 헤더 바 (브랜드 + 우측 아이콘)
  bar: (l: string): string => `<div class="b bar">${l}<span class="icns"><span class="ic"></span><span class="ic"></span></span></div>`,
  // 헤더 (서브 + 타이틀 + 트레일링)
  hdr: (s: string, t: string, tr?: string): string => `<div class="b hdr">${s ? `<div class="sub">${s}</div>` : ''}<div class="ttl">${t}${tr ? `<span class="tr">${tr}</span>` : ''}</div></div>`,
  // 통계 스트립
  stat: (arr: readonly StatPair[]): string => `<div class="b stat">${arr.map(([v, k]) => `<div class="c"><div class="v">${v}</div><div class="k">${k}</div></div>`).join('')}</div>`,
  // 칩 (가로 스크롤, on=활성 인덱스, -1=없음)
  chips: (arr: readonly string[], on = 0): string => `<div class="b chips">${arr.map((c, i) => `<span class="chip${i === on ? ' on' : ''}">${c}</span>`).join('')}</div>`,
  // 세그먼티드 토글
  seg: (arr: readonly string[], on = 0): string => `<div class="b seg">${arr.map((s, i) => `<div class="s${i === on ? ' on' : ''}">${s}</div>`).join('')}</div>`,
  // CTA 버튼 (p=primary, s=success, d=disabled/outline)
  cta: (l: string, v: CtaVariant = 'p'): string => `<div class="b cta ${v}">${l}</div>`,
  // 페이저 dot
  pager: (n: number, on = 0): string => `<div class="b pager">${Array.from({ length: n }, (_, i) => `<span class="d${i === on ? ' on' : ''}"></span>`).join('')}</div>`,
  // 4계열 버튼 그리드 (fill=[1,0,0,0] 활성 표시)
  cat: (fill: readonly number[] = [1, 0, 0, 0]): string => `<div class="b cat">${CAT.map((c, i) => `<div class="cb" style="background:${fill[i] ? c : WF_SOFT};color:${fill[i] ? 'var(--seed-color-palette-static-white)' : WF_SUB}">${CATN[i]}</div>`).join('')}</div>`,
  // 메모/주석
  note: (t: string): string => `<div class="note">${t}</div>`,
  // 섹션 제목
  sect: (t: string): string => `<div class="sect">${t}</div>`,
  // 다크 화면용 중앙 힌트
  hint: (t: string): string => `<div class="hint">${t}</div>`,
  // 수직 스페이서
  sp: (h = 6): string => `<div style="height:${h}px"></div>`,
  // 진행률 바 (light=히어로 위 흰색)
  prog: (p: number, light = false): string => `<div class="prog${light ? ' light' : ''}"><i style="width:${p}%"></i></div>`,
  // 가로 동등 분할 row
  row: (items: readonly string[]): string => `<div class="b row">${items.join('')}</div>`,
  // 리스트 행 (아이콘 + 제목/부제 + 우측)
  listrow: (t: string, s: string, tr = ''): string => `<div class="listrow"><span class="ld"></span><span class="tx"><span class="t">${t}</span><span class="s">${s}</span></span>${tr ? `<span class="tr">${tr}</span>` : ''}</div>`,
  // 아바타 행 (작성자 카드)
  avrow: (nm: string, sub: string, tr = ''): string => `<div class="listrow"><span class="av">${nm[0]}</span><span class="tx"><span class="t">${nm}</span><span class="s">${sub}</span></span>${tr ? `<span class="tr">${tr}</span>` : ''}</div>`,
  // 그라데이션 히어로 (tone=지역 블루 톤)
  hero: (small: string, big: string, tone = false, extra = ''): string => `<div class="b hero${tone ? ' tone' : ''}">${small ? `<div class="small">${small}</div>` : ''}<div class="big">${big}</div>${extra}</div>`,
  // 도감 그리드
  grid: (cols: number, cells: readonly string[]): string => `<div class="b grid" style="grid-template-columns:repeat(${cols},1fr)">${cells.join('')}</div>`,
  // 자원 셀 (idx 코드, locked=미발견 grayscale, badge=발견 뱃지)
  cell: (idx: string, label: string, locked = false, badge = false): string => `<div class="cell${locked ? ' locked' : ''}"><div class="ci">${idx ? `<span class="idx">${idx}</span>` : ''}${badge ? '<span class="bdg"></span>' : ''}<span class="cph">사진</span></div><div class="ct">${label}</div></div>`,
};

const tabbar = (on: number): string => {
  const T = ['홈', '발견', '도감', '광장', '나'];
  return `<div class="tabbar">${T.map((t, i) => `<div class="t${i === on ? ' on' : ''}"><span class="g"></span>${t}</div>`).join('')}</div>`;
};

// ── 화면 정의 (screens.js 순서·번호·이름과 정확히 일치) ───────────
// tabbarOn: 하단 탭 활성 인덱스(홈0·발견1·도감2·광장3·나4) · noTab: 온보딩/오버레이/플로우
const S: readonly WireframeScreen[] = [
  // 01 온보딩 - 5장 풀스크린 페이저
  {
    id: '01', nm: '온보딩', noTab: true,
    scroll: [
      R.row([R.box('', 12), R.cta('건너뛰기', 'd')]),
      R.sp(10),
      R.img('핀 글리프 + 동심원', 150),
      R.sect('한국에는 꼭 가야 할 곳이 없었습니다'),
      R.note('5장 풀스크린 페이저 · 스와이프 / dot 탭 이동'),
      R.box('① 핀 컨셉\n② 3×3 도감 타일\n③ GPS 발견\n④ 5티어 칭호\n⑤ 이름 입력', 92),
      R.sp(8),
      R.pager(5, 0),
      R.row([R.cta('이전', 'd'), R.cta('계속', 'p')]),
      R.note("5장: 이름 입력 → '도감 시작하기' · 미입력 시 꼬마탐험가"),
    ],
  },

  // 02 홈
  {
    id: '02', nm: '홈', tabbarOn: 0,
    scroll: [
      R.bar('모두립'),
      R.box('안녕하세요, 탐험가님\n오늘 어디 가볼까요?', 50),
      R.stat([['12/40', '발견 자원'], ['5/17', '방문 지역'], ['30%', '달성률']]),
      R.note('통계 스트립 탭 → 도감 이동'),
      R.sect('오늘의 추천'),
      R.row([R.box('매우 혼잡 92\n설악산 · 강원', 78), R.box('한산 28\n팔공산 · 대구', 78)]),
      R.note('좌 danger 빨강 / 우 success 초록 · 하단 API 출처'),
      R.sect('최근 발견'),
      R.row([R.img('', 58), R.img('', 58), R.img('', 58)]),
      R.sect('아직 안 가본 지역'),
      R.grid(2, [R.cell('', '경북'), R.cell('', '전남')]),
      R.note('7초마다 4개씩 fade-up · 헤더 우측 dot'),
    ],
  },

  // 03 발견 (GPS 지도)
  {
    id: '03', nm: '발견 (GPS 지도)', tabbarOn: 1,
    custom:
      `${R.box('🔍 자원 검색', 36)}` +
      `<div class="b map" style="height:300px">한반도 SVG · 도로 점선` +
      `<span class="pin" style="left:36%;top:28%;background:${WF_CAT[0]}"></span>` +
      `<span class="pin sel" style="left:58%;top:46%"></span>` +
      `<span class="pin" style="left:48%;top:64%;background:${WF_CAT[3]}"></span>` +
      `<span class="me" style="left:50%;top:50%"></span>` +
      `<div class="zoom"><span class="zb">+</span><span class="zp">5km</span><span class="zb">&minus;</span></div>` +
      `</div>` +
      R.note('핀 3상태: 미발견(흰)·발견(색+체크)·선택(파란보더+pulse 1.4×) · 줌 9단계 · 현 위치 중앙 고정') +
      `<div class="sheet">${R.row([R.img('', 50), R.box('설악산\n자연 · 1.2km', 50)])}${R.cta('여기에서 발견하기', 'p')}</div>`,
  },

  // 04 발견 성공 (오버레이) - 다크
  {
    id: '04', nm: '발견 성공 (오버레이)', dark: true, noTab: true,
    scroll: [
      R.sect('✦ 발견!'),
      `<div class="card3d"><div class="ph"></div><div class="meta"><div class="nm">설악산</div><div class="sm">#012 · 자연 · 방금</div></div></div>`,
      R.hint('Stage1: X축 720° flip → Stage2: spring 안착 + confetti 56조각'),
      R.seg(['가벼운 발견', '깊은 발견'], 0),
      R.box('강원 진행률  +1 → 13/40', 42),
      R.row([R.cta('닫기', 'd'), R.cta('도감에서 확인', 'p')]),
    ],
  },

  // 05 도감 - 전국
  {
    id: '05', nm: '도감 - 전국', tabbarOn: 2,
    scroll: [
      R.hdr('전국 도감', '대한민국'),
      R.seg(['지도', '카드'], 0),
      R.stat([['120/640', '발견'], ['5/17', '지역'], ['19%', '달성']]),
      `<div class="b map" style="height:230px">17광역 폴리곤 · 채움률 알파<span class="pin sel" style="left:46%;top:40%"></span></div>`,
      R.note('선택 시 1.14× + 검정 보더 + 글로우 · 라벨 halo'),
      R.row([R.img('강원\n실루엣', 64), R.box('강원 · 38/120\n자연·유적·문화·축제', 64)]),
      R.note('지역 카드 탭 → 지역 상세'),
    ],
  },

  // 06 도감 - 지역 상세
  // 06 도감 - 광역 (전국 → 광역 → 시군피커 → 시군상세 4단 중 2단)
  {
    id: '06', nm: '도감 - 광역', tabbarOn: 2,
    scroll: [
      R.hero('강원특별자치도', '강원 · 38/120곳 발견', true, R.prog(32, true)),
      R.row([R.box('← 뒤로', 18), R.cta('시·군 고르기', 'd')]),
      R.note('광역 단위 요약. 시·군 목록으로 내려가거나 대표 자원을 바로 연다'),
      R.cat([1, 0, 0, 0]),
      R.sect('시·군별 진행'),
      R.grid(2, [R.cell('', '속초시 12/30'), R.cell('', '강릉시 9/28'), R.cell('', '춘천시 7/22', true), R.cell('', '평창군 4/18', true)]),
      R.sect('이 지역 프리셋'),
      R.listrow('강원 일출 코스', '5곳 · 담음 320', '›'),
      R.note('계층 규칙 출처: docs/05-API/분류체계-지역코드.md'),
    ],
  },

  // 06C 도감 - 시·군 피커
  {
    id: '06C', nm: '도감 - 시·군 피커', tabbarOn: 2,
    scroll: [
      R.hdr('강원특별자치도', '시·군 고르기', ''),
      R.box('시·군 검색', 34),
      R.seg(['전체', '발견', '미발견'], 0),
      R.listrow('속초시', '12/30 발견', '40%'),
      R.listrow('강릉시', '9/28 발견', '32%'),
      R.listrow('춘천시', '7/22 발견', '32%'),
      R.listrow('평창군', '4/18 발견', '22%'),
      R.note('시·군은 광역마다 개수가 달라 A~D 4패턴으로 분기한다(SIGUN_NAMES)'),
    ],
  },

  {
    id: '06B', nm: '도감 - 시군 상세', tabbarOn: 2,
    scroll: [
      R.hero('강원', '강원 · 38/120곳 발견', true, R.prog(32, true)),
      R.row([R.box('← 뒤로', 18), R.cta('프리셋 만들기', 'd')]),
      R.note("'프리셋 만들기'는 2곳 이상 발견 시에만 노출"),
      R.cat([1, 0, 0, 0]),
      R.chips(['전체', '산', '해변·섬', '계곡', '숲'], 0),
      R.seg(['전체', '발견', '미발견'], 0),
      R.grid(2, [R.cell('#001', '설악산', false, true), R.cell('#002', '경포대', false, true), R.cell('#003', '오대산', true), R.cell('#004', '정동진', true)]),
      R.note('미발견: grayscale + 실제 이름 / 발견: 컬러 + success 뱃지'),
    ],
  },

  // 07 장소 상세
  {
    id: '07', nm: '장소 상세', tabbarOn: 2,
    scroll: [
      R.img('헤로 320px · 탭 시 3D 카드 모달', 120),
      R.note('좌 뒤로 / 우 하트 · 우하단 발견·내사진 뱃지 · 좌하단 KTO 코드'),
      R.row([R.box('자연 · 산 · 강원\n설악산', 50), R.box('카카오\n길찾기', 50)]),
      R.box('내 사진 카드 · 등록 / 바꾸기 / 제거', 42),
      R.box('설명 · 머무는 시간 / 희귀도 / 시즌', 46),
      R.sect('30일 혼잡도'),
      R.grid(10, Array.from({ length: 10 }, (_, i) => `<div class="cell heat"><div class="ci" style="background:${i === 3 ? WF_HEAT.busy : (i % 3 ? WF_HEAT.mid : WF_HEAT.calm)}"></div></div>`)),
      R.note('한산 / 보통 / 혼잡 3색 · 오늘 cell 검정 보더'),
      R.box('자원 정보 · 주소 / 전화 / 시간 + 공식 페이지', 46),
      R.box('반경 5km 주변 · 식당 / 카페 / 숙박', 42),
      R.cta('여기로 떠나기', 'p'),
    ],
  },

  // 12 프리셋 - 만들기 (screens.js 위치 = place 다음, plaza 앞)
  {
    id: '12', nm: '프리셋 - 만들기', noTab: true,
    scroll: [
      R.hdr('', '강원 프리셋 만들기'),
      R.box('코스 이름 (한 줄, 필수)', 38),
      R.box('설명 (멀티라인, 선택)', 52),
      R.sect('태그 (최대 6)'),
      R.chips(['+ 일출', '+ 당일치기', '+ 자연', '+ 산악'], -1),
      R.row([R.box('강원에서 발견한 자원 · 12곳', 36), R.box('🔍 검색', 36)]),
      R.grid(3, [R.cell('', '설악산'), R.cell('', '경포대'), R.cell('', '오대산')]),
      R.sect('코스 순서'),
      R.listrow('1. 설악산', '위 / 아래 / 제거', '↑↓✕'),
      R.cta('등록', 'p'),
    ],
  },

  // 09 광장
  {
    id: '09', nm: '광장', tabbarOn: 3,
    scroll: [
      R.seg(['피드', '인기 프리셋', '리더보드', '동행'], 1),
      R.box('🔍 제목 / 지역 / 태그 통합 검색', 34),
      R.chips(['전체', '일출', '당일치기', '자연', '산악'], 0),
      R.note('태그 칩 다중 선택 · savedCount 내림차순 · Top3 메달'),
      R.row([R.box('🥇 강원 일출 코스\n5곳 · 담음 320', 78), R.box('🥈 제주 오름\n4곳 · 담음 210', 78)]),
      R.avrow('작성자', '등록 12 · 퍼감 540', '›'),
    ],
  },

  // 13 프리셋 - 상세
  {
    id: '13', nm: '프리셋 - 상세', noTab: true,
    scroll: [
      R.hero('강원', '강원 일출 코스', true, `<div class="small" style="margin-top:var(--seed-dimension-x1_5)">자원 5곳 · 담음 320회</div>`),
      R.avrow('작성자', '등록 12 · 퍼감 540', '›'),
      R.box('설명 · 멀티라인 본문', 42),
      R.chips(['일출', '당일치기', '자연'], -1),
      R.seg(['리스트 뷰', '지도 뷰'], 0),
      R.listrow('1. 설악산', '자연 · 강원', '›'),
      R.listrow('2. 경포대', '자연 · 강원', '›'),
      R.cta('내 프리셋에 가져오기', 'p'),
      R.note("본인: CTA 없음 / 담음: '담았어요' 초록 토글"),
    ],
  },

  // 14 타 유저 프로필
  {
    id: '14', nm: '타 유저 프로필', noTab: true,
    scroll: [
      R.hero('', '여행자 닉네임', false, R.row([R.box('210\n발견', 38), R.box('8\n지역', 38), R.box('1.2k\n퍼감', 38)])),
      R.sect('수집된 칭호 · 8개'),
      R.chips(['입문', '제주발견자', '봉우리수집가', '해양탐험가'], 0),
      R.sect('수집한 도감 · 많이 모은 순'),
      R.grid(3, [R.cell('', '제주 88%'), R.cell('', '강원 64%'), R.cell('', '경북 40%')]),
      R.pager(2, 0),
      R.note('2×3 슬라이드 · 7초 자동회전 · fade-up stagger'),
      R.sect('등록한 프리셋'),
      R.box('제주 오름 코스 · 4곳', 42),
    ],
  },

  // 10 칭호 (5티어)
  {
    id: '10', nm: '칭호 (5티어)', tabbarOn: 4,
    scroll: [
      R.box('획득 14 / 전체 60 · 5티어 시스템 · 대표 변경', 48),
      R.sect('티어 범례'),
      R.chips(['입문', '광역', '카테고리', '표고', '마스터'], 0),
      R.sect('획득'),
      R.row([R.box('제주를\n발견한 자', 58), R.box('봉우리\n수집가', 58)]),
      R.sect('진행 중'),
      R.listrow('에베레스트를 넘다', '누적 표고', '8/14'),
      R.note('획득: 티어색 강조 / 진행중: 회색 + progress'),
    ],
  },

  // 11 프로필 (나)
  {
    id: '11', nm: '프로필 (나)', tabbarOn: 4,
    scroll: [
      R.hero('나의 발견', '탐험가', false, R.row([R.box('5\n지역', 34), R.box('120\n발견', 34), R.box('14\n칭호', 34)])),
      R.listrow('칭호', '5티어 시스템', '›'),
      R.listrow('가고싶다', '저장한 장소', '›'),
      R.listrow('협력 혜택', '배지 3', '›'),
      R.sect('계열별 진행'),
      R.row([R.box('자연 40%', 42), R.box('유적 22%', 42)]),
      R.sect('내 프리셋'),
      R.box('아직 등록한 코스가 없어요', 42),
    ],
  },
];

export function buildGallery(): string {
  return inlineStyles(S.map((s) => {
    const body = s.custom || (s.scroll ? s.scroll.join('') : '');
    const tb = s.noTab ? '' : (typeof s.tabbarOn === 'number' ? tabbar(s.tabbarOn) : '');
    const kind = s.noTab ? (s.dark ? 'overlay' : 'flow') : 'tab';
    return (
      `<figure class="device">` +
        `<figcaption class="cap"><span class="no">${s.id}</span><span class="nm">${s.nm}</span><span class="tb">${kind}</span></figcaption>` +
        `<div class="screen">` +
          `<div class="notch"></div>` +
          `<div class="scroll${s.dark ? ' dark' : ''}">${body}</div>` +
          tb +
        `</div>` +
      `</figure>`
    );
  }).join(''));
}
