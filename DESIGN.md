# DESIGN.md - mockup/ (당근 SEED 적용 규칙)

이 저장소의 **디자인 실행 규칙**이다. 저장소 전반 지침은 [AGENTS.md](./AGENTS.md), 플랫폼 중립 디자인 결정과 근거는 `../docs/03-디자인/디자인시스템.md`에 있다.

## 이 문서의 원칙

1. **값을 외우지 말고 명령으로 확인한다.** 이 문서는 숫자표를 두지 않는다. 산문에 박힌 숫자는 조용히 썩는다(실제로 `globalGutter` 드리프트 경고가 거짓인 채로 남아 미결정 작업 항목까지 만들었다).
2. **모든 확인 방법에 필요 조건을 표시한다.** 협업자는 upstream clone도 MCP 설정도 없이 시작한다.

| 등급 | 필요한 것 | 예 |
|---|---|---|
| **L0** | `git clone`만 | `/seed-design` 스킬 · 스니펫 `seed-design/ui/*` |
| **L1** | `npm install` 후 | `node_modules/@seed-design/*` |
| **L2** | 네트워크 | `npx @seed-design/cli@latest ...` · seed-design.io |

## 정본은 `@seed-design/css`다

스타일 소스는 `src/app/layout.tsx`의 `import "@seed-design/css/all.css"` 하나뿐이고, 거기서 선언되는 `--seed-*`가 유일한 토큰 집합이다. `layout.tsx`가 `light-only`로 고정하므로 실값은 `all.css`의 `[data-seed-color-mode="light-only"]` 블록을 직독한다.

**단 브랜드 8개는 예외다.** 같은 파일의 `BRAND` 블록이 값을 덮어쓰므로 brand 축의 실값은 `all.css`가 아니라 `layout.tsx`를 봐야 한다(아래 "브랜드색 - 확정" 절). 토큰 **이름**은 그대로라 집합 크기는 변하지 않는다.

```sh
# L1 - 현재 버전과 토큰 개수
node -p "require('./node_modules/@seed-design/css/package.json').version"
node -p "require('./node_modules/@seed-design/react/package.json').version"
grep -ohE '^[[:space:]]*--seed-[a-z0-9_-]+:' node_modules/@seed-design/css/all.css | tr -d ' :' | sort -u | wc -l

# L1 - 특정 토큰의 실값
grep -o -- '--seed-dimension-spacing-x-global-gutter:[^;]*' node_modules/@seed-design/css/all.css
```

`package.json`의 `@seed-design/css` · `@seed-design/react` · `@karrotmarket/react-monochrome-icon` · `@karrotmarket/react-multicolor-icon` 4개가 SEED 의존성의 전부다.

- **`@seed-design/design-token`은 설치하지 마라.** npm description부터 `DEPRECATED: see @seed-design/css`다.
- `@seed-design/cli`·`docs-mcp`는 `npx`로만 쓰고 의존성에 넣지 않는다.
- **`@seed-design/react`를 올리면 `@seed-design/css`도 같이 올려야 한다.** react 2.1.0부터 css peer floor가 `^2.3.0`이다. 락파일이 둘을 함께 움직이는지 확인하라.

### client와의 버전 핀 일치

client는 `tool/seed_tokens/vendor/`에 동봉한 SEED 원본에서 Dart 토큰을 생성한다. 감시 대상은 **두 저장소의 토큰 값 일치**다.

**기준은 버전 문자열이 아니라 토큰 값이다.** 버전이 달라도 값이 같으면 화면은 갈라지지 않는다.

**[주의] 브랜드 축은 양쪽 다 SEED 원본에서 갈라져 있다(2026-08-02).** mockup은 `layout.tsx`의 `BRAND` 블록으로, client는 `lib/design/tokens/brand_overrides.dart`의 `SeedBrandColors`로 각각 청색을 덮는다(아래 "브랜드색 - 확정" 절). **두 저장소의 값은 서로 일치한다.** 다만 아래 `diff`는 SEED 원본끼리 비교하므로 이 재정의를 **잡아내지 못한다.** 브랜드 값을 바꿀 때는 두 곳을 손으로 함께 고쳐야 하고, 기계가 어긋남을 알려주지 않는다.

