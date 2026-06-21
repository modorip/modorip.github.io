# 모두립 · Mockup (Next.js)

모두립 앱의 **와이어프레임**과 **화면별 풀스크린 목업**을 담은 Next.js 프로젝트.
claude design 작업물(`../app` 의 React 레퍼런스, Wanted Design System)을 그대로 이식해 화면과 시각적으로 일치한다.

## 라우트

| 경로 | 내용 |
|---|---|
| `/` | 인덱스 · 화면 목록 |
| `/wireframes` | 15개 화면 저충실도(low-fi) 와이어프레임 갤러리 |
| `/mockup` | 화면별 고충실도 목업 썸네일 (claude design 충실) |
| `/mockup/[id]` | 단일 화면 풀스크린 (전체화면) |
| `/prototype` | 탭 네비게이션이 동작하는 인터랙티브 프로토타입 |

화면 id: `onboarding, home, discover, discover-success, dex, dex-region, place, preset-create, plaza, preset, user-profile, titles, profile`

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

## 구조

```
src/
├── app/                  # App Router 페이지
│   ├── page.jsx          # 인덱스
│   ├── wireframes/       # 와이어프레임 갤러리 (+ wireframes.css)
│   ├── mockup/           # 목업 썸네일 + [id] 풀스크린
│   └── prototype/        # 인터랙티브 프로토타입
├── components/
│   ├── MockFrame.jsx     # 402×874 디바이스 프레임 + useFitScale
│   ├── ScreenHost.jsx    # 단일 화면을 기본 props로 렌더
│   ├── MockApp.jsx       # 스택 네비게이션 셸 (app.jsx 이식)
│   └── ClientOnly.jsx    # localStorage/document 쓰는 번들 클라 전용 가드
├── design/
│   └── bundle.jsx        # ★ /app 디자인 레퍼런스 자동 이식 번들 (수정 금지)
├── lib/
│   ├── screens.js        # 화면 메타데이터
│   └── wireframes.js     # 와이어프레임 갤러리 빌더
docs/
└── 화면설계서.md          # 화면별 레이아웃 설계 문서
```

## design/bundle.jsx 재생성

`bundle.jsx`는 `../app` 의 11개 파일을 index.html 로드 순서대로 concat한 산출물이다.
원본 디자인이 바뀌면 아래로 재생성한다(루트에서):

```bash
{
  printf "%s\n" "'use client';"
  printf "%s\n" "import React from 'react';"
  cat app/icons.jsx app/primitives.jsx app/data.jsx app/region-paths.js app/ui.jsx \
      app/screens-core.jsx app/screens-dex.jsx app/screens-discover.jsx \
      app/screens-plaza.jsx app/screens-preset.jsx app/screens-profile.jsx
  printf "\n%s\n" "export { OnboardingScreen, HomeScreen, DiscoverScreen, DiscoverSuccessScreen, DexNationScreen, DexRegionScreen, PlaceDetailScreen, PresetCreateScreen, PresetDetailScreen, UserProfileScreen, PlazaScreen, TitlesScreen, ProfileScreen, TabBar, PLACES, REGIONS, CATEGORIES, TITLES, PRESETS, FEED };"
} > Mockup/src/design/bundle.jsx
sed -i '' 's/Object\.assign(window,/Object.assign({},/g' Mockup/src/design/bundle.jsx
```

> 디자인 토큰/폰트는 `public/wanted/` 에 복사되어 `globals.css` 가 `@import url('/wanted/colors_and_type.css')` 로 로드한다.

## 비고
- `.git` 연동은 사용자가 직접 수행 (`.gitignore` 포함).
- Next 14.2.35 (보안 패치 반영), React 18.3.1.
