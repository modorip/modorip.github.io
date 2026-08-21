// 공개 랜딩(`/`)의 공용 스타일과 조각. 법적 문서의 `legal.tsx` 와 나눠 둔다 -
// 이쪽은 전면 배경이 번갈아 깔리는 세로 스크롤이고 읽기 폭도 톤도 다르다.
//
// [주의] 한국어 줄바꿈은 `wordBreak: keep-all`(어절 유지) + `textWrap`(제목 balance ·
// 본문 pretty) 조합으로 잡는다. 그래도 갈라지면 안 되는 구는 `landing.nowrap` 을 씌운다.
//
// [중요] **4계열 색은 디자인 토큰이 아니라 도메인 데이터다.** 정본은 admin
// `bundle.tsx` 의 `CATEGORY_GROUPS`, 두 번째 사본은 client
// `catalog_reference_data.dart`, 세 번째가 여기다. 바꾸면 셋을 함께 고친다.
import type { CSSProperties, ReactNode } from 'react';
import { Glyph } from '@/components/landing-glyph';

const BACKGROUNDS = {
  default: 'var(--seed-color-bg-layer-default)',
  fill: 'var(--seed-color-bg-layer-fill)',
  brand:
    'linear-gradient(180deg, var(--seed-color-bg-brand-weak) 0%, var(--seed-color-bg-layer-default) 100%)',
  brandWeak: 'var(--seed-color-bg-brand-weak)',
  inverted: 'var(--seed-color-bg-neutral-inverted)',
} as const;

export type SectionTone = keyof typeof BACKGROUNDS;

export type CategoryGroup = {
  id: string;
  label: string;
  detail: string;
  color: string;
  soft: string;
  dark: string;
};

export const CATEGORY_GROUPS: ReadonlyArray<CategoryGroup> = [
  { id: 'nature', label: '자연', detail: '산 · 섬 · 폭포 · 해변', color: '#00882D', soft: '#E0F1E6', dark: '#006A23' },
  { id: 'heritage', label: '유적', detail: '고궁 · 사찰 · 성곽 · 문화재', color: '#AF6300', soft: '#F5ECE0', dark: '#884D00' },
  { id: 'culture', label: '문화', detail: '미술관 · 공연장 · 전통문화', color: '#6541F2', soft: '#EDE8FD', dark: '#4F33BD' },
  { id: 'festival', label: '축제', detail: '지역축제 · 계절축제 · 문화행사', color: '#CD2CB3', soft: '#F9E6F6', dark: '#A0228C' },
];

export const landing = {
  inner: {
    maxWidth: 480,
    margin: '0 auto',
  },
  h1: {
    fontSize: 'var(--seed-font-size-t12)',
    lineHeight: 'var(--seed-line-height-t12)',
    fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-neutral)',
    wordBreak: 'keep-all',
    textWrap: 'balance',
    marginTop: 0,
    marginBottom: 'var(--seed-dimension-x4)',
  },
  h2: {
    fontSize: 'var(--seed-font-size-t10)',
    lineHeight: 'var(--seed-line-height-t10)',
    fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-neutral)',
    wordBreak: 'keep-all',
    textWrap: 'balance',
    marginTop: 0,
    marginBottom: 'var(--seed-dimension-x6)',
  },
  h3: {
    fontSize: 'var(--seed-font-size-t6)',
    lineHeight: 'var(--seed-line-height-t6)',
    fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-neutral)',
    marginTop: 0,
    marginBottom: 0,
  },
  lead: {
    fontSize: 'var(--seed-font-size-t5)',
    lineHeight: 'var(--seed-line-height-t7)',
    color: 'var(--seed-color-fg-neutral-muted)',
    wordBreak: 'keep-all',
    textWrap: 'balance',
    marginTop: 0,
    marginBottom: 0,
  },
  body: {
    fontSize: 'var(--seed-font-size-t4)',
    lineHeight: 'var(--seed-line-height-t6)',
    color: 'var(--seed-color-fg-neutral-muted)',
    wordBreak: 'keep-all',
    textWrap: 'pretty',
    marginTop: 0,
    marginBottom: 0,
  },
  emphasis: {
    fontSize: 'var(--seed-font-size-t6)',
    lineHeight: 'var(--seed-line-height-t8)',
    fontWeight: 'var(--seed-font-weight-medium)',
    color: 'var(--seed-color-fg-neutral)',
    wordBreak: 'keep-all',
    textWrap: 'balance',
    marginTop: 0,
    marginBottom: 0,
  },
  card: {
    background: 'var(--seed-color-bg-layer-default)',
    border: '1px solid var(--seed-color-stroke-neutral-weak)',
    borderRadius: 'var(--seed-radius-r4)',
    overflow: 'hidden',
  },
  cardBody: {
    padding: 'var(--seed-dimension-x3)',
  },
  caption: {
    fontSize: 'var(--seed-font-size-t2)',
    lineHeight: 'var(--seed-line-height-t3)',
    color: 'var(--seed-color-fg-neutral-subtle)',
    marginTop: 'var(--seed-dimension-x3)',
    marginBottom: 0,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  brandText: {
    color: 'var(--seed-color-fg-brand)',
    fontWeight: 'var(--seed-font-weight-bold)',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--seed-dimension-x3)',
  },
  dashed: {
    background: 'var(--seed-color-bg-layer-fill)',
    border: '1px dashed var(--seed-color-stroke-neutral-weak)',
    borderRadius: 'var(--seed-radius-r4)',
    overflow: 'hidden',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--seed-dimension-x4)',
  },
} satisfies Record<string, CSSProperties>;