```sh
# 핀 확인
node -p "require('./node_modules/@seed-design/css/package.json').version"        # mockup
grep -n "seedCssVersion\|seedRootageVersion" ../client/tool/seed_tokens/seed_token_regeneration.dart  # client

# 진짜 검사 - 토큰 값 차이. 출력이 비면 화면이 갈라질 수 없다.
diff <(grep -oE '\-\-seed-[a-z0-9_-]+:[^;]+' ../client/tool/seed_tokens/vendor/css/all.css | sort -u) \
     <(grep -oE '\-\-seed-[a-z0-9_-]+:[^;]+' node_modules/@seed-design/css/all.css | sort -u)
```

**현재 상태(2026-07-31 실측).** mockup은 css 2.3.0, client 동봉본은 2.2.2로 버전이 다르지만 **값이 바뀐 토큰은 0건**이고 토큰 이름도 양쪽 575개로 같다. 차이는 2.3.0이 추가한 `content-dialog` 레시피 내부 변수 3개뿐인데, client는 그 컴포넌트를 이식하지 않았다. **의도된 skew다.** client를 2.3.0으로 재동봉하면 Rootage도 2.3.0(컴포넌트 90→97)으로 끌려와 고정 커밋 계약(client ADR-0002)이 깨지므로 별도 결정이 필요하다.

## SEED 조사 순서 - 한 단계만 쓰면 반드시 틀린다

| 단계 | 도구 | 등급 | 답하는 질문 |
|---|---|---|---|
| ① 발견 | `/seed-design` 스킬 (`.claude/skills/`, 커밋됨) | **L0** | "SEED에 이런 게 있나?" |
| ①' 발견 | `npx @seed-design/cli@latest docs <이름>` | L2 | 문서·llms.txt·스니펫 링크를 한 번에 |
| ② 확인 | `node_modules/@seed-design/*` | L1 | "설치된 버전에 실제로 있나?" |

①을 건너뛰면 있는 걸 없다고 단정한다(실제로 `SideNavigation`·`Layout`을 없다며 손으로 조립했었다). **`index.d.ts` grep은 re-export 구조라 이름이 안 잡히니 부재 판정 근거로 쓰지 마라.**

②를 건너뛰면 문서에만 있는 API를 쓴다. **문서 사이트는 `dev` 브랜치를 추적해 설치 버전보다 앞선다.**

```sh
# L1 - 부재 판정은 이것으로만
ls -d node_modules/@seed-design/react/lib/components/*/ | wc -l
ls -d node_modules/@seed-design/react/lib/components/*/ | xargs -n1 basename

# L1 - 실제 variant
grep -oE 'seed-[a-z-]+--[a-z]+_[a-zA-Z]+' node_modules/@seed-design/css/all.css | sort -u

# L2 - 설치 버전에 맞는 스니펫 설치 (dev 레지스트리를 당겨오지 않는다)
npx @seed-design/cli@latest add --seed-react-version <설치버전> ui:<이름>

# L2 - 커밋된 스니펫과 설치 패키지의 호환성 검사
npx @seed-design/cli@latest compat
```

**검증 결과(2026-07-31 실행).**

- `compat`은 동작한다. 커밋된 스니펫 24개를 검사해 "모든 스니펫이 현재 `@seed-design/react`, `@seed-design/css`와 호환"으로 통과했다(`list-header`는 `ui:list`에 포함돼 별도 항목이 아니라 24개다).
- **`docs <이름>`은 이름이 모호하면 대화형 프롬프트를 띄운다.** 예를 들어 `docs text-field`는 "Text Field Input / Text Field Textarea" 선택을 묻는다. 비대화형(에이전트·CI)에서는 멈추니, 그때는 아래 llms.txt를 직접 읽어라.

llms.txt는 clone·MCP 없이 URL만으로 읽을 수 있다.

[주의] **`llms.txt`는 하나가 아니고, 네임스페이스가 둘이다.** 전체 지도는 `../docs/협업규칙.md`의 "당근 SEED 를 확인하는 법" 절.

