# AGENTS.md - mockup/ (모두립 화면 목업)

Next.js 16 · React 19 · TypeScript 6. **공모전 제출물이 아니다**(구 docs ADR-0015(공모전 앱 단독 제출)). Flutter 구현의 **화면 설계 레퍼런스**로 유지한다. 결함의 미세 조정보다 Flutter 이식에 필요한 데이터·상호작용 명세 보존을 우선한다.

루트 공통 지침은 [../AGENTS.md](../AGENTS.md). Claude Code는 [CLAUDE.md](./CLAUDE.md)가 이 파일을 import한다.

## 실행

```sh
npm run build     # ✅ exit 0, 정적 25 페이지(10 static + /mockup/[id] SSG 15). TypeScript 검사 포함
npm run dev
npm run start     # http://localhost:3080
npx tsc --noEmit  # 경고·오류 없이 exit 0 이어야 한다
npm run lint      # ESLint 9 flat config. 오류·경고 없이 exit 0
```

빌드 통과만으로 화면 렌더를 검증할 수 없다. `/mockup/*`·`/prototype`은 `ClientOnly`로 감싸 클라이언트에서 렌더되므로 SSG HTML이 비어 있는 게 정상이다. UI 변경 후에는 `npm run start`로 실제 화면을 확인한다.

## TypeScript

`typescript@6.0.3`, `tsconfig.json`(`strict: true` · `allowJs: false` · `paths`로 `@/*`·`seed-design/*` 별칭). `src/` 전체, 스니펫 `seed-design/ui/*` 25개, 화면 정본 `bundle.tsx`까지 전부 TS다. `jsconfig.json`은 두지 마라(tsconfig와 공존 시 Next가 tsconfig만 읽는다).

- **⚠️ TS 7로 올리지 마라.** Next 16이 `does not provide the compiler API required`로 빌드를 거부한다(네이티브 Go 포팅판이라 컴파일러 API 미제공). `package.json`의 `^6.0.3` 범위를 넓히지 마라.
- **`baseUrl`을 넣지 마라.** TS 6에서 deprecated 오류가 나며, 이 오류가 `tsc --noEmit`의 파일 검사 전체를 조용히 건너뛰게 만든다. `paths`는 tsconfig 기준 상대경로로 쓴다.
- 새 파일도 TS로 만든다. `any` 금지, 객체 형태는 `export interface`, interface로 표현하기 어려운 형태(튜플 등)만 `type` 별칭.

## 라우트

| URL | 목적 |
|---|---|
| `/` | 인덱스 (4카드 + 15화면 링크) |
| `/wireframes` | 저충실도 갤러리 |
| `/storyboard` | 6 시나리오 × 단계별 프리뷰 |
| `/mockup`, `/mockup/[id]` | 고충실도 썸네일 / 풀스크린 (15개 SSG) |
| `/prototype` | `MockApp` 스택 네비게이션 |
| `/icons` | SEED Monochrome 676종 + Multicolor 100종 + 모두립 12종 카탈로그 |
| `/design`, `/design/database` | ERD |
| `/licenses` | 오픈소스 고지. Apache-2.0 제4조 이행 |

프레임 규격: `CANVAS_W=402 / CANVAS_H=874` (iPhone 14 Pro 비율).

## 화면 정의 15개 - Flutter 구현 명세

화면 목록 정본은 `src/lib/screens.ts`, 구현 정본은 `src/design/bundle.tsx`다. `bundle.tsx`는 생성 원본이 제거됐으므로(구 docs ADR-0016(당근 SEED 전환)) **이 파일이 정본이고 직접 수정한다.**

| no | id | 이름 | tab |
|---|---|---|---|
| 01 | `onboarding` | 온보딩 (5장 페이저) | - |
| 02 | `home` | 홈 | home |
| 03 | `discover` | 발견 (GPS 지도, 9단계 줌) | discover |
| 04 | `discover-success` | 발견 성공 (3-stage 오버레이) | discover |
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

**⚠️ 명세(`../docs/01-기능명세서`)와 1:1이 아니다.** `dex-province`(06)·`dex-sigun-picker`(06C)는 명세에 없는 신규 확장이다(명세 06은 단일 계층, mockup은 전국 → 광역 → 시군피커 → 시군상세 4단. 근거는 `docs/05-API/분류체계-지역코드.md`의 계층 규칙). 명세 `08 3D카드모달`은 독립 화면이 아니라 `PlaceDetailScreen` 내부에서만 열린다. **mockup이 앞서 있고 명세가 뒤처진 상태다. 화면을 바꾸면 명세도 갱신하라.**

