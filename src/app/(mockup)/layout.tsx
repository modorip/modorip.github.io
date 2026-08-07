// 목업 그룹의 셸. 사이드바가 여기 있다.
//
// 루트 레이아웃에 두면 법적 페이지(공개 대상)에도 목업 내비게이션이 따라붙는다.
// 라우트 그룹은 URL 에 나타나지 않으므로 기존 주소는 그대로다.
import type { ReactNode } from 'react';
import { LayoutRoot, SideNavigationInset } from '@seed-design/react';
import Sidebar from '@/components/Sidebar';

export default function MockupLayout({ children }: { children: ReactNode }) {
  // 셸은 SEED 가 준다. LayoutRoot(height:100vh · flex · overflow-y:auto)가
  // SideNavigation + SideNavigationInset(본문 영역)과 짝을 이룬다.
  return (
    <LayoutRoot>
      <Sidebar />
      <SideNavigationInset>{children}</SideNavigationInset>
    </LayoutRoot>
  );
}