```
인덱스     /llms.txt · /<섹션>/llms.txt          ← 1차에서 끝난다 (2차 인덱스는 없다)
개별 문서  /llms/<섹션>/[<하위>/]<문서>.txt        ← 깊은 계층은 여기 있다
```

| 용도 | URL |
|---|---|
| **마스터 인덱스** (여기서 시작) | `https://seed-design.io/llms.txt` |
| 컴포넌트 인덱스 (**슬러그 확인은 여기서**) | `https://seed-design.io/react/llms.txt` |
| 개별 컴포넌트 | `https://seed-design.io/llms/react/components/{슬러그}.txt` |
| **토큰 전체 값** (light/dark 표) | `https://seed-design.io/llms/foundations/design-token/reference.txt` |
| 파운데이션 인덱스 | `https://seed-design.io/foundations/llms.txt` |
| 전체 문서 한 파일 (**약 2MB**) | `https://seed-design.io/react/llms-full.txt` |

**경로를 추측하지 마라.** `/foundations/design-token/llms.txt` 같은 2차 인덱스는 없다(2026-08-04 전수 확인). 인덱스를 타고 내려가면 문서 213개가 전부 링크돼 있다.

[주의] **404가 59KB짜리 SPA HTML을 돌려준다.** 응답이 비어 있지 않다고 성공으로 보면 안 되고 **HTTP 상태 코드를 봐야 한다.**

**슬러그는 컴포넌트 이름과 다를 수 있다.** `action-button`은 그대로지만 `text-field`는 존재하지 않고 `text-field-input`·`text-field-textarea`로 나뉜다. 추측하지 말고 인덱스에서 확인하라.

MCP를 쓰면 더 빠르다(`claude mcp add seed-docs -- npx -y @seed-design/docs-mcp`). **필수는 아니다.**

## 스타일 규칙 - SEED 토큰 재정의 1블록 외 자체 CSS 0

- **자체 CSS를 만들지 마라.** `.css` 파일 추가·자체 `--*` 토큰 선언 전부 금지.
- `<style>`은 `layout.tsx`에 **정확히 2개**뿐이고 둘 다 늘리지 않는다.
  1. `RESET` - 브라우저 정규화. 디자인 값을 일절 담지 않는다.
  2. `BRAND` - **브랜드 축 8개 재정의**(아래 "브랜드색" 절). SEED가 이미 쓰는 이름만 덮어쓰고, **새 `--*` 토큰은 만들지 않는다.**
- 값이 필요하면 `all.css`에서 찾고, 없으면 SEED가 그 축을 안 만든 것이니 **축을 포기하거나 있는 토큰으로 조립한다.**
- 새 UI가 필요하면 위 조사 순서로 SEED에 있는지 먼저 확인하고, 없을 때만 `Box`로 조립한다. 조립할 때도 색·간격·라운드는 SEED 토큰만 참조한다.

```sh
# 검증 - 기대값은 0 / 1 / 0 / 1 / 2 / 8 이다
find src public -name '*.css'                                          # 0
grep -rho 'var(--[a-z0-9_-]*' src/ | grep -v -- '--seed-'              # 1 (Mermaid.tsx 주석 오탐)
grep -rn 'className=' src/                                             # 0
grep -rhoE '(fontSize|gap|padding|margin)[A-Za-z]*: [1-9][0-9]*' src/  # 1 (온보딩 아트 marginTop: 90)
grep -o '<style>' src/app/layout.tsx | wc -l                           # 2 (RESET · BRAND)
grep -c -- '--seed-color-.*brand.*:#' src/app/layout.tsx               # 8 (재정의는 브랜드 8개뿐)
```

**재정의 경로는 브랜드 축 하나뿐이다.** 나머지 축은 여전히 재정의할 경로가 없고, client와 값이 갈라지려면 버전 핀이 갈라지는 수밖에 없다. **브랜드는 예외다.** 양쪽이 각자 SEED 원본을 덮고 있고 지금은 값이 일치하지만, 동기화를 보장하는 기계가 없다.

### 수치 스케일

