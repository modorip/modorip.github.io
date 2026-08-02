# 모두립 · Mockup

모두립 앱의 **화면 설계 레퍼런스**입니다. 15개 화면의 풀스크린 목업과 동작하는 프로토타입을 한 곳에서 봅니다.

> **이 저장소는 공모전 제출물이 아닙니다.** 제출물은 Flutter 앱(`modorip/client`)이고, 여기는 그 구현의 근거가 되는 화면 설계본입니다.

**UI는 전부 당근 [SEED Design](https://seed-design.io)으로 만듭니다. 자체 CSS 파일이 하나도 없습니다.** 규칙은 아래 [스타일 규칙](#스타일-규칙)을 반드시 읽어주세요.

---

## 왜 Flutter인가

Flutter는 기존 문서가 지정해서가 아니라 모두립의 제품 조건을 기준으로 선택합니다.

- iOS와 Android에 15개 커스텀 화면, 도감, 카드, 애니메이션을 같은 모습으로 구현하고 한 코드베이스에서 유지할 수 있습니다.
- 화면, 상태, Supabase 연동, 캐시, 오프라인 큐는 공통으로 만들고, 공식 Flutter 지도 SDK가 없는 Kakao Map만 [Platform Views](https://docs.flutter.dev/platform-integration/android/platform-views)와 [platform channels](https://docs.flutter.dev/platform-integration/platform-channels)로 Android/iOS SDK에 연결할 수 있습니다.
- React Native를 선택해도 이 Next.js 목업의 DOM, CSS, `@seed-design/react` 화면은 다시 작성해야 하며 Kakao Map 네이티브 연결도 남습니다.
- 완전 네이티브는 지도 연동에는 가장 직접적이지만 화면과 QA를 Kotlin, Swift로 중복 유지해야 합니다.
- Lynx는 SEED 지원이 장점이지만 현재 공개 컴포넌트 범위와 지도·위치·카메라·인증·푸시의 네이티브 확장을 먼저 검증해야 합니다.

SEED는 Flutter 선택의 이점이 아닙니다. Flutter용 SEED 런타임 패키지가 없으므로 CSS의 light-only 토큰 값을 Dart로 옮기고 필요한 컴포넌트를 다시 구현해야 합니다. client 착수 전에는 실제 기기에서 Kakao Map, 위치 수명주기, Supabase 소셜 로그인·딥링크, SEED 대표 화면과 접근성을 검증하고, 실패하면 완전 네이티브를 재평가합니다.

---

## Getting Started

### 1. 사전 요구사항

| | 버전 | 확인 |
|---|---|---|
| Node.js | **>= 20.9.0** (Next 16 요구) | `node -v` |
| npm | 10 이상 권장 | `npm -v` |
| TypeScript | **6.x 고정** (`npm install` 로 함께 깔립니다) | `npx tsc --version` |

검증 환경은 Node 24.15.0 / npm 11.12.1 / TypeScript 6.0.3 입니다.

> ⚠️ **TypeScript 를 7 로 올리지 마세요.** Next 16 이 `does not provide the compiler API required` 로 빌드를 거부합니다. TS 7 은 네이티브(Go) 포팅판이라 Next 가 쓰는 컴파일러 API 를 아직 제공하지 않습니다. `package.json` 의 `^6.0.3` 범위를 넓히지 마세요.

### 2. 설치

```bash
git clone https://github.com/modorip/mockup.git
cd mockup
npm install
```

> ⚠️ **`npm audit fix --force` 를 절대 실행하지 마세요.** Next 를 14 로 다운그레이드시켜 React 19 와 peer 충돌(ERESOLVE)이 납니다. 실수로 실행했다면 `npm pkg set dependencies.next="^16.2.9" && npm install` 로 복구합니다.

### 3. 실행

```bash
npm run dev                # http://localhost:3080
```

브라우저에서 `/` 를 열면 전체 화면 목록이 나옵니다. 좌측 사이드바로 모든 페이지에 접근할 수 있습니다.

### 4. 프로덕션 빌드 확인

```bash
npm run build              # 25 페이지 SSG. exit 0 이어야 합니다
npm run start              # http://localhost:3080
```

**변경 후에는 반드시 `npm run lint` 와 `npm run build` 를 통과시켜 주세요.** 빌드에는 TypeScript 검사가 포함됩니다.

> `npm run lint` 는 ESLint 9 flat config와 `eslint-config-next`로 실행됩니다. Next 16에서 제거된 `next lint` 대신 ESLint CLI를 직접 사용합니다.

타입만 따로 보려면 `npx tsc --noEmit` 을 씁니다. 경고와 오류 없이 exit 0이어야 합니다.

### 5. 화면이 제대로 나오는지 확인

빌드 통과가 렌더 성공을 뜻하지 않습니다. `/mockup/*` 와 `/prototype` 은 `ClientOnly` 로 감싸 클라이언트에서만 그려지므로 **SSG HTML 이 비어 있는 게 정상**입니다. 실제 화면은 `npm run dev` 후 브라우저로 확인해야 합니다.

---

## SEED Design 셋업

`npm install` 만 하면 **화면은 이미 뜹니다.** 아래는 SEED 를 직접 다룰 때(컴포넌트 추가·문서 조회) 필요한 것들입니다.

### 이미 설정돼 있는 것

| | 파일 | 내용 |
|---|---|---|
| npm 의존성 | `package.json` | `@seed-design/react` · `@seed-design/css` · `@karrotmarket/react-monochrome-icon` · `@karrotmarket/react-multicolor-icon` |
| CLI 설정 | `seed-design.json` | `{ "rsc": true, "tsx": true, "path": "./seed-design" }` |
| 경로 별칭 | `tsconfig.json` | `@/*` → `src/*`, `seed-design/*` → `seed-design/*` |
| 스니펫 | `seed-design/ui/` | `.tsx` 25개 (레포 루트) |

> `seed-design.json` 의 `rsc: true`(Next App Router) 는 **CLI 기본값과 다릅니다.** 지우지 마세요. `tsx: true` 는 이 레포가 TypeScript 라서 맞춘 값이고, `false` 로 되돌리면 CLI 가 `.jsx` 스니펫을 깔아 같은 이름의 `.tsx` 와 공존하면서 모듈 해석이 모호해집니다.
>
> `jsconfig.json` 은 **제거했습니다.** `tsconfig.json` 과 공존하면 Next 가 tsconfig 만 읽어 jsconfig 가 죽은 설정이 됩니다.

### 1. 컴포넌트 스니펫 추가 (`@seed-design/cli`)

CLI 는 **의존성에 넣지 않고 `npx` 로만** 씁니다.

```bash
npx @seed-design/cli@latest add ui:callout        # 스니펫 1개 추가 → seed-design/ui/callout.tsx
npx @seed-design/cli@latest add ui:side-navigation
npx @seed-design/cli@latest docs action-button    # 문서·llms.txt·스니펫 링크 조회
npx @seed-design/cli@latest compat                # 설치된 스니펫의 버전 호환성 검사
```

`init` 은 이미 실행돼 있습니다(`seed-design.json` 존재). 다시 돌리면 설정을 덮어씁니다.

> ⚠️ **`@seed-design/design-token` 을 설치하지 마세요.** npm description 자체가 `DEPRECATED: see @seed-design/css` 이고 SEED 2.x 이전 세대(1.0.5)입니다.

### 2. 문서 MCP 연동 (권장)

SEED 문서를 에이전트가 직접 조회하게 합니다. **컴포넌트가 있는지 없는지 판단할 때 반드시 필요합니다.**

```bash
# Claude Code
claude mcp add seed-docs -- npx -y @seed-design/docs-mcp
claude mcp list        # seed-docs: ... ✔ Connected 확인
```

다른 MCP 클라이언트는 설정 파일에 직접 넣습니다.

```json
{
  "mcpServers": {
    "seed-docs": { "command": "npx", "args": ["-y", "@seed-design/docs-mcp"] }
  }
}
```

조회 가능한 섹션은 5개입니다.

| 섹션 | 내용 |
|---|---|
| `react` | 컴포넌트 API · **`blocks`(앱 셸 `Layout` · `SideNavigation` · `Footer`)** · getting-started · stackflow · migration |
| `docs` | Foundation 가이드라인 (색·타이포·간격) |
| `breeze` | 유틸리티 컴포넌트 (현재 1개) |
| `ai-integration` | llms.txt 활용법 |
| `lynx` | Lynx 프레임워크 |

**`blocks` 를 빼먹지 마세요.** 앱 셸과 사이드바가 거기 있습니다.

MCP 없이 브라우저로 볼 때는 llms.txt 를 쓰면 됩니다.

```
https://seed-design.io/react/llms.txt
https://seed-design.io/llms/react/components/action-button.txt
```

### 3. Skills import (Claude Code)

이 레포에는 `seed-design` 스킬이 들어 있습니다.

```
.claude/skills/seed-design/     # Claude Code 용
.agents/skills/seed-design/     # 도구 중립
```

클론하면 **자동으로 로드**되므로 별도 import 가 필요 없습니다. 세션에서 `/seed-design` 으로 직접 호출할 수도 있습니다. 스킬은 프로젝트 상태(설정 파일·설치 버전·패키지 매니저)를 먼저 파악한 뒤 셋업·컴포넌트·파운데이션·CLI 중 맞는 가이드로 분기합니다.

다른 프로젝트로 가져가려면 디렉토리째 복사하면 됩니다.

```bash
cp -R .claude/skills/seed-design /path/to/other-project/.claude/skills/
```

---

## 페이지

| 경로 | 내용 |
|---|---|
| `/` | 인덱스 · 15개 화면 링크 |
| `/storyboard` | 시나리오별 화면 흐름 · 단계별 미리보기 |
| `/mockup` | 고충실도 목업 썸네일 |
| `/mockup/[id]` | 단일 화면 풀스크린 (15개 SSG) |
| `/prototype` | 탭·스택 네비게이션이 동작하는 인터랙티브 프로토타입 |
| `/icons` | SEED Monochrome 676종, Multicolor 100종, 모두립 12종 카탈로그. 검색 시 세 집합을 동시에 비교 |
| `/design` · `/design/database` | 설계 문서 · ERD |
| `/licenses` | 오픈소스 고지 (Apache-2.0 제4조 이행) |

프레임 규격은 **402 × 874** (iPhone 14 Pro 비율)입니다.

### 화면 15개

`onboarding` · `home` · `discover` · `discover-success` · `dex` · `dex-province` · `dex-sigun-picker` · `dex-region` · `place` · `preset-create` · `plaza` · `preset` · `user-profile` · `titles` · `profile`

정본은 `src/lib/screens.ts` 입니다. 화면을 추가·변경하면 여기부터 고치세요. `ScreenId` 타입이 `SCREENS` 배열에서 파생되므로, 화면을 추가하면 `storyboard.ts` 가 참조하는 id 도 자동으로 넓어집니다.

---

## 스타일 규칙

**이 저장소에는 자체 `.css` 파일이 없습니다. 새로 만들지 마세요.**

스타일 소스는 `src/app/layout.tsx` 의 `import "@seed-design/css/all.css"` 하나뿐이고, 쓸 수 있는 값은 거기서 선언되는 **`--seed-*` 토큰 575개**가 전부입니다.

```jsx
// ✅ 이렇게
<div style={{
  color: 'var(--seed-color-fg-neutral)',
  padding: 'var(--seed-dimension-x4)',
  fontSize: 'var(--seed-font-size-t4)',
  borderRadius: 'var(--seed-radius-r3)',
}} />

// ❌ 이렇게 하지 마세요
<div style={{ color: '#171719', padding: 16, fontSize: 14, borderRadius: 12 }} />
```

금지: `.css` 파일 추가 · `<style>` 삽입 · 자체 `--*` 토큰 선언 · hex/rgb 색 · px 숫자 리터럴.
(유일한 예외는 `layout.tsx` 의 브라우저 리셋 4줄입니다. SEED 가 리셋을 배포하지 않아 호스트 앱이 대야 합니다.)

### 변경 후 자가 점검

기대값은 **0 / 1 / 0 / 1** 입니다. 늘어나면 되돌려 주세요.

```bash
find src public -name '*.css'                                          # 0
grep -rho 'var(--[a-z0-9_-]*' src/ | grep -v -- '--seed-'              # 1 (오탐)
grep -rn 'className=' src/                                             # 0
grep -rhoE '(fontSize|gap|padding|margin)[A-Za-z]*: [1-9][0-9]*' src/  # 1
```

- **2번째가 1인 이유는 오탐입니다.** `Mermaid.tsx:12` 의 주석 문장(`` `fill:var(--x)` 에서 깨진다 ``)이 잡히는 것이고 실제 코드가 아닙니다.
- **4번째가 1인 이유**: `bundle.tsx` 온보딩 아트의 `marginTop: 90`. SEED dimension 최대가 64(`x16`)라 대응 토큰이 없습니다. 같은 이유로 `borderRadius` 52·42·28 도 토큰화하지 못했습니다(r 스케일 최대 24).

### 값·컴포넌트를 찾는 법

**두 단계를 모두 거치세요. 한 단계만 쓰면 틀립니다.**

```bash
# ① 발견 - "SEED 에 이런 게 있나?"  (MCP 등록 후 문서 조회)
claude mcp add seed-docs -- npx -y @seed-design/docs-mcp

# ② 확인 - "설치된 2.0.5 에 실제로 있나?"  (부재 판정은 이걸로만)
ls -d node_modules/@seed-design/react/lib/components/*/    # 82개
grep -- '--seed-' node_modules/@seed-design/css/all.css   # 토큰 실값
```

문서 사이트는 `dev` 브랜치를 추적해 **설치 버전보다 앞섭니다.** 문서에 있어도 2.0.5 에 없을 수 있습니다. 반대로 `index.d.ts` grep 은 re-export 구조라 이름이 안 잡히니 **부재 판정 근거로 쓰지 마세요.**

색 실값은 `all.css` 의 `[data-seed-color-mode="light-only"]` 블록이 실제 적용값입니다(이 앱은 라이트 모드 고정).

---

## 구조

```
src/
├── app/                      # Next App Router
│   ├── layout.tsx            # ★ 유일한 CSS import + 브라우저 리셋 + SEED 셸
│   ├── page.tsx              # 인덱스
│   └── storyboard/ mockup/ prototype/ design/ licenses/
├── components/
│   ├── Sidebar.tsx           # SEED SideNavigation
│   ├── MockFrame.tsx         # 402×874 디바이스 프레임 + useFitScale
│   ├── ScreenHost.tsx        # 단일 화면을 기본 props 로 렌더
│   ├── MockApp.tsx           # 스택 네비게이션 셸 (프로토타입)
│   ├── StoryboardView.tsx    # 스토리보드 2단 레이아웃
│   ├── FullScreenView.tsx    # /mockup/[id] 풀스크린 셸
│   ├── doc.tsx               # 문서형 페이지 공용 스타일
│   ├── Mermaid.tsx           # ERD 렌더 (SEED 토큰을 런타임에 읽어 넘김)
│   └── ClientOnly.tsx        # 클라 전용 렌더 가드
├── design/
│   └── bundle.tsx            # ★ 15개 화면 구현 정본 (strict TSX)
└── lib/
    ├── screens.ts            # ★ 화면 메타데이터 정본 (15개)
    ├── customIcons.ts        # 모두립 전용 SVG path 정본 (12개)
    ├── storyboard.ts         # 화면 전이 그래프
    └── designData.ts         # ERD·설계 원칙 데이터
seed-design/ui/               # SEED CLI 스니펫 .tsx 25개 (shadcn 모델)
docs/화면설계서.md             # 화면별 레이아웃 설계 문서
```

`src/`와 `seed-design/ui/`는 전부 TypeScript입니다. `bundle.tsx`의 15개 화면 구현도 `strict: true`로 검사하며 `allowJs: false`로 JS 유입을 막습니다.

### `src/design/bundle.tsx` 를 만질 때

**이 파일이 15개 화면의 정본입니다.** 예전엔 외부 레퍼런스에서 생성하는 산출물이었지만 원본이 제거돼(ADR-0016) **재생성 수단이 없습니다. 직접 수정하세요.**

Flutter 이식에 쓸 도메인 자산이 여기 모여 있습니다: 4계열 · 21카테고리 · 17광역 마스터 · 목데이터 81개 · 칭호 5티어 · 시군 마스터 · **한반도 SVG path 17개**. 자체 아이콘 path 12개는 `src/lib/customIcons.ts`에 분리했습니다. 자세한 위치는 [AGENTS.md](./AGENTS.md) 를 보세요.

아이콘은 대부분 SEED 로 옮겼습니다. 자체 SVG path 61개 중 **40개를 `@karrotmarket/react-monochrome-icon` 으로 교체**하고, 죽은 키 9개를 지우고, SEED 에 대응이 없는 **12개만 `CUSTOM_ICON_PATHS` 에 남겼습니다**(지형·자연물 6종 · 종교시설 1종 · 등불/기둥건물/책장/일몰/원형말풍선 5종). `/icons`에서 전체 목록을 검색하고 Line/Fill로 나눠 볼 수 있습니다.

> ⚠️ 앱 화면에 아이콘을 추가할 때 **`import * as` 를 쓰지 마세요.** named import 로 필요한 아이콘만 가져오세요. 전체 카탈로그인 `/icons`만 패키지의 `loader` 진입점을 사용해 각 아이콘을 지연 로딩합니다.

---

## 라이선스

이 저장소가 쓰는 SEED 패키지 4종은 모두 **Apache License 2.0** 입니다.

| 패키지 | 버전 |
|---|---|
| `@seed-design/react` | 2.0.5 |
| `@seed-design/css` | 2.2.2 |
| `@karrotmarket/react-monochrome-icon` | 1.25.0 |
| `@karrotmarket/react-multicolor-icon` | 1.27.0 |

- **재배포 시 라이선스 사본과 NOTICE 귀속 고지를 함께 전달해야 합니다**(제4조). 이 저장소는 `/licenses` 페이지로 이행합니다. **`client` 로 이식할 때 같은 화면을 반드시 만드세요.**
- 각 NOTICE 는 로고·상호명·캐릭터 등 **당근마켓 브랜드 리소스**를 상표로 보호한다고 안내합니다. 모두립의 앱 화면은 이를 사용하지 않으며, 당근마켓과 제휴·후원·보증 관계가 없습니다. `/icons`의 Multicolor 탭은 설치 패키지를 확인하는 개발용 카탈로그로, 서비스 UI 채택을 뜻하지 않습니다.
- ⚠️ 현재 브랜드색이 SEED 기본값(당근 carrot 주황)입니다. 배경과 재검토 시점은 [AGENTS.md](./AGENTS.md) 의 라이선스 절을 보세요.

---

## 더 읽을 것

| 문서 | 내용 |
|---|---|
| [AGENTS.md](./AGENTS.md) | 작업 지침 · SEED 적용 현황 · 밟은 지뢰 · 남은 결함 |
| [CLAUDE.md](./CLAUDE.md) | Claude Code 전용 지침 |
| `docs/화면설계서.md` | 화면별 레이아웃 설계 |
| `../docs/01-기능명세서/` | 기능 명세 (다른 저장소) |

**화면을 바꾸면 `../docs/01-기능명세서/` 도 같이 갱신해주세요.**
