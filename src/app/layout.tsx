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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-seed data-seed-color-mode="light-only" data-seed-user-color-scheme="light">
      <head><style>{RESET}</style></head>
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