| 속성 | 스케일 | 한계 |
|---|---|---|
| `fontSize`·`lineHeight` | `--seed-font-size-t*` · `--seed-line-height-t*` | 최소 `t1`. 그 아래는 표현 불가 |
| `borderRadius` | `--seed-radius-r*` + `-full` | 단계가 정해져 있다 |
| `gap`·`padding*`·`margin*` | `--seed-dimension-x*` | 상한이 있다 |
| `width`·`height` | 정확히 일치할 때만 토큰 | 레이아웃 치수를 흔들지 않기 위함 |

실제 단계와 값은 명령으로 확인하라.

```sh
grep -ohE '^[[:space:]]*--seed-(font-size|radius|dimension-x)[a-z0-9_-]*:[^;]*' node_modules/@seed-design/css/all.css | sort -u
```

토큰 대응이 없어 raw 값으로 남긴 곳은 4개뿐이다: `MockFrame` 베젤 라운드 2개, 온보딩 아트의 높이·상단 여백·라운드. 늘리지 마라.

### SEED가 안 만드는 축 - 버리거나 조립한 것

1. **letter-spacing 없음** → 축 자체를 버렸다. 다시 넣지 마라.
2. **폰트 미배포**(`font-family: inherit`뿐) → 시스템 폰트 위임. mono가 필요하면 CSS 일반 키워드 `ui-monospace, monospace`.
3. **CSS 리셋 미배포** → `layout.tsx` 리셋이 유일한 예외.
4. **keyframe은 SEED 파라미터형을 쓴다.** `seed-enter`/`seed-exit`가 `--seed-enter-*`/`--seed-exit-*`로 opacity·translate·scale·rotate를 받는다. 자체 `@keyframes`를 만들지 마라.
5. **4계열·17광역 식별색 축 없음** → SEED 유채색 palette 6개는 전부 임자가 있어(brand·informative·positive·warning·critical·magic) 21색을 배정할 수 없다. 그래서 4계열(`CATEGORY_GROUPS`)도 17광역 `tone`(`REGIONS`)도 **디자인 토큰이 아니라 도메인 데이터**로 보고 raw hex를 `bundle.tsx`에 둔다(`` `${tone}33` `` 알파 문자열 연결 때문에 `var()` 불가). 두 집합 다 **브랜드 청색과 겹치지 않게** 잡혀 있다. 값을 바꾸려면 `bundle.tsx`가 정본이고, CSS나 토큰으로 옮기지 마라. **17광역은 2026-08-04에 `tone`(채우기)·`dark`(글자와 흰글자 바탕)·`soft`(약배경) 3역할로 재확정됐다**(값과 근거는 `../docs/03-디자인/디자인시스템.md` "17광역 식별색 - 확장" 절). `tone`을 글자색으로, `dark`를 채우기로 뒤집어 쓰지 마라.
6. **TopNavigation·BottomNavigation 미배포** → `AppHeader`·`TabBar`는 `Box` 조립.
   - 단 **`AppBar`는 "없는" 게 아니다.** `@seed-design/stackflow`가 배포하고 레시피 CSS(`app-bar.css`·`app-bar-main.css`·`app-screen.css`)는 설치본에 이미 있다. 스니펫이 `@stackflow/react`에 의존해 Next.js인 이 저장소에서 못 쓰는 것뿐이다. **"없다"가 아니라 "stackflow 전용이라 안 쓴다"가 정확한 근거다.**
   - **사이드바는 조립 대상이 아니다.** `SideNavigation` 일습을 실제로 배포한다.

### 텍스트 입력은 `TextInput`·`TextArea` 어댑터를 쓴다

**raw `<input>`·`<textarea>`를 새로 만들지 마라.** `bundle.tsx` 상단의 `TextInput`·`TextArea` 어댑터가 SEED `TextField`를 감싼다. 2026-07-31에 손으로 조립하던 7곳(닉네임·시군 검색·광장 검색·프리셋 제목/설명/태그·자원 검색)을 전부 옮겼다.

