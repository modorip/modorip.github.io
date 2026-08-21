// 믿을 수 있는 이유 절과 계정 절의 조각.
//
// [중요] **소셜 로그인 로고는 각 사의 상표다.** 지원하는 로그인 수단을 알리는
// 용도로만 쓰고, 버튼처럼 보이게 하거나 문구를 바꾸지 않는다. 색과 path 는
// 각 사 가이드라인 값이라 SEED 토큰으로 치환하지 않는다.
import type { CSSProperties, ReactNode } from 'react';
import { landing } from '@/components/landing';
import { Glyph, type GlyphName } from '@/components/landing-glyph';

const ICON_TILE: CSSProperties = {
  ...landing.center,
  flex: 'none',
  width: 36,
  height: 36,
  borderRadius: 'var(--seed-radius-r2_5)',
  background: 'var(--seed-color-bg-brand-weak)',
  color: 'var(--seed-color-fg-brand)',
};

export type TrustPoint = { title: string; body: ReactNode; glyph: GlyphName };

/** 근거 카드 셋. 데이터 출처 · 발견 판정 · 위치 취급 순이다. */
export function TrustCards({ points }: { points: ReadonlyArray<TrustPoint> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x5)' }}>
      {points.map((p) => (
        <div key={p.title} style={{ ...landing.card, padding: 'var(--seed-dimension-x6)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--seed-dimension-x2_5)',
              marginBottom: 'var(--seed-dimension-x3)',
            }}
          >
            <span style={ICON_TILE}>
              <Glyph name={p.glyph} size={20} />
            </span>
            <h3 style={{ ...landing.h3, fontSize: 'var(--seed-font-size-t5)' }}>{p.title}</h3>
          </div>
          <p style={landing.body}>{p.body}</p>
        </div>
      ))}
    </div>
  );
}

const PROVIDERS = [
  {
    name: 'Google',
    background: 'var(--seed-color-bg-layer-default)',
    border: '1px solid var(--seed-color-stroke-neutral-weak)',
    label: 'var(--seed-color-fg-neutral-muted)',
    mark: (
      <>
        <path d="M18.17 10.2c0-.63-.06-1.25-.16-1.84H10v3.48h4.58a3.92 3.92 0 01-1.7 2.57v2.13h2.74c1.61-1.48 2.53-3.66 2.53-6.34z" fill="#4285F4" />
        <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.06l-2.75-2.13c-.76.51-1.73.81-2.89.81-2.22 0-4.1-1.5-4.77-3.52H2.38v2.2A8.5 8.5 0 0010 18.5z" fill="#34A853" />
        <path d="M5.23 11.6a5.1 5.1 0 010-3.24V6.16H2.38a8.5 8.5 0 000 7.64l2.85-2.2z" fill="#FBBC05" />
        <path d="M10 4.84c1.25 0 2.37.43 3.25 1.28l2.44-2.44A8.5 8.5 0 002.38 6.16l2.85 2.2C5.9 6.34 7.78 4.84 10 4.84z" fill="#EA4335" />
      </>
    ),
  },
  {
    name: '카카오',
    background: '#FEE500',
    border: '1px solid #FEE500',
    label: '#3C1E1E',
    mark: (
      <path d="M10 3C5.58 3 2 5.8 2 9.19c0 2.17 1.45 4.08 3.63 5.15l-.92 3.41c-.08.28.24.5.48.34l4.07-2.68c.24.02.48.04.74.04 4.42 0 8-2.8 8-6.26C18 5.8 14.42 3 10 3z" fill="#3C1E1E" />
    ),
  },
  {
    name: 'Apple',
    background: '#000000',
    border: '1px solid #000000',
    label: '#FFFFFF',
    mark: (
      <path d="M14.94 10.57c-.02-2.23 1.82-3.3 1.9-3.35a4.12 4.12 0 00-3.24-1.75c-1.36-.14-2.68.82-3.38.82-.7 0-1.77-.8-2.92-.78A4.3 4.3 0 003.67 8c-1.56 2.7-.4 6.7 1.1 8.9.75 1.08 1.63 2.29 2.78 2.25 1.13-.04 1.55-.72 2.91-.72 1.36 0 1.74.72 2.92.7 1.2-.02 1.96-1.09 2.69-2.17a9.5 9.5 0 001.22-2.5 3.95 3.95 0 01-2.35-3.59zM12.82 4.6A3.9 3.9 0 0013.73 2a4 4 0 00-2.58 1.34 3.72 3.72 0 00-.94 2.47c1.06.08 2.15-.5 2.61-1.21z" fill="#fff" />
    ),
  },
] as const;

/** 지원하는 로그인 수단. 누를 수 있는 버튼이 아니다. */
export function ProviderTiles() {
  return (
    <ul
      style={{
        display: 'flex',
        gap: 'var(--seed-dimension-x3)',
        listStyle: 'none',
        margin: 0,
        padding: 0,
      }}
    >
      {PROVIDERS.map((p) => (
        <li
          key={p.name}
          style={{
            flex: 1,
            minWidth: 0,
            padding: 'var(--seed-dimension-x3_5)',
            borderRadius: 'var(--seed-radius-r3)',
            background: p.background,
            border: p.border,
            textAlign: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {p.mark}
          </svg>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t1)',
              lineHeight: 'var(--seed-line-height-t1)',
              fontWeight: 'var(--seed-font-weight-medium)',
              color: p.label,
              margin: 'var(--seed-dimension-x2) 0 0',
            }}
          >
            {p.name}
          </p>
        </li>
      ))}
    </ul>
  );
}

/** 계정 카드. 왜 필요한지 한 줄, 무엇을 받는지 세 줄. */
export function AccountCard({
  lead,
  reason,
  notes,
}: {
  lead: string;
  reason: ReactNode;
  notes: ReadonlyArray<ReactNode>;
}) {
  return (
    <div
      style={{
        ...landing.card,
        border: '1px solid var(--seed-color-stroke-brand-weak)',
        padding: 'var(--seed-dimension-x6)',
      }}
    >
      <p
        style={{
          ...landing.lead,
          fontSize: 'var(--seed-font-size-t5)',
          fontWeight: 'var(--seed-font-weight-medium)',
          color: 'var(--seed-color-fg-neutral)',
          marginBottom: 'var(--seed-dimension-x4)',
        }}
      >
        {lead}
      </p>
      <p style={{ ...landing.body, marginBottom: 'var(--seed-dimension-x4)' }}>{reason}</p>
      <div
        style={{
          height: 1,
          background: 'var(--seed-color-stroke-neutral-weak)',
          marginBottom: 'var(--seed-dimension-x4)',
        }}
      />
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x2_5)' }}>
        {notes.map((note, i) => (
          <li
            key={`note-${i}`}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--seed-dimension-x2)' }}
          >
            <span
              style={{
                flex: 'none',
                marginTop: 'var(--seed-dimension-x0_5)',
                color: 'var(--seed-color-fg-brand)',
                display: 'flex',
              }}
            >
              <Glyph name="checkCircle" size={18} />
            </span>
            <p
              style={{
                ...landing.body,
                fontSize: 'var(--seed-font-size-t3)',
                lineHeight: 'var(--seed-line-height-t5)',
                marginTop: 0,
                marginBottom: 0,
              }}
            >
              {note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