## Flutter 이식

프레임워크는 Flutter를 우선한다: 15개 커스텀 화면·도감·카드·애니메이션 등 공통 UI 비중이 높고, 네이티브 경계를 Kakao Map(`PlatformView` + platform channel) 하나로 좁힐 수 있다. 이 목업이 React라는 사실은 선택 근거가 아니다(DOM·CSS 기반이라 React Native로도 재작성이 필요하다).

client 착수 전 실기기 검증 4종: ① Kakao Map 네이티브 뷰 + 현재 위치 + Flutter 오버레이 ② 포그라운드·백그라운드 위치 권한과 지오펜스 수명주기 ③ Supabase 카카오·구글·애플 로그인과 딥링크 ④ SEED 토큰을 옮긴 대표 화면 1개(텍스트 확대·스크린 리더). 지도 결합이나 위치 수명주기가 불안정하면 React Native보다 Kotlin·Swift 네이티브를 먼저 재평가한다.

SEED는 Flutter 런타임 패키지가 없다. `@seed-design/css`의 light-only 값을 Dart 토큰으로 옮기고 필요한 컴포넌트를 재구현한다. `/licenses` 상당 화면·NOTICE 고지·제휴 부인도 함께 이식한다. **`../client/lib/design/tokens.dart`는 구 선언값이니 기준으로 쓰지 마라.**

### 재사용 자산 - `bundle.tsx` 도메인 데이터가 최고 가치

Dart const로 바로 옮길 수 있다. 위치는 심볼명으로 grep 하라(줄번호는 금방 어긋난다).

| 자산 | 심볼 (파일) |
|---|---|
| 화면 인벤토리 15개 | `SCREENS` (`src/lib/screens.ts`) |
| 자체 아이콘 path 12개 | `CUSTOM_ICON_PATHS` (`src/lib/customIcons.ts`) |
| SEED 아이콘 매핑 41개 | `SEED_ICONS` (`bundle.tsx`) |
| 4계열 · 21 카테고리 | `CATEGORY_GROUPS` · `CATEGORIES` (`bundle.tsx`) |
| 17광역 마스터 (id·name·full·tone) | `REGIONS` (`bundle.tsx`) |
| 목데이터 자원 81개 | `PLACES` (`bundle.tsx`) |
| 칭호 5티어 13개 | `TITLE_TIERS` · `TITLES` (`bundle.tsx`) |
| 시군 마스터 + 계층 4패턴(A~D) | `SIGUN_NAMES` (`bundle.tsx`) |
| 시그니처 도시 좌표 9개 | `SIGNATURE_CITIES` (`bundle.tsx`) |
| 광역 catchphrase 17개 | `REGION_CATCHPHRASES` (`bundle.tsx`) |
| 한반도 SVG path·라벨·viewBox·bbox | `KOREA_PATHS` · `KOREA_LABELS` 외 (`bundle.tsx`) |
| 렌더 z-order · 라벨 수동 보정 8개 | `KOREA_RENDER_ORDER` · `KOREA_LABEL_OVERRIDES` (`bundle.tsx`) |
| 화면 전이 그래프 (라우터 설계 근거) | `src/lib/storyboard.ts` |
| 탭 역추적 규칙 | `src/components/MockApp.tsx` |

`PLACES` 81개는 분포 편향이 심하다(제주가 절반 가까이, 광주·세종·울산·대구·대전 0개). `r.total = Math.max(list.length, 12)`가 지역 총계를 인위 보정하고 있어 서버 카운트로 교체해야 한다.

## ⚠️ 라이선스 (SEED = Apache-2.0 + 당근 상표 조항)

`@seed-design/react` · `@seed-design/css` · `@karrotmarket/react-monochrome-icon` · `@karrotmarket/react-multicolor-icon` 전부 Apache-2.0. 코드·토큰은 상업 목적 포함 자유롭게 쓸 수 있다. 다만:

1. **귀속 고지 의무(제4조).** 재배포 시 LICENSE 사본 + NOTICE 고지를 함께 전달해야 한다. mockup은 `/licenses` 라우트가 빌드 시점에 `node_modules`의 원문을 읽어 이행한다. **client(제출물) 이식 시 같은 화면 필수** - 앱스토어 출시물에 빠지면 위반이다.
2. **브랜드 리소스 조항.** 로고·상호명·캐릭터 등 당근으로 식별되는 요소는 사전 협의 없이는 비상업 한정이며, 당근 사칭·제휴 오인 유발은 무조건 금지다. 앱 화면에 당근 로고·상호명·캐릭터를 쓰지 않는다. Multicolor 아이콘은 브랜드 리소스 여부를 개별 검토하기 전에는 앱 화면에 넣지 않는다(`/icons`는 개발용 전체 카탈로그라 예외). 가이드라인: `app.notion.com/p/daangn/6fdd92981e4a42d8b29c89cbbba7a8b7`

**⚠️ 남은 리스크 - 브랜드색이 당근 carrot 주황(`#f60`) 그대로다.** SEED에는 브랜드 팔레트 교체 API가 없고(공식 테마는 라이트/다크뿐), 컴포넌트 13개(action-button·badge·checkmark·switchmark 등)가 brand 토큰에 내부 결합돼 있어 팔레트 CSS 재정의 말고는 회피 수단이 없다. 2026-07-29 사용자 결정으로 "자체 CSS 0"을 우선해 주황을 유지한다. 되돌리려면 `layout.tsx` `<style>`에 `--seed-color-palette-carrot-100~1000` 재지정 10줄. **앱스토어 출시 전 재검토 대상.**

## ⚠️ SEED 조사 순서 (한 단계만 쓰면 반드시 틀린다)

| 단계 | 도구 | 답하는 질문 |
|---|---|---|
| ① 발견 | `seed-docs` MCP | "SEED에 이런 게 있나?" |
| ② 확인 | `node_modules/@seed-design/*` | "설치된 2.0.5에 실제로 있나?" |

- ①을 건너뛰면 있는 걸 없다고 단정한다(실제로 `SideNavigation`·`Layout`을 없다며 손으로 조립했었다). `index.d.ts` grep은 re-export 구조라 이름이 안 잡히니 **부재 판정 근거로 쓰지 마라.**
- ②를 건너뛰면 문서에만 있는 API를 쓴다. 문서 사이트는 `dev` 브랜치를 추적해 **설치 버전보다 앞선다**(예: `SideNavigationItemButton` · `Layout density="high"`는 2.0.5에 없다).

```sh
ls -d node_modules/@seed-design/react/lib/components/*/   # 82개. 부재 판정은 이걸로만
grep -oE 'seed-[a-z-]+--[a-z]+_[a-zA-Z]+' node_modules/@seed-design/css/all.css | sort -u   # 실제 variant
```

MCP 섹션은 5개: `react`(components · **blocks** · getting-started · stackflow · migration · updates) · `docs`(Foundation) · `breeze` · `ai-integration` · `lynx`. **`blocks`를 빼먹지 마라** - `Layout`·`SideNavigation`·`Footer`가 거기 있다.

## 스타일 규칙 - 토큰 정본은 `@seed-design/css` (자체 CSS 0)

- **자체 CSS를 만들지 마라.** `.css` 파일 추가·`<style>` 삽입·자체 `--*` 토큰 선언 전부 금지. 유일한 예외는 `layout.tsx`의 리셋이며 디자인 값은 담지 않는다.
- 스타일 소스는 `layout.tsx`의 `import "@seed-design/css/all.css"` 하나뿐이고, 거기서 선언되는 **`--seed-*` 575개**가 유일한 토큰 집합이다. 실값은 all.css의 `[data-seed-color-mode="light-only"]` 블록을 직독하라(`layout.tsx`가 light-only 고정).
- 값이 필요하면 all.css에서 찾고, 없으면 SEED가 그 축을 안 만든 것이니 축을 포기하거나 있는 토큰으로 조립한다.

```sh
# 검증 - 기대값은 0 / 1 / 0 / 1 이다
find src public -name '*.css'                                          # 0
grep -rho 'var(--[a-z0-9_-]*' src/ | grep -v -- '--seed-'              # 1 (Mermaid.tsx 주석 오탐)
grep -rn 'className=' src/                                             # 0
grep -rhoE '(fontSize|gap|padding|margin)[A-Za-z]*: [1-9][0-9]*' src/  # 1 (온보딩 아트 marginTop: 90)
```

### 수치 스케일