- **`label`은 필수 prop이다.** SEED가 `aria-label` 없는 `TextFieldInput`에 콘솔 경고를 낸다. raw `<input>` 시절에는 이 결함이 조용히 묻혀 있었고, 교체하자 7곳 전부에서 드러났다.
- 검색 필드는 `prefixIcon={<TextFieldPrefixIcon svg={<I n="search" />} />}`, 지우기 버튼은 `suffix`로 넘긴다.
- 폭·배치가 필요하면 `style`로 넘긴다(`flex: 1`, `width: 160` 등). 색·간격·타이포는 넘기지 마라. 레시피가 정한다.
- **타이포를 키워야 하면 `variant`로 푼다.** 값 노드의 크기는 레시피가 정하고 override 경로가 없다. `outline`/`large`는 `t5`지만 `underline`/`large`는 `t6`이다. SEED는 underline을 "화면에 입력이 하나뿐일 때" 권장하는데, 온보딩 닉네임이 정확히 그 경우라 그렇게 쓴다.

```sh
# 기대값 3 - 어댑터 주석 1건 + 파일 첨부 숨김 트리거 2건(화면 07 · 04B)
grep -n '<input\|<textarea' src/design/bundle.tsx
```

**예외 2건: 파일 첨부(`<input type="file">`, 화면 07 · 04B).** `display: none`인 숨김 트리거라 시각 표면이 없고, SEED `AttachmentInput`으로 바꾸면 사진 UI 전체를 SEED 첨부 그리드로 대체하게 된다. 기계적 교체가 아니라 화면 재설계라 **의도적으로 두었다.** 두 화면 다 사진이 **장소당 한 장**이라 다중 첨부 그리드와 모델이 애초에 어긋난다. 사진 UI를 다시 설계할 때 함께 판단한다.

스니펫 레지스트리에는 설치본보다 훨씬 많은 항목이 있다. 화면에 직접 걸리는 미설치 후보: `select` · `select-box` · `field-button` · `action-sheet` · `menu-sheet` · `error-state` · `inline-banner` · `pull-to-refresh` · `slider` · `toggle-button` · `control-chip`.

## 두 채널을 섞어 쓴다

| 채널 | 위치 | 등급 |
|---|---|---|
| **런타임** | `@seed-design/react` | L1 |
| **CLI 스니펫** | `seed-design/ui/*.tsx` (**저장소에 커밋됨**) | **L0** |

레포 루트가 CLI 기본 경로이고 `seed-design.json`이 `"tsx": true`다. 스니펫은 커밋돼 있으므로 협업자는 `npm install` 없이도 사용 예제를 읽을 수 있다.

### 프리미티브 매핑 - `bundle.tsx` 상단 어댑터가 SEED API 사용법의 정답지

호출부 시그니처를 유지한 어댑터로 감싸 16개 화면이 코드 변경 없이 SEED로 렌더된다. Flutter 열은 client에 있는 대응 Widget이고, 정확한 상태는 `../client/tool/seed_specs/seed_component_coverage.json`이 정본이다.

| 우리 프리미티브 | SEED 대응 | 채널 | Flutter (client) |
|---|---|---|---|
| `Button` | `ActionButton` (primary→brandSolid · neutral→neutralSolid · outline→neutralOutline · subtle/soft→neutralWeak · ghost→ghost) | 런타임 | `SeedActionButton` |
| `Badge` | `Badge` (tone 6종 매핑, 계열 3종은 색만 주입) | 런타임 | `SeedBadge` |
| `Chip` | `Chip.Toggle` (`active`/`onClick` → `checked`/`onCheckedChange`) | 스니펫 | `SeedToggleChip` |
| `Avatar` | `Avatar` (px → size enum 스냅) | 스니펫 | `SeedAvatar` (badgeMask는 `none`·`circle`만) |
| `ListRow` | `List.Item` + Prefix/Content/Title/Detail/Suffix | 런타임 | `SeedListItem` (`last` 구분선 미대응) |
| `ViewToggle` | `SegmentedControl` (`aria-label` 필수) | 스니펫 | 미이식 |
| `IconButton` | `ActionButton layout="iconOnly"` (자식은 SEED `<Icon svg={<I/>}>` 필수, `inverse`는 `neutralWeak`) | 런타임 | `SeedIconButton` (`semanticLabel` 필수) |
| `Sidebar` | `SideNavigation` (Item은 `asChild`로 `next/link` 위임, 활성은 `current`) | 런타임 | 미이식 (웹 전용) |
| `TextInput` · `TextArea` | `TextFieldRoot` + `TextFieldInput`/`TextFieldTextarea` (+`TextFieldPrefixIcon`). `label`(aria-label) 필수 | 런타임 | 미이식 |
| `Card` · `Progress` · `AppHeader` · `TabBar` | 없음 → `Box` 조립 | - | 미이식 |

