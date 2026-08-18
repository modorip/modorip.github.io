# TECH.md - mockup/ (기술 상세)

**이 저장소가 어떻게 만들어져 있나.** 명령을 돌리면 확인되는 사실만 둔다. 지켜야 할 규칙은 [AGENTS.md](./AGENTS.md), SEED 적용 규칙은 [DESIGN.md](./DESIGN.md)에 있다.

## 기술 스택

- 프레임워크: Next.js (App Router)
- UI: React
- 타입: TypeScript (`strict: true` · `allowJs: false`)
- 스타일: `@seed-design/css` **하나뿐**. 자체 CSS 0개
- 린트: ESLint 9 (flat config)

**버전은 이 문서에 적지 않는다.** 단일 소스는 `package.json` 과 `package-lock.json` 이다.

```sh
npm ls next react typescript @seed-design/css --depth=0
```

## 실행·검증

```sh
npm install
npm run dev
npm run start     # http://localhost:3000
```

**PR 이 없으니 CI 도 없다.** 커밋 전에 아래를 직접 통과시킨다. **이게 유일한 안전망이다.**

```sh
npx tsc --noEmit && npm run lint && npm run build
```

| 명령 | 통과 기준 |
|---|---|
| `npm run build` | exit 0. TypeScript 검사를 포함한다 |
| `npx tsc --noEmit` | 경고·오류 없이 exit 0 |
| `npm run lint` | 오류·경고 없이 exit 0 |
| `npx @seed-design/cli@latest compat` | 커밋된 SEED 스니펫 ↔ 설치 패키지 호환성 |

[주의] **빌드 통과만으로 화면 렌더를 검증할 수 없다.** `/mockup/*`·`/prototype` 은 `ClientOnly` 로 감싸 클라이언트에서 렌더되므로 **SSG HTML 이 비어 있는 게 정상이다.** UI 를 바꿨으면 `npm run start` 로 실제 화면을 본다.

## TypeScript 설정 함정

`tsconfig.json` 이 `paths` 로 `@/*`·`seed-design/*` 별칭을 건다. `src/` 전체, 스니펫 `seed-design/ui/*`, 화면 정본 `bundle.tsx` 까지 전부 TS 다.

- **[주의] TS 7 로 올리지 마라.** Next 가 `does not provide the compiler API required` 로 빌드를 거부한다(네이티브 Go 포팅판이라 컴파일러 API 미제공). `package.json` 의 버전 범위를 넓히지 마라
- **[주의] `baseUrl` 을 넣지 마라.** TS 6 에서 deprecated 오류가 나며, **이 오류가 `tsc --noEmit` 의 파일 검사 전체를 조용히 건너뛰게 만든다.** `paths` 는 tsconfig 기준 상대경로로 쓴다
- **`jsconfig.json` 을 두지 마라.** tsconfig 와 공존하면 Next 가 tsconfig 만 읽는다
- 새 파일도 TS 로 만든다. `any` 금지, 객체 형태는 `export interface`, interface 로 표현하기 어려운 형태(튜플 등)만 `type` 별칭

## 라우트

| URL | 목적 |
|---|---|
| `/` | 인덱스 (4카드 + 16화면 링크) |
| `/storyboard` | 6 시나리오 × 단계별 프리뷰 |
| `/mockup`, `/mockup/[id]` | 고충실도 썸네일 / 풀스크린 (16개 SSG) |
| `/prototype` | `MockApp` 스택 내비게이션 |
| `/icons` | SEED Monochrome + Multicolor + 모두립 자체 아이콘 카탈로그 |
| `/design`, `/design/database` | ERD |
| `/licenses` | 오픈소스 고지. **Apache-2.0 제4조 이행** |

프레임 규격: `CANVAS_W=402 / CANVAS_H=874` (iPhone 14 Pro 비율).

## 화면 정의 16개

화면 목록 정본은 `src/lib/screens.ts`, **구현 정본은 `src/design/bundle.tsx`** 다. `bundle.tsx` 는 생성 원본이 제거됐으므로(구 docs ADR-0016) **이 파일이 정본이고 직접 수정한다.**

