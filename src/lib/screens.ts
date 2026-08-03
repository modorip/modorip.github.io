// 화면 인벤토리 (SSR-safe 메타데이터). 실제 렌더는 ScreenHost가 design/bundle에서 매핑.

/** 하단 탭바 5개 중 이 화면이 속한 탭. 온보딩처럼 탭 밖의 화면은 null. */
export type ScreenTab = 'home' | 'discover' | 'dex' | 'plaza' | 'profile';

/** 사이드바·인덱스에서 화면을 묶는 단위. 탭과 1:1이 아니다(프리셋은 dex·plaza에 걸친다). */
export type ScreenGroup = '온보딩' | '홈' | '발견' | '도감' | '프리셋' | '광장' | '프로필';

export interface Screen {
  /** 라우트 세그먼트(`/mockup/[id]`) 겸 bundle.tsx 화면 매핑 키 */
  id: string;
  /** 기능명세서 화면 번호. 06B·06C 처럼 접미사가 붙어 숫자가 아니라 문자열이다 */
  no: string;
  name: string;
  tab: ScreenTab | null;
  group: ScreenGroup;
}

export const SCREENS = [
  { id: "onboarding",       no: "01", name: "온보딩",            tab: null,      group: "온보딩" },
  { id: "home",            no: "02", name: "홈",                tab: "home",    group: "홈" },
  { id: "discover",        no: "03", name: "발견 (GPS 지도)",    tab: "discover",group: "발견" },
  { id: "discover-success",no: "04", name: "발견 성공 (오버레이)",tab: "discover",group: "발견" },
  { id: "review-create",   no: "04B",name: "후기 남기기",         tab: "discover",group: "발견" },
  { id: "dex",             no: "05", name: "도감 - 전국",        tab: "dex",     group: "도감" },
  { id: "dex-province",    no: "06", name: "도감 - 광역",        tab: "dex",     group: "도감" },
  { id: "dex-sigun-picker",no: "06C",name: "도감 - 시·군 피커",    tab: "dex",     group: "도감" },
  { id: "dex-region",      no: "06B",name: "도감 - 시군 상세",    tab: "dex",     group: "도감" },
  { id: "place",           no: "07", name: "장소 상세",          tab: "dex",     group: "도감" },
  { id: "preset-create",   no: "12", name: "프리셋 - 만들기",     tab: "dex",     group: "프리셋" },
  { id: "plaza",           no: "09", name: "광장",              tab: "plaza",   group: "광장" },
  { id: "preset",          no: "13", name: "프리셋 - 상세",       tab: "plaza",   group: "프리셋" },
  { id: "user-profile",    no: "14", name: "타 유저 프로필",      tab: "plaza",   group: "광장" },
  { id: "titles",          no: "10", name: "칭호 (5티어)",       tab: "profile", group: "프로필" },
  { id: "profile",         no: "11", name: "프로필 (나)",        tab: "profile", group: "프로필" },
] as const satisfies readonly Screen[];

/** SCREENS 에 실재하는 id 만 허용하는 유니온. 배열에서 파생돼 수기 동기화가 필요 없다. */
export type ScreenId = (typeof SCREENS)[number]['id'];

/** 라우트 파라미터 등 검증되지 않은 문자열을 받으므로 미스는 undefined 로 돌려준다. */
export const byId = (id: string): Screen | undefined => SCREENS.find((s) => s.id === id);