### 화면 골격·문서형 페이지

- `src/app/layout.tsx`: 셸은 SEED `LayoutRoot` + `Sidebar`(`SideNavigation`) + `SideNavigationInset`.
- `src/components/doc.tsx`: 문서형 페이지 공용 스타일. SEED에 문서 타이포 프리셋이 없어 직접 조립.
- `/design/database`는 `Text`·`Callout`·`Badge`·`Divider` 등 SEED 컴포넌트로 조립돼 있다. 컨텍스트 배지 9개만 토큰 배경 pill이다(`Badge` tone이 enum 6종이라 9색 식별색 표현 불가).

## 아이콘

- **SEED 모노크롬 41종**(`bundle.tsx`의 `SEED_ICONS`) + **자체 path 12종**(`src/lib/customIcons.ts`). 자체 12종 = SEED에 대응물 없음 8종(`mountain`·`waves`·`droplets`·`trees`·`mountain-snow`·`wind`·`church`·`lamp`) + 대체 시 의미 손실 4종(`landmark`·`library`·`sunset`·`message-circle`).
- SEED `Line` 아이콘은 stroke가 아니라 **fill 기반**이라 선 굵기를 바꿀 수 없다. 활성 상태는 `Line`↔`Fill` 스왑으로 표현한다(Fill 5종: user·users·compass·home·book-open).
- **앱 화면에서 `import * as` 금지.** named import만. 예외는 `/icons` 카탈로그(각 패키지 `loader` 진입점으로 지연 로딩).

## 이미 밟은 지뢰 - 반복하지 마라

1. **TDZ 오류** - 섹션을 객체/배열로 모으면 모듈 로드 시 JSX가 즉시 평가된다. 헬퍼는 `const` 화살표가 아니라 **`function` 선언으로 호이스팅하라.**
2. **`asChild` 중첩 금지** - `BottomSheetTrigger`는 내부에서 이미 Slot을 쓴다. 자식에 또 주면 "Slot failed to slot onto its children".
3. **Icon/Asset 슬롯에 문자열 금지** - `FloatingActionButton`의 `icon`과 `ContentPlaceholder` children은 React 엘리먼트(SVG)여야 한다. 이모지 문자열은 프리렌더를 실패시킨다.
4. **스니펫 `ContentPlaceholder`는 children을 내부에서 `.Asset`으로 감싼다.** `ContentPlaceholder.Asset` 직접 접근은 undefined다.
5. **`SegmentedControl`은 `aria-label`/`aria-labelledby` 필수.** 없으면 프리렌더 실패.
6. **`ActionButton layout="iconOnly"`의 자식은 SEED `<Icon svg={} />`여야 한다.** raw `<svg>`는 dev에서 throw(`IconRequired`). 아이콘 컴포넌트는 `forwardRef` + rest 전달로 Radix Slot의 className/ref를 `<svg>`까지 흘려야 한다(`I`가 그 예).
7. **`TextFieldInput`·`TextFieldTextarea`는 `aria-label`(또는 `Field`+`FieldLabel`)이 없으면 콘솔 경고를 낸다.** 어댑터가 `label`을 필수로 받아 막는다. 빌드·타입체크는 통과하므로 **경고는 실행해야만 보인다.**
8. **`TextFieldRoot`의 가장자리 여백은 SEED 자기 클래스에만 붙는다.** `suffixIcon:last-child`가 `margin-right: x4`(large) / `x3_5`(medium)를 주는데, 생 `<button>`을 자식으로 넣으면 그 클래스가 없어 여백 0으로 모서리에 붙고 root의 `overflow:hidden` + radius에 잘린다. `TextInput` 어댑터가 `suffix`를 감싸 같은 값을 준다. **직접 넣지 말고 어댑터를 써라.**
9. **`TextFieldTextarea`는 `autoresize` 기본값이 true다.** 입력할수록 높이가 무한히 늘어 아래 섹션을 민다. 레이아웃을 고정해야 하면 `TextArea`에 `autoresize={false}` + `style`로 높이를 준다.
10. **`SegmentedControl` 아이템은 최소 너비와 좌우 패딩이 크다.** 402px 프레임의 헤더 trailing 슬롯에 안 들어가니 헤더 아래 전폭 행으로 내려라.

