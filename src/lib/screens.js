// 화면 인벤토리 (SSR-safe 메타데이터). 실제 렌더는 ScreenHost가 design/bundle에서 매핑.
export const SCREENS = [
  { id: "onboarding",       no: "01", name: "온보딩",            tab: null,      group: "온보딩" },
  { id: "home",            no: "02", name: "홈",                tab: "home",    group: "홈" },
  { id: "discover",        no: "03", name: "발견 (GPS 지도)",    tab: "discover",group: "발견" },
  { id: "discover-success",no: "04", name: "발견 성공 (오버레이)",tab: "discover",group: "발견" },
  { id: "dex",             no: "05", name: "도감 — 전국",        tab: "dex",     group: "도감" },
  { id: "dex-province",    no: "06", name: "도감 — 광역",        tab: "dex",     group: "도감" },
  { id: "dex-sigun-picker",no: "06C",name: "도감 — 시·군 피커",    tab: "dex",     group: "도감" },
  { id: "dex-region",      no: "06B",name: "도감 — 시군 상세",    tab: "dex",     group: "도감" },
  { id: "place",           no: "07", name: "장소 상세",          tab: "dex",     group: "도감" },
  { id: "preset-create",   no: "12", name: "프리셋 — 만들기",     tab: "dex",     group: "프리셋" },
  { id: "plaza",           no: "09", name: "광장",              tab: "plaza",   group: "광장" },
  { id: "preset",          no: "13", name: "프리셋 — 상세",       tab: "plaza",   group: "프리셋" },
  { id: "user-profile",    no: "14", name: "타 유저 프로필",      tab: "plaza",   group: "광장" },
  { id: "titles",          no: "10", name: "칭호 (5티어)",       tab: "profile", group: "프로필" },
  { id: "profile",         no: "11", name: "프로필 (나)",        tab: "profile", group: "프로필" },
];
export const byId = (id) => SCREENS.find((s) => s.id === id);
