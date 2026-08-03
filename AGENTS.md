# AGENTS.md - mockup/ (모두립 화면 목업)

Next.js 16 · React 19 · TypeScript 6. **공모전 제출물이 아니다**(구 docs ADR-0015(공모전 앱 단독 제출)). Flutter 구현의 **화면 설계 레퍼런스**로 유지한다. 결함의 미세 조정보다 Flutter 이식에 필요한 데이터·상호작용 명세 보존을 우선한다.

루트 공통 지침은 [../AGENTS.md](../AGENTS.md). Claude Code는 [CLAUDE.md](./CLAUDE.md)가 이 파일을 import한다.

## 실행

```sh
npm run build     # ✅ exit 0, 26 페이지(10 static + /mockup/[id] SSG 16). TypeScript 검사 포함
npm run dev
npm run start     # http://localhost:3080
npx tsc --noEmit  # 경고·오류 없이 exit 0 이어야 한다
npm run lint      # ESLint 9 flat config. 오류·경고 없이 exit 0
npx @seed-design/cli@latest compat   # 커밋된 SEED 스니펫 ↔ 설치 패키지 호환성
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
| `/` | 인덱스 (4카드 + 16화면 링크) |
| `/storyboard` | 6 시나리오 × 단계별 프리뷰 |
| `/mockup`, `/mockup/[id]` | 고충실도 썸네일 / 풀스크린 (16개 SSG) |
| `/prototype` | `MockApp` 스택 네비게이션 |
| `/icons` | SEED Monochrome 676종 + Multicolor 100종 + 모두립 12종 카탈로그 |
| `/design`, `/design/database` | ERD |
| `/licenses` | 오픈소스 고지. Apache-2.0 제4조 이행 |

프레임 규격: `CANVAS_W=402 / CANVAS_H=874` (iPhone 14 Pro 비율).

## 화면 정의 16개 - Flutter 구현 명세

화면 목록 정본은 `src/lib/screens.ts`, 구현 정본은 `src/design/bundle.tsx`다. `bundle.tsx`는 생성 원본이 제거됐으므로(구 docs ADR-0016(당근 SEED 전환)) **이 파일이 정본이고 직접 수정한다.**

| no | id | 이름 | tab |
|---|---|---|---|
| 01 | `onboarding` | 온보딩 (5장 페이저) | - |
| 02 | `home` | 홈 | home |
| 03 | `discover` | 발견 (GPS 지도, 9단계 줌) | discover |
| 04 | `discover-success` | 발견 성공 (3-stage 오버레이) | discover |
| 04B | `review-create` | 후기 남기기 (사진 1장 + 글) | discover |
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

`review-create`(04B)는 발견 성공 오버레이 **위에 한 겹 더** 뜬다. 스택에 넣지 않는다(넣으면 뒤의 오버레이가 사라지고 닫을 때 3-stage 애니메이션이 처음부터 다시 돈다). 사진·후기는 `modorip:photo:{placeId}` · `modorip:review:{placeId}`로 **장소당 한 칸씩만** 저장하며, 사진 한 장이 도감 카드·장소 상세 헤로·3D 카드의 대표 이미지를 겸한다.

**⚠️ 명세(`../docs/01-기능명세서`)와 1:1이 아니다.** `dex-province`(06)·`dex-sigun-picker`(06C)는 명세에 없는 신규 확장이다(명세 06은 단일 계층, mockup은 전국 → 광역 → 시군피커 → 시군상세 4단. 근거는 `docs/05-API/분류체계-지역코드.md`의 계층 규칙). 명세 `08 3D카드모달`은 독립 화면이 아니라 `PlaceDetailScreen` 내부에서만 열린다. **mockup이 앞서 있고 명세가 뒤처진 상태다. 화면을 바꾸면 명세도 갱신하라.**

## Flutter 이식

프레임워크는 Flutter를 우선한다: 16개 커스텀 화면·도감·카드·애니메이션 등 공통 UI 비중이 높다. 이 목업이 React라는 사실은 선택 근거가 아니다(DOM·CSS 기반이라 React Native로도 재작성이 필요하다).

**⚠️ 지도는 상용 SDK를 쓰지 않는다(2026-08-04, client ADR-0007(지도를 상용 SDK 대신 자체 그림 지도로 그린다)).** 배경 지도를 직접 그린다. 이전에 이 문단은 "네이티브 경계를 Kakao Map(`PlatformView` + platform channel) 하나로 좁힐 수 있다"고 적고 있었으나, **그 하나마저 없어졌다.** 지도가 순수 Flutter 렌더링이 되므로 네이티브 경계는 위치 권한뿐이다.

client 착수 전 실기기 검증: ① **자체 그림 지도 + 현재 위치 — 도로 없이 방향 감각이 잡히는가**(ADR-0007의 최대 미검증 항목. 안 잡히면 주요 도로를 직접 그려야 한다) ② 포그라운드·백그라운드 위치 권한과 지오펜스 수명주기 ③ Supabase 카카오·구글·애플 로그인과 딥링크 ④ SEED 토큰을 옮긴 대표 화면 1개(텍스트 확대·스크린 리더). 위치 수명주기가 불안정하면 React Native보다 Kotlin·Swift 네이티브를 먼저 재평가한다.

SEED는 Flutter 런타임 패키지가 없다. `@seed-design/css`의 light-only 값을 Dart 토큰으로 옮기고 필요한 컴포넌트를 재구현한다. `/licenses` 상당 화면·NOTICE 고지·제휴 부인도 함께 이식한다.

토큰 이식은 끝났다(2026-07-30). client는 고정 커밋 `25050dd7`의 Rootage 2.2.1과 설치된 CSS 2.2.2에서 `lib/design/tokens/seed_tokens.g.dart`를 **생성**한다(client ADR-0002(고정 커밋 생성 토큰과 재구현 컴포넌트)). 경고 대상이던 손선언 `../client/lib/design/tokens.dart`는 이제 존재하지 않는다.

**⚠️ 브랜드 값은 mockup·client 양쪽에 손으로 심는다(2026-08-02).** 두 저장소 모두 SEED 원본 carrot을 청색으로 덮었고 **값은 서로 일치한다**(mockup은 `layout.tsx`의 `BRAND` 블록, client는 `lib/design/tokens/brand_overrides.dart`). 생성 파이프라인이 SEED 원본만 읽으므로 어느 쪽도 자동으로 따라오지 않는다. **브랜드 값을 바꾸면 두 곳을 함께 고쳐야 하고, 어긋나도 기계가 알려주지 않는다.** 4계열·17광역 식별색은 mockup `bundle.tsx`가 정본이며 client는 아직 도메인 데이터를 들고 있지 않다.

**간격 토큰 드리프트는 없다(2026-07-31 실측).** 여기에 `spacingX.globalGutter`가 mockup 20px / client 16px로 어긋난다는 경고가 있었으나 사실이 아니었다. SEED 전환으로 자체 CSS가 사라지면서 재정의도 함께 없어졌고, 지금은 양쪽 모두 SEED 원본 `x4`(16px)를 쓴다. 확인 명령은 [DESIGN.md](./DESIGN.md)에 있다.

### 재사용 자산 - `bundle.tsx` 도메인 데이터가 최고 가치

Dart const로 바로 옮길 수 있다. 위치는 심볼명으로 grep 하라(줄번호는 금방 어긋난다).

| 자산 | 심볼 (파일) |
|---|---|
| 화면 인벤토리 16개 | `SCREENS` (`src/lib/screens.ts`) |
| 자체 아이콘 path 12개 | `CUSTOM_ICON_PATHS` (`src/lib/customIcons.ts`) |
| SEED 아이콘 매핑 41개 | `SEED_ICONS` (`bundle.tsx`) |
| 4계열 · 21 카테고리 | `CATEGORY_GROUPS` · `CATEGORIES` (`bundle.tsx`) |
| 17광역 마스터 (id·name·full·tone) | `REGIONS` (`bundle.tsx`) |
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

`PLACES` 81개는 분포 편향이 심하다(제주가 절반 가까이, 광주·세종·울산·대구·대전 0개). `r.total = Math.max(list.length, 12)`가 지역 총계를 인위 보정하고 있어 서버 카운트로 교체해야 한다.

**좌표는 실측값이고 투영은 보정된 근사다(2026-08-03).** `geoToSvg`는 광역시 7곳의 path bbox 중심 ↔ 시청 좌표로 최소제곱 보정한 선형 변환이며 잔차 RMS는 6.8 SVG 단위(≈4km)다. 거리 판정은 투영을 거치지 않고 `haversineMeters`로 실좌표에서 직접 재므로 투영 오차와 무관하다.

⚠️ **핀이 바다 위에 찍히는 건 알려진 한계이고, mockup 에서 고치지 않는다(2026-08-03 결정).** 원인은 계산 실수가 아니라 **핀은 실좌표인데 배경 그림은 출처가 다르다**는 것이다. `KOREA_PATHS`는 `southKoreaHigh.svg`에서 뽑은 것이라 어떤 투영인지 알 수 없고, 그래서 위경도 → 그림 좌표 변환이 근사일 수밖에 없다. **해안가 자원은 몇 백 미터 밀려 바다에 뜬다.** 밀도 시뮬레이션 핀은 무작위 방위로 최대 3.5km 흩뿌리므로 해안에서 더 자주 뜬다.

제대로 된 해법은 **위경도로 된 해안선 데이터를 받아 배경을 직접 그려, 핀과 배경이 같은 변환을 거치게 하는 것**이다. 이건 client 에서 한다. mockup 은 화면 설계 레퍼런스이지 지도 정확도 레퍼런스가 아니다 — **목업 지도의 핀 위치를 실제 위치의 근거로 쓰지 마라.**

⚠️ **`haeinsa`(해인사)는 `region: 'gyeongbuk'`인데 실제 위치는 경남 합천이다.** 좌표를 실측값으로 넣었으므로 발견 화면에서 경남에 찍힌다. 도감 지역 분류를 고칠지 좌표를 맞출지 미결이다.

## 디자인 - SEED 적용 규칙은 [DESIGN.md](./DESIGN.md)

토큰 정본·조사 순서·자체 CSS 규칙과 검증 명령·수치 스케일·프리미티브 매핑·아이콘·이미 밟은 지뢰·SEED 라이선스·**브랜드색 확정값**은 전부 [DESIGN.md](./DESIGN.md)에 있다. **UI를 건드리기 전에 읽어라.**

요점만 옮기면:

- **스타일 소스는 `@seed-design/css` 하나뿐이고, 자체 CSS는 SEED 토큰 재정의 1블록 외 0개다.** `.css` 파일 추가·자체 `--*` 토큰 선언은 금지. `<style>`은 `layout.tsx`의 `RESET`·`BRAND` 2개가 전부이며 늘리지 않는다.
- **브랜드색은 청색으로 확정됐다(2026-08-02).** `layout.tsx`의 `BRAND` 블록이 SEED brand 토큰 8개를 덮어쓴다. 바탕 `bg.brand-solid` `#0B72C4`(흰 글자 4.98:1, 모든 글자 크기 통과), 글자·아이콘 `fg.brand` `#075C97`로 **역할이 나뉘어 있으니 뒤집어 쓰지 마라.** 값과 근거는 [DESIGN.md](./DESIGN.md)의 "브랜드색 - 확정" 절.
- **4계열·17광역 식별색은 디자인 토큰이 아니라 도메인 데이터다.** `bundle.tsx`의 `CATEGORY_GROUPS`·`REGIONS`가 정본이고 raw hex로 둔다. 토큰으로 옮기지 마라.
- **새 UI는 SEED에 있는지 먼저 확인**하고 없을 때만 `Box`로 조립한다. 조사 순서를 건너뛰면 있는 걸 없다고 단정한다(전례 있음).
- **SEED는 Apache-2.0 + 당근 상표 조항이다.** `/licenses` 라우트가 귀속 고지를 이행한다. 당근 로고·상호명·캐릭터를 앱 화면에 쓰지 않는다.
- 플랫폼 중립 디자인 결정과 근거는 `../docs/03-디자인/디자인시스템.md`.

## 남은 결함

**의존성 보안 추적**: `npm audit`은 high 11건, `--omit=dev`는 high 2건. 운영 2건은 Next 16.2.12가 optional로 고정한 `sharp@0.34.5`에서 온다(현재 `next/image`·`sharp` 미사용이라 공격 표면 제한적, Next가 `sharp>=0.35.0`을 허용하면 재검사). 나머지는 ESLint 체인의 개발 전용 경고다. **`npm audit fix --force`는 Next 14·ESLint 10으로 강제 변경하므로 실행 금지.**

## 주의

- 새 UI가 필요하면 **SEED에 있는지 먼저 확인하고**([DESIGN.md](./DESIGN.md)의 조사 순서) 없을 때만 `Box`로 조립한다. 조립할 때도 색·간격·라운드는 SEED 토큰만 참조한다.
- 화면을 바꾸면 `../docs/01-기능명세서/`도 갱신한다. 현재 06 계층 확장이 미반영 상태다.
- 자체 토큰 → SEED 치환 이력(매핑표·치환 통계)은 이 문서에서 뺐다. 필요하면 git 히스토리(2026-07-28~29 커밋)를 보라.
- 개인 메모는 `CLAUDE.local.md`(gitignore).