| 속성 | 스케일 | 한계 |
|---|---|---|
| `fontSize`·`lineHeight` | `--seed-font-size-t1~t14` · `--seed-line-height-t1~t14` | 최소 t1 = 11px. 그 아래는 표현 불가 |
| `borderRadius` | `--seed-radius-r1~r6` + `-full` | 4·8·12·16·20·24 뿐 |
| `gap`·`padding*`·`margin*` | `--seed-dimension-x0_5~x16` | 최대 x16 = 64 |
| `width`·`height` | 정확히 일치할 때만 토큰 | 레이아웃 치수를 흔들지 않기 위함 |

토큰 대응이 없어 raw 값으로 남긴 곳: `MockFrame` 베젤 라운드 52·42, 온보딩 아트 `height:300`·`marginTop:90`·`borderRadius:28`.

### SEED가 안 만드는 축 - 버리거나 조립한 것

1. **letter-spacing 없음** → 축 자체를 버렸다. 다시 넣지 마라.
2. **폰트 미배포**(`font-family: inherit`뿐) → 시스템 폰트 위임. mono가 필요하면 CSS 일반 키워드 `ui-monospace, monospace`.
3. **CSS 리셋 미배포** → `layout.tsx` 리셋이 유일한 예외.
4. **keyframe은 SEED 파라미터형을 쓴다.** `seed-enter`/`seed-exit`가 `--seed-enter-*`/`--seed-exit-*`로 opacity·translate-x/y·scale·rotate를 받는다. 자체 `@keyframes`를 만들지 마라.
5. **4계열·17광역 식별색 축 없음** → 4계열은 SEED 팔레트 배정(자연=green · 유적=yellow · 문화=purple · 축제=red). 17광역 `tone`은 데이터로서 raw hex 유지(`` `${tone}33` `` 알파 문자열 연결 때문에 `var()` 불가).
6. **TopNavigation·BottomNavigation React 미배포** → `AppHeader`·`TabBar`는 `Box` 조립. 단 **사이드바는 조립 대상이 아니다** - `SideNavigation` 일습을 실제로 배포한다(과거에 "없다"고 잘못 단정했던 전례가 있다. 위 조사 순서를 지켜라).

### 화면 골격·문서형 페이지

- `src/app/layout.tsx`: 셸은 SEED `LayoutRoot` + `Sidebar`(`SideNavigation`) + `SideNavigationInset`.
- `src/components/doc.tsx`: 문서형 페이지(설계·스토리보드·와이어프레임) 공용 스타일. SEED에 문서 타이포 프리셋이 없어 직접 조립.
- `src/lib/wireframeStyles.ts`: `buildGallery()` HTML 문자열의 class를 인라인 style로 치환하는 리졸버.
- `/design/database`는 `Text`·`Callout`·`Badge`·`Divider` 등 SEED 컴포넌트로 조립돼 있다. 컨텍스트 배지 9개만 토큰 배경 pill이다(`Badge` tone이 enum 6종이라 9색 식별색 표현 불가).

## 아이콘

- **SEED 모노크롬 41종**(`bundle.tsx` `SEED_ICONS`) + **자체 path 12종**(`src/lib/customIcons.ts`). 자체 12종 = SEED에 대응물 없음 8종(`mountain`·`waves`·`droplets`·`trees`·`mountain-snow`·`wind`·`church`·`lamp`) + 대체 시 의미 손실 4종(`landmark`·`library`·`sunset`·`message-circle`).
- SEED `Line` 아이콘은 stroke가 아니라 **fill 기반**이라 선 굵기를 바꿀 수 없다. 활성 상태는 `Line`↔`Fill` 스왑으로 표현한다(Fill 5종: user·users·compass·home·book-open).
- **앱 화면에서 `import * as` 금지.** named import만. 예외는 `/icons` 카탈로그(각 패키지 `loader` 진입점으로 지연 로딩).

## 당근 SEED 적용

`@seed-design/react` 2.0.5 + `@seed-design/css` 2.2.2 + `@karrotmarket/react-monochrome-icon` 1.25.0 + `@karrotmarket/react-multicolor-icon` 1.27.0. 이 4개가 SEED 의존성의 전부다.

- **`@seed-design/design-token`은 설치하지 마라** - npm description부터 `DEPRECATED: see @seed-design/css`다. `@seed-design/cli`·`docs-mcp`는 `npx`로만 쓰고 의존성에 넣지 않는다.
- 두 채널을 섞어 쓴다: **런타임** `@seed-design/react`(export 492개) + **CLI 스니펫** `seed-design/ui/*.tsx` 25개(레포 루트 = CLI 기본 경로, `seed-design.json`이 `"tsx": true`).
- 문서 확인: `claude mcp add seed-docs -- npx -y @seed-design/docs-mcp`

