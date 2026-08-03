// 당근 SEED 가 이 앱의 유일한 스타일 소스다. 자체 CSS 파일은 없다.
import "@seed-design/css/all.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LayoutRoot, SideNavigationInset } from "@seed-design/react";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "모두립 · 목업",
  description: "화면별 풀스크린 목업 (당근 SEED 기반)",
};

// 브라우저 정규화. SEED 는 리셋을 배포하지 않는다 - `box-sizing: border-box` 를
// .seed-action-button 같은 컴포넌트 레시피에 개별로만 넣고 Box 레시피에는 없다.
// 즉 SEED 는 호스트 앱이 리셋을 대는 것을 전제한다. 여기엔 색·간격·타이포 같은
// 디자인 값은 일절 넣지 않는다. 디자인 값은 전부 var(--seed-*) 로만 쓴다.
const RESET = `*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
a{color:inherit;text-decoration:none}
button{font-family:inherit}
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}`;

// 브랜드 축 재정의 - 이 저장소가 두는 유일한 SEED 토큰 재정의 블록이다.
// SEED 의 brand 토큰은 당근 carrot ramp 이고 교체 API 가 없다(theming 은 mode·fontScaling 만
// 노출한다). carrot 을 그대로 두면 (1) fg.brand 의 흰 배경 대비가 약 2.94:1 로 WCAG AA 미달이고
// (2) 17광역 tone 과 색이 겹쳐 브랜드와 지역 식별색을 구분할 수 없다. 그래서 brand 8개만
// 갈아끼운다. 바탕(bg.brand-solid)은 밝은 청색, 글자·아이콘(fg.brand)은 짙은 청색으로
// 역할을 나눈다. carrot 은 둘 다 carrot-600 하나였다.
//
// 선택자 주의: all.css 의 light 블록이 `:root[data-seed-color-mode="light-only"]`(0-2-0)로
// 선언하므로 맨 `:root`(0-1-0)는 소스 순서와 무관하게 진다. 특정도를 한 단계 올려 확실히 이긴다.
// 새 `--*` 토큰은 만들지 않는다. 여기 있는 9개는 전부 SEED 가 이미 쓰는 이름이다.
//
// 9번째 `palette-carrot-200` 은 시맨틱이 아니라 팔레트 단계다. SEED 가 이 단계만
// 컴포넌트 규칙에서 **직접** 참조하기 때문에 시맨틱 8개로는 덮이지 않는다(all.css 5곳:
// progress-circle tone_brand · action-button brandOutline · reaction-button 의 `--track-color`,
// checkmark ghost-tone_brand hover 배경). 덮지 않으면 로딩 중인 brand 버튼에서 파란 arc 아래
// 트랙이 주황으로 깔린다. 값은 `bg.brand-weak-pressed` 와 같다 - SEED 도 그 별칭을
// carrot-200 으로 정의하므로 두 경로가 같은 값을 가리키게 맞춘 것이다.
// 나머지 carrot 단계(100·300·600·700·800)는 시맨틱 별칭 정의에만 쓰여 위 8개로 이미 덮인다.
const BRAND = `:root[data-seed][data-seed-color-mode="light-only"]{
--seed-color-bg-brand-solid:#0266FB;
--seed-color-bg-brand-solid-pressed:#0250C5;
--seed-color-fg-brand:#0250C5;
--seed-color-fg-brand-contrast:#0250C5;
--seed-color-stroke-brand-solid:#0250C5;
--seed-color-bg-brand-weak:#EEF5FF;
--seed-color-bg-brand-weak-pressed:#E0ECFF;
--seed-color-stroke-brand-weak:#BBD6FE;
--seed-color-palette-carrot-200:#E0ECFF}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-seed data-seed-color-mode="light-only" data-seed-user-color-scheme="light">
      <head><style>{RESET}</style><style>{BRAND}</style></head>
      <body style={{
        background: 'var(--seed-color-bg-layer-basement)',
        color: 'var(--seed-color-fg-neutral)',
        fontSize: 'var(--seed-font-size-t4)',
        lineHeight: 'var(--seed-line-height-t4)',
      }}>
        {/* 셸은 SEED 가 준다. LayoutRoot(height:100vh · flex · overflow-y:auto)가
            SideNavigation + SideNavigationInset(본문 영역)과 짝을 이룬다. */}
        <LayoutRoot>
          <Sidebar />
          <SideNavigationInset>{children}</SideNavigationInset>
        </LayoutRoot>
      </body>
    </html>
  );
}
