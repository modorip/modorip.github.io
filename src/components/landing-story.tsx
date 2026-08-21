// 문제 절과 전환 절의 그림. 왼쪽이 지금, 오른쪽이 도감을 쓸 때다.
//
// 디자인 원안은 "놓치고 있는" 칸을 흐리게(opacity) 깔았는데 대비가 떨어져 대신
// 점선 테두리로 바꿨다. 미발견 카드와 같은 언어라 뜻도 그대로 읽힌다.
import type { CSSProperties } from 'react';
import { landing } from '@/components/landing';
import { Glyph } from '@/components/landing-glyph';

const COLUMN: CSSProperties = {
  flex: 1,
  minWidth: 0,
  padding: 'var(--seed-dimension-x4)',
  borderRadius: 'var(--seed-radius-r3_5)',
  textAlign: 'center',
};

const COLUMN_LABEL: CSSProperties = {
  fontSize: 'var(--seed-font-size-t2)',
  lineHeight: 'var(--seed-line-height-t2)',
  fontWeight: 'var(--seed-font-weight-bold)',
  margin: '0 0 var(--seed-dimension-x3)',
};

const PILL: CSSProperties = {
  padding: 'var(--seed-dimension-x2)',
  borderRadius: 'var(--seed-radius-r2)',
  background: 'var(--seed-color-bg-layer-default)',
  fontSize: 'var(--seed-font-size-t4)',
  lineHeight: 'var(--seed-line-height-t4)',
};

/** 늘 찾게 되는 것과 지나치게 되는 것. */
export function ContrastColumns() {
  const columns = [
    {
      label: '늘 찾게 되는',
      items: ['맛집', '카페', '핫플'],
      box: {
        background: 'var(--seed-color-bg-layer-fill)',
        border: '1px solid var(--seed-color-stroke-neutral-weak)',
      },
      labelColor: 'var(--seed-color-fg-neutral-subtle)',
      itemColor: 'var(--seed-color-fg-neutral-muted)',
    },
    {
      label: '지나치게 되는',
      items: ['자연', '유적', '문화 · 축제'],
      box: {
        background: 'var(--seed-color-bg-brand-weak)',
        border: '1px dashed var(--seed-color-stroke-brand-weak)',
      },
      labelColor: 'var(--seed-color-fg-brand)',
      itemColor: 'var(--seed-color-fg-brand)',
    },
  ];
  return (
    <div style={{ display: 'flex', gap: 'var(--seed-dimension-x3)' }}>
      {columns.map((c) => (
        <div key={c.label} style={{ ...COLUMN, ...c.box }}>
          <p style={{ ...COLUMN_LABEL, color: c.labelColor }}>{c.label}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x1_5)' }}>
            {c.items.map((i) => (
              <span key={i} style={{ ...PILL, color: c.itemColor }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** 여행을 시작할 때 던지는 질문이 어떻게 바뀌는가. */
export function BeforeAfter() {
  const panels = [
    {
      tag: 'BEFORE',
      question: '이번 여행 어디 가지?',
      items: ['맛집 검색', '카페 검색', '핫플 검색'],
      accent: 'var(--seed-color-fg-neutral-subtle)',
      border: '1px solid var(--seed-color-stroke-neutral-weak)',
      questionColor: 'var(--seed-color-fg-neutral-muted)',
    },
    {
      tag: 'AFTER',
      question: '이번엔 어떤 도감을 채울까?',
      items: ['가볼 곳 고르기', '직접 방문', '카드 수집'],
      accent: 'var(--seed-color-fg-brand)',
      border: '2px solid var(--seed-color-bg-brand-solid)',
      questionColor: 'var(--seed-color-fg-neutral)',
    },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x4)' }}>
      {panels.map((p) => (
        <div
          key={p.tag}
          style={{
            ...landing.card,
            border: p.border,
            padding: 'var(--seed-dimension-x6)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--seed-font-size-t2)',
              fontWeight: 'var(--seed-font-weight-bold)',
              color: p.accent,
              margin: '0 0 var(--seed-dimension-x3)',
            }}
          >
            {p.tag}
          </p>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t5)',
              lineHeight: 'var(--seed-line-height-t6)',
              fontWeight: 'var(--seed-font-weight-bold)',
              color: p.questionColor,
              wordBreak: 'keep-all',
              margin: '0 0 var(--seed-dimension-x4)',
            }}
          >
            {p.question}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x2)' }}>
            {p.items.map((i) => (
              <span
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--seed-dimension-x2)',
                  fontSize: 'var(--seed-font-size-t4)',
                  color: p.accent,
                }}
              >
                <Glyph name="arrow" size={14} />
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