### 프리미티브 매핑 (`bundle.tsx` 상단 어댑터가 SEED API 사용법의 정답지)

호출부 시그니처를 유지한 어댑터로 감싸 15개 화면이 코드 변경 없이 SEED로 렌더된다.

| 우리 프리미티브 | SEED 대응 | 채널 |
|---|---|---|
| `Button` | `ActionButton` (primary→brandSolid · neutral→neutralSolid · outline→neutralOutline · subtle/soft→neutralWeak · ghost→ghost) | 런타임 |
| `Badge` | `Badge` (tone 6종 매핑, 계열 3종은 색만 주입) | 런타임 |
| `Chip` | `Chip.Toggle` (`active`/`onClick` → `checked`/`onCheckedChange`) | 스니펫 |
| `Avatar` | `Avatar` (px → size enum 스냅) | 스니펫 |
| `ListRow` | `List.Item` + Prefix/Content/Title/Detail/Suffix | 런타임 |
| `ViewToggle` | `SegmentedControl` (`aria-label` 필수) | 스니펫 |
| `IconButton` | `ActionButton layout="iconOnly"` (자식은 SEED `<Icon svg={<I/>}>` 필수, `inverse`는 `neutralWeak`) | 런타임 |
| `Sidebar` | `SideNavigation` (Item은 `asChild`로 `next/link` 위임, 활성은 `current`) | 런타임 |
| `Card` · `Progress` · `AppHeader` · `TabBar` | 없음 → `Box` 조립 | - |

### 이미 밟은 지뢰 (반복하지 마라)

1. **TDZ 오류** - 섹션을 객체/배열로 모으면 모듈 로드 시 JSX가 즉시 평가된다. 헬퍼는 `const` 화살표가 아니라 **`function` 선언으로 호이스팅하라.**
2. **`asChild` 중첩 금지** - `BottomSheetTrigger`는 내부에서 이미 Slot을 쓴다. 자식에 또 주면 "Slot failed to slot onto its children".
3. **Icon/Asset 슬롯에 문자열 금지** - `FloatingActionButton`의 `icon`과 `ContentPlaceholder` children은 React 엘리먼트(SVG)여야 한다. 이모지 문자열은 프리렌더를 실패시킨다.
4. **스니펫 `ContentPlaceholder`는 children을 내부에서 `.Asset`으로 감싼다.** `ContentPlaceholder.Asset` 직접 접근은 undefined다.
5. **`SegmentedControl`은 `aria-label`/`aria-labelledby` 필수.** 없으면 프리렌더 실패.
6. **`ActionButton layout="iconOnly"`의 자식은 SEED `<Icon svg={} />`여야 한다.** raw `<svg>`는 dev에서 throw(`IconRequired`). 아이콘 컴포넌트는 `forwardRef` + rest 전달로 Radix Slot의 className/ref를 `<svg>`까지 흘려야 한다(`I`가 그 예).
7. **`SegmentedControl` 아이템은 `min-width: 86px` + `padding-inline: 24px`.** 402px 프레임의 헤더 trailing 슬롯에 안 들어가니 헤더 아래 전폭 행으로 내려라.

## 남은 결함

**의존성 보안 추적**: `npm audit`은 high 11건, `--omit=dev`는 high 2건. 운영 2건은 Next 16.2.12가 optional로 고정한 `sharp@0.34.5`에서 온다(현재 `next/image`·`sharp` 미사용이라 공격 표면 제한적, Next가 `sharp>=0.35.0`을 허용하면 재검사). 나머지는 ESLint 체인의 개발 전용 경고다. **`npm audit fix --force`는 Next 14·ESLint 10으로 강제 변경하므로 실행 금지.**

## 주의

- 새 UI가 필요하면 **SEED에 있는지 먼저 확인하고**(위 조사 순서) 없을 때만 `Box`로 조립한다. 조립할 때도 색·간격·라운드는 SEED 토큰만 참조한다.
- 화면을 바꾸면 `../docs/01-기능명세서/`도 갱신한다. 현재 06 계층 확장이 미반영 상태다.
- 자체 토큰 → SEED 치환 이력(매핑표·치환 통계)은 이 문서에서 뺐다. 필요하면 git 히스토리(2026-07-28~29 커밋)를 보라.
- 개인 메모는 `CLAUDE.local.md`(gitignore).
