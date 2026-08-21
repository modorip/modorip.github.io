// 히어로의 폰 프레임. 안에 든 것은 이미지가 아니라 그려진 화면이라 축소해도
// 글자가 벡터로 남는다(`landing-app-screen.tsx`).
import type { ReactNode } from 'react';
import { landing } from '@/components/landing';

const BEZEL = 6;

/** 화면 한 장을 감싸는 베젤. 안쪽 폭은 호출자가 정한 `screenWidth` 그대로다. */
export function PhoneFrame({
  screenWidth = 240,
  children,
}: {
  screenWidth?: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: screenWidth + BEZEL * 2,
        margin: '0 auto',
        padding: BEZEL,
        borderRadius: 'var(--seed-radius-r6)',
        background: 'var(--seed-color-bg-neutral-inverted)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
      }}
    >
      <div
        style={{
          borderRadius: 'var(--seed-radius-r5)',
          overflow: 'hidden',
          background: 'var(--seed-color-bg-layer-default)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** 프레임 아래 한 줄. 어떤 화면인지 알려 준다. */
export function PhoneCaption({ children }: { children: string }) {
  return <p style={{ ...landing.caption, textAlign: 'center' }}>{children}</p>;
}