## 라이선스 - Apache-2.0 + 당근 상표 조항

`@seed-design/react` · `@seed-design/css` · `@karrotmarket/react-monochrome-icon` · `@karrotmarket/react-multicolor-icon` 전부 Apache-2.0. 코드·토큰은 상업 목적 포함 자유롭게 쓸 수 있다. 다만:

1. **귀속 고지 의무(제4조).** 재배포 시 LICENSE 사본 + NOTICE 고지를 함께 전달해야 한다. mockup은 `/licenses` 라우트가 빌드 시점에 `node_modules`의 원문을 읽어 이행한다. **client(제출물)에도 같은 화면이 필수다.** 앱스토어 출시물에 빠지면 위반이고, 공모전 규정상 저작권 위반은 심사 결격 사유다.
2. **브랜드 리소스 조항.** 로고·상호명·캐릭터 등 당근으로 식별되는 요소는 사전 협의 없이는 비상업 한정이며, 당근 사칭·제휴 오인 유발은 무조건 금지다. 앱 화면에 당근 로고·상호명·캐릭터를 쓰지 않는다. Multicolor 아이콘은 브랜드 리소스 여부를 개별 검토하기 전에는 앱 화면에 넣지 않는다(`/icons`는 개발용 전체 카탈로그라 예외).

## 브랜드색 - 확정 (2026-08-02)

브랜드 축은 **청색**으로 확정했고, `src/app/layout.tsx`의 `BRAND` 블록이 SEED 토큰 **9개**(시맨틱 8 + 팔레트 1)를 재정의한다. 이전의 "브랜드색 미확정 · 자체 CSS 0 우선" 보류는 이것으로 해소됐다.

**2026-08-03에 앱 아이콘 기준으로 재정렬했다.** hue를 205°에서 216°로 옮겨 아이콘의 파랑과 `bg.brand-solid`를 같은 값으로 맞췄다(구 `#0B72C4`와 ΔE 37.3). 아이콘 원본 `#0D6EFD`는 흰 글자 대비가 정확히 4.50:1이라 여유가 없어, hue·채도를 유지한 채 명도만 한 단 내린 `#0266FB`(4.89:1)를 양쪽 공통값으로 쓴다. 역할 분리 구조는 그대로다.

### 값 - 여기가 mockup의 정본이다

| 토큰 | 값 | 역할 |
|---|---|---|
| `--seed-color-bg-brand-solid` | `#0266FB` | 버튼·핀 **바탕**(위에 흰 글자). **앱 아이콘과 같은 값** |
| `--seed-color-bg-brand-solid-pressed` | `#0250C5` | 위 바탕의 press |
| `--seed-color-fg-brand` | `#0250C5` | 브랜드 **글자·아이콘** |
| `--seed-color-fg-brand-contrast` | `#0250C5` | 고대비 글자 |
| `--seed-color-stroke-brand-solid` | `#0250C5` | 진한 경계 |
| `--seed-color-bg-brand-weak` | `#EEF5FF` | 약배경 |
| `--seed-color-bg-brand-weak-pressed` | `#E0ECFF` | 약배경 press |
| `--seed-color-stroke-brand-weak` | `#BBD6FE` | 옅은 경계 |
| `--seed-color-palette-carrot-200` | `#E0ECFF` | **팔레트 단계.** 아래 설명 참조 |

**9번째는 시맨틱이 아니라 팔레트 단계다.** SEED가 이 단계만 컴포넌트 규칙에서 **직접** 참조해서, 시맨틱 8개로는 덮이지 않는다. `all.css` 5곳이 해당한다 - progress-circle `tone_brand` · action-button `brandOutline` · reaction-button의 `--track-color`, 그리고 checkmark `ghost-tone_brand` hover 배경. 덮지 않으면 **로딩 중인 brand 버튼에서 파란 arc 아래 트랙이 주황으로 깔린다.** 값을 `bg.brand-weak-pressed`와 같게 둔 이유는 SEED도 그 별칭을 `carrot-200`으로 정의하기 때문이다. 두 경로가 같은 값을 가리키게 맞춘 것이다.

