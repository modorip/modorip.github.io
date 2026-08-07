// 법적 페이지(개인정보처리방침 · 지원)의 셸.
//
// 🔴 **이 그룹은 외부에 공개된다.** 스토어에 URL 을 제출하고 심사자와 이용자가
// 본다. 목업 사이드바를 붙이지 않는 이유다 - 내부 설계 화면으로 가는 길을
// 열어 줄 이유가 없다.
//
// 읽기만 하는 문서라 셸 없이 본문 폭만 잡는다.
import type { ReactNode } from 'react';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: 'var(--seed-dimension-x10) var(--seed-dimension-x5) 120px',
        background: 'var(--seed-color-bg-layer-default)',
        minHeight: '100vh',
      }}
    >
      {children}
    </main>
  );
}
