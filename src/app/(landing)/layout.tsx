// 공개 랜딩(`/`)의 셸. 절마다 배경이 바뀌는 세로 스크롤이라 폭을 여기서 잡지 않고
// 각 절이 안쪽에서 읽기 폭을 잡는다.
//
// [중요] **법적 문서 셸(`(legal)/layout.tsx`)과 나눠 둔다.** 그쪽은 읽기 폭이
// 고정된 문서고 이쪽은 전면 배경이다. 한 셸에 둘을 담으려다 폭이 어긋난다.
import type { ReactNode } from 'react';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return <main style={{ background: 'var(--seed-color-bg-layer-default)' }}>{children}</main>;
}