나머지 carrot 단계(100 · 300 · 600 · 700 · 800)는 시맨틱 별칭 정의에만 쓰이므로 위 8개로 이미 덮인다. 확인은 `rg "var\(--seed-color-palette-carrot-" node_modules/@seed-design/css/all.css`로 한다.

**`bg.brand-solid` 위 흰 글자는 4.89:1이라 모든 글자 크기에서 WCAG AA를 통과한다.** 글자 크기 제약이 없으므로 `SeedActionButton`·`SeedBadge` 어느 크기에 써도 된다.

### 왜 재정의인가

SEED에는 **브랜드 팔레트 교체 API가 없다.** `@seed-design/css/theming`이 노출하는 건 `generateThemingScript({ mode, fontScaling })`뿐이고 `mode`는 `system`·`light-only`·`dark-only` 3종이다. `ActionButton` 등 여러 컴포넌트가 brand 토큰에 내부 결합돼 있어 **CSS 재정의 말고는 회피 수단이 없다.** 그래서 "자체 CSS 0"에 예외 1블록을 뚫는 쪽을 택했다.

### 왜 carrot을 버렸나

1. **대비 미달.** carrot-600 `#E65200`은 흰 배경 대비 3.77:1, carrot-700 `#E14D00`은 3.99:1로 둘 다 본문 대비 기준(4.5:1)에 못 미친다. 새 `fg.brand` `#0250C5`는 **7.10:1**이다.
2. **지역색 충돌.** carrot은 17광역 `tone`의 주황 계열과 사실상 같은 색이라 "브랜드"와 "지역 식별색"을 화면에서 구분할 수 없었다. 브랜드를 청색으로 옮기고 17광역 `tone`을 전면 교체해 두 축을 갈랐다.

### 바탕과 글자의 역할을 나눈다

carrot 시절에는 `bg.brand-solid`도 `fg.brand`도 carrot-600 **하나**였다. 한 색으로 둘을 겸하면 반드시 한쪽이 깨진다. 지금은 나눈다.

- **바탕** `#0266FB` - 흰 글자를 얹는 면적 요소용. 흰색 대비 4.89:1로 **본문 기준(4.5:1)까지 넘어 글자 크기 제약이 없다.** 앱 아이콘과 같은 값이다.
- **글자·아이콘** `#0250C5` - 흰 배경에 얹는 선/점 요소용. 7.10:1. `bg.brand-weak` 위에서도 6.47:1.

**`fg.brand`를 바탕으로, `bg.brand-solid`를 글자색으로 바꿔 쓰지 마라.** 역할이 뒤집히면 대비 근거가 통째로 무너진다.

### 지켜야 할 것

- 시맨틱 8개 **외에** brand 토큰을 더 재정의하지 마라. 그 8개가 `all.css` light 블록의 brand 토큰 전부다. 팔레트는 컴포넌트가 직접 참조하는 `carrot-200` 하나만 예외로 덮는다.
- 새 `--*` 토큰을 만들지 마라. 이 블록은 **재정의 전용**이다.
- 선택자는 `:root[data-seed][data-seed-color-mode="light-only"]`(특정도 0-3-0)다. `all.css`의 light 블록이 `:root[data-seed-color-mode="light-only"]`(0-2-0)로 선언하므로 **맨 `:root`(0-1-0)로 쓰면 소스 순서와 무관하게 진다.** 특정도를 낮추지 마라.
- `src/components/Mermaid.tsx`의 `token()` fallback 2개가 같은 값을 복제하고 있다(SSR용). 값을 바꾸면 **같이 바꿔라.**
- **client에도 같은 값이 심겨 있다**(`lib/design/tokens/brand_overrides.dart`의 `SeedBrandColors`). 값을 바꾸면 반드시 두 곳을 함께 고쳐라. 어긋나도 기계가 잡지 못한다.

플랫폼 중립 근거는 `../docs/03-디자인/디자인시스템.md`.