/** 전면 배경 한 겹 + 읽기 폭 고정. 배경은 흰색과 회색이 번갈아 온다. */
export function Section({
  tone = 'default',
  children,
}: {
  tone?: SectionTone;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        background: BACKGROUNDS[tone],
        padding: 'var(--seed-dimension-x16) var(--seed-dimension-x6)',
      }}
    >
      <div style={landing.inner}>{children}</div>
    </section>
  );
}

/** 절 머리의 작은 알약 라벨. 바탕이 흰색이면 `weak`, 회색이면 `plain` 이다. */
export function Eyebrow({
  label,
  variant = 'weak',
}: {
  label: string;
  variant?: 'solid' | 'weak' | 'plain';
}) {
  const skin: Record<string, CSSProperties> = {
    solid: {
      background: 'var(--seed-color-bg-brand-solid)',
      color: 'var(--seed-color-fg-neutral-inverted)',
    },
    weak: {
      background: 'var(--seed-color-bg-brand-weak)',
      color: 'var(--seed-color-fg-brand)',
    },
    plain: {
      background: 'var(--seed-color-bg-layer-default)',
      color: 'var(--seed-color-fg-brand)',
    },
  };
  return (
    <p
      style={{
        display: 'inline-block',
        padding: 'var(--seed-dimension-x1_5) var(--seed-dimension-x3)',
        borderRadius: 'var(--seed-radius-full)',
        fontSize: 'var(--seed-font-size-t1)',
        lineHeight: 'var(--seed-line-height-t1)',
        fontWeight: 'var(--seed-font-weight-bold)',
        margin: '0 0 var(--seed-dimension-x5)',
        ...skin[variant],
      }}
    >
      {label}
    </p>
  );
}

/** 히어로 머리의 브랜드 칩. 로고 자리와 이름을 함께 둔다. */
export function BrandChip() {
  return (
    <p
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--seed-dimension-x2)',
        padding: 'var(--seed-dimension-x1_5) var(--seed-dimension-x3_5)',
        borderRadius: 'var(--seed-radius-full)',
        background: 'var(--seed-color-bg-layer-default)',
        border: '1px solid var(--seed-color-stroke-brand-weak)',
        margin: '0 0 var(--seed-dimension-x6)',
      }}
    >
      <span
        style={{
          ...landing.center,
          width: 28,
          height: 28,
          borderRadius: 'var(--seed-radius-r2)',
          background: 'var(--seed-color-bg-brand-solid)',
          color: 'var(--seed-color-fg-neutral-inverted)',
        }}
      >
        <Glyph name="star" size={16} />
      </span>
      <span
        style={{
          fontSize: 'var(--seed-font-size-t4)',
          fontWeight: 'var(--seed-font-weight-bold)',
          color: 'var(--seed-color-fg-brand)',
        }}
      >
        모두립
      </span>
    </p>
  );
}

/** 가운뎃점 나열. 줄이 바뀔 때 점이 다음 줄 머리로 넘어가지 않게 앞말에 붙여 둔다. */
export function MiddotList({ text }: { text: string }) {
  const items = text.split(' · ');
  return (
    <>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item}>
            <span style={landing.nowrap}>{last ? item : `${item} \u00b7`}</span>
            {last ? '' : ' '}
          </span>
        );
      })}
    </>
  );
}

/** 진행 막대. 도감이 얼마나 찼는지를 보여 주는 자리에만 쓴다. */
export function Bar({ ratio }: { ratio: number }) {
  return (
    <div
      style={{
        height: 'var(--seed-dimension-x2)',
        background: 'var(--seed-color-bg-neutral-weak)',
        borderRadius: 'var(--seed-radius-full)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.round(ratio * 100)}%`,
          height: '100%',
          background: 'var(--seed-color-bg-brand-solid)',
          borderRadius: 'var(--seed-radius-full)',
        }}
      />
    </div>
  );
}