| no | id | 이름 | tab |
|---|---|---|---|
| 01 | `onboarding` | 온보딩 (5장 페이저) | - |
| 02 | `home` | 홈 | home |
| 03 | `discover` | 발견 (GPS 지도, 9단계 줌) | discover |
| 04 | `discover-success` | 발견 성공 (3-stage 오버레이) | discover |
| 04B | `review-create` | 노트 남기기 (사진 1장 + 글) | discover |
| 05 | `dex` | 도감 전국 (지도↔카드 토글) | dex |
| 06 | `dex-province` | 도감 광역 | dex |
| 06C | `dex-sigun-picker` | 도감 시·군 피커 | dex |
| 06B | `dex-region` | 도감 시군 상세 | dex |
| 07 | `place` | 장소 상세 | dex |
| 12 | `preset-create` | 프리셋 만들기 | dex |
| 09 | `plaza` | 광장 (4탭) | plaza |
| 13 | `preset` | 프리셋 상세 | plaza |
| 14 | `user-profile` | 타 유저 프로필 | plaza |
| 10 | `titles` | 칭호 (5티어) | profile |
| 11 | `profile` | 프로필 | profile |

`review-create`(04B)는 발견 성공 오버레이 **위에 한 겹 더** 뜬다. 스택에 넣지 않는다(넣으면 뒤의 오버레이가 사라지고 닫을 때 3-stage 애니메이션이 처음부터 다시 돈다). 사진·노트는 `modorip:photo:{placeId}` · `modorip:review:{placeId}` 로 **장소당 한 칸씩만** 저장하며, 사진 한 장이 도감 카드·장소 상세 헤로·3D 카드의 대표 이미지를 겸한다.

## 재사용 자산 - `bundle.tsx` 도메인 데이터가 최고 가치

Dart const 로 바로 옮길 수 있다. **위치는 심볼명으로 grep 하라.** 줄번호는 금방 어긋난다.

| 자산 | 심볼 (파일) |
|---|---|
| 화면 인벤토리 16개 | `SCREENS` (`src/lib/screens.ts`) |
| 자체 아이콘 path 12개 | `CUSTOM_ICON_PATHS` (`src/lib/customIcons.ts`) |
| SEED 아이콘 매핑 41개 | `SEED_ICONS` (`bundle.tsx`) |
| 4계열 · 21 카테고리 | `CATEGORY_GROUPS` · `CATEGORIES` (`bundle.tsx`) |
| 17광역 마스터 (id·name·full·`tone`·`dark`·`soft`) | `REGIONS` (`bundle.tsx`) |
| 목데이터 자원 81개 (**WGS84 `lat`·`lng` 포함**) | `PLACES` (`bundle.tsx`) |
| 위경도 ↔ SVG 투영 상수·haversine | `geoToSvg` · `SVG_PER_METER` · `haversineMeters` (`bundle.tsx`) |
| 칭호 5티어 13개 | `TITLE_TIERS` · `TITLES` (`bundle.tsx`) |
| 시군 마스터 + 계층 4패턴(A~D) | `SIGUN_NAMES` (`bundle.tsx`) |
| 시그니처 도시 좌표 9개 | `SIGNATURE_CITIES` (`bundle.tsx`) |
| 광역 catchphrase 17개 | `REGION_CATCHPHRASES` (`bundle.tsx`) |
| 한반도 SVG path·라벨·viewBox·bbox | `KOREA_PATHS` · `KOREA_LABELS` 외 (`bundle.tsx`) |
| 렌더 z-order · 라벨 수동 보정 8개 | `KOREA_RENDER_ORDER` · `KOREA_LABEL_OVERRIDES` (`bundle.tsx`) |
| 화면 전이 그래프 (라우터 설계 근거) | `src/lib/storyboard.ts` |
| 탭 역추적 규칙 | `src/components/MockApp.tsx` |

## 스킬

이 저장소에는 `seed-design` 스킬이 들어 있다.

```
.claude/skills/seed-design/     # Claude Code 용
.agents/skills/seed-design/     # 도구 중립
```

SEED 셋업·컴포넌트 탐색·토큰·CLI 워크플로우를 다룬다. **`git clone` 만으로 돈다**(L0).
