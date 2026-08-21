// 도감 삽화. 3단계 · 4계열 · 진행 대시보드 · 칭호 · 코스 · 스토어 배지.
//
// [주의] 발견 수와 진행률은 전부 지어낸 값이다. 지역·계열마다 자원 수가 달라
// 실제 총계는 서버가 준다. 대시보드 아래 "화면 예시" 문구를 지우지 마라.
import type { CSSProperties, ReactNode } from 'react';
import { Bar, CATEGORY_GROUPS, MiddotList, landing } from '@/components/landing';
import { Glyph, type GlyphName } from '@/components/landing-glyph';

export type Step = { no: string; title: string; body: ReactNode; glyph: GlyphName };

const TILE: CSSProperties = {
  ...landing.center,
  flex: 'none',
  width: 52,
  height: 52,
  borderRadius: 'var(--seed-radius-r4)',
  background: 'var(--seed-color-bg-brand-solid)',
  color: 'var(--seed-color-fg-neutral-inverted)',
};

/** 발견 · 수집 · 완성. */
export function StepList({ steps }: { steps: ReadonlyArray<Step> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x9)' }}>
      {steps.map((s) => (
        <div key={s.no} style={{ display: 'flex', gap: 'var(--seed-dimension-x5)' }}>
          <div style={TILE}>
            <Glyph name={s.glyph} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--seed-dimension-x2)',
                marginBottom: 'var(--seed-dimension-x2)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--seed-font-size-t3)',
                  fontWeight: 'var(--seed-font-weight-bold)',
                  color: 'var(--seed-color-fg-brand)',
                }}
              >
                {s.no}
              </span>
              <h3 style={landing.h3}>{s.title}</h3>
            </div>
            <p style={landing.body}>{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 4계열 카드. 색은 앱 도감과 같은 계열 식별색이다. */
export function CategoryGrid() {
  const glyphs: Record<string, GlyphName> = {
    nature: 'leaf',
    heritage: 'landmark',
    culture: 'frame',
    festival: 'ticket',
  };
  return (
    <div style={landing.grid2}>
      {CATEGORY_GROUPS.map((c) => (
        <div
          key={c.id}
          style={{
            padding: 'var(--seed-dimension-x5) var(--seed-dimension-x4)',
            background: c.soft,
            borderRadius: 'var(--seed-radius-r4)',
          }}
        >
          <div
            style={{
              ...landing.center,
              width: 36,
              height: 36,
              borderRadius: 'var(--seed-radius-r2_5)',
              background: 'var(--seed-color-bg-layer-default)',
              color: c.color,
              marginBottom: 'var(--seed-dimension-x3)',
            }}
          >
            <Glyph name={glyphs[c.id]} size={20} />
          </div>
          <h3 style={{ ...landing.h3, fontSize: 'var(--seed-font-size-t5)', color: c.dark }}>
            {c.label}
          </h3>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t2)',
              lineHeight: 'var(--seed-line-height-t3)',
              color: c.dark,
              margin: 'var(--seed-dimension-x1_5) 0 0',
              wordBreak: 'keep-all',
              textWrap: 'pretty',
            }}
          >
            <MiddotList text={c.detail} />
          </p>
        </div>
      ))}
    </div>
  );
}

/** 한 광역의 계열별 진행. */
export function DexDashboard() {
  const rows = [
    { label: '자연', found: 12, total: 50 },
    { label: '유적', found: 8, total: 40 },
    { label: '문화', found: 6, total: 30 },
    { label: '축제', found: 4, total: 20 },
  ];
  const total = rows.reduce((sum, r) => sum + r.total, 0);
  const found = rows.reduce((sum, r) => sum + r.found, 0);
  return (
    <div>
      <div style={{ ...landing.card, padding: 'var(--seed-dimension-x6)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--seed-dimension-x5)',
          }}
        >
          <span style={{ ...landing.h3, fontSize: 'var(--seed-font-size-t5)' }}>강원도</span>
          <span
            style={{
              fontSize: 'var(--seed-font-size-t4)',
              fontWeight: 'var(--seed-font-weight-bold)',
              color: 'var(--seed-color-fg-brand)',
            }}
          >
            {found} / {total}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x3)' }}>
          {rows.map((r) => (
            <div
              key={r.label}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x3)' }}
            >
              <span
                style={{
                  flex: 'none',
                  width: 36,
                  fontSize: 'var(--seed-font-size-t3)',
                  color: 'var(--seed-color-fg-neutral-muted)',
                }}
              >
                {r.label}
              </span>
              <div style={{ flex: 1 }}>
                <Bar ratio={r.found / r.total} />
              </div>
              <span
                style={{
                  flex: 'none',
                  width: 48,
                  textAlign: 'right',
                  fontSize: 'var(--seed-font-size-t1)',
                  color: 'var(--seed-color-fg-neutral-subtle)',
                }}
              >
                {r.found} / {r.total}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p style={landing.caption}>화면 예시입니다. 자원 수는 지역과 계열마다 다릅니다.</p>
    </div>
  );
}

/** 칭호 셋. 앞의 둘은 달성, 마지막은 아직이다. */
export function TitleRow() {
  const titles = [
    { label: '새로운 탐험가', reached: true },
    { label: '지역 탐험가', reached: true },
    { label: '전국 탐험가', reached: false },
  ];
  return (
    <div style={{ display: 'flex', gap: 'var(--seed-dimension-x2_5)' }}>
      {titles.map((t) => (
        <div
          key={t.label}
          style={{
            ...landing.card,
            flex: 1,
            minWidth: 0,
            padding: 'var(--seed-dimension-x4) var(--seed-dimension-x3)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              ...landing.center,
              width: 32,
              height: 32,
              margin: '0 auto var(--seed-dimension-x2)',
              borderRadius: 'var(--seed-radius-full)',
              background: t.reached
                ? 'var(--seed-color-bg-brand-weak)'
                : 'var(--seed-color-bg-neutral-weak)',
              color: t.reached
                ? 'var(--seed-color-fg-brand)'
                : 'var(--seed-color-fg-neutral-subtle)',
            }}
          >
            <Glyph name="star" size={16} />
          </div>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t2)',
              lineHeight: 'var(--seed-line-height-t3)',
              fontWeight: 'var(--seed-font-weight-bold)',
              color: t.reached
                ? 'var(--seed-color-fg-neutral)'
                : 'var(--seed-color-fg-neutral-subtle)',
              wordBreak: 'keep-all',
              margin: 0,
            }}
          >
            {t.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** 다녀온 곳을 묶은 코스 한 개. */
export function CourseCard() {
  const stops = ['오대산', '정동진', '소양강', '대관령'];
  return (
    <div
      style={{
        padding: 'var(--seed-dimension-x6)',
        background: 'var(--seed-color-bg-layer-fill)',
        border: '1px solid var(--seed-color-stroke-neutral-weak)',
        borderRadius: 'var(--seed-radius-r5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--seed-dimension-x2_5)',
          marginBottom: 'var(--seed-dimension-x5)',
        }}
      >
        <div style={{ ...TILE, width: 36, height: 36, borderRadius: 'var(--seed-radius-r2_5)' }}>
          <Glyph name="route" size={18} />
        </div>
        <div>
          <p style={{ ...landing.h3, fontSize: 'var(--seed-font-size-t5)' }}>강원 자연 도감 코스</p>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t2)',
              color: 'var(--seed-color-fg-neutral-subtle)',
              margin: 'var(--seed-dimension-x1) 0 0',
            }}
          >
            4곳 · 자연
          </p>
        </div>
      </div>
      <ol style={{ listStyle: 'none', margin: 0, padding: '0 0 0 var(--seed-dimension-x6)' }}>
        {stops.map((s, i) => (
          <li
            key={s}
            style={{
              position: 'relative',
              padding: 'var(--seed-dimension-x2_5) 0',
              fontSize: 'var(--seed-font-size-t4)',
              color: 'var(--seed-color-fg-neutral)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 'calc(-1 * var(--seed-dimension-x6))',
                top: 'var(--seed-dimension-x3)',
                width: 'var(--seed-dimension-x3)',
                height: 'var(--seed-dimension-x3)',
                borderRadius: 'var(--seed-radius-full)',
                background: 'var(--seed-color-bg-brand-solid)',
              }}
            />
            {i < stops.length - 1 ? (
              <span
                style={{
                  position: 'absolute',
                  left: 'calc(-1 * var(--seed-dimension-x5) + 1px)',
                  top: 'var(--seed-dimension-x6)',
                  bottom: 'calc(-1 * var(--seed-dimension-x2))',
                  width: 2,
                  background: 'var(--seed-color-stroke-brand-weak)',
                }}
              />
            ) : null}
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** [주의] 스토어 배지는 아직 **링크가 없다.** `<a>` 로 만들지 마라.
 *
 * 스토어 마크는 각 사 상표라 단색으로만 쓴다. 색을 입히면 실제 배지를 흉내 내는
 * 것이 되고, 그때부터는 각 사 배지 가이드라인의 규격을 지켜야 한다. */
export function StoreBadges() {
  const stores: ReadonlyArray<{ label: string; glyph: GlyphName }> = [
    { label: 'Google Play', glyph: 'play' },
    { label: 'App Store', glyph: 'apple' },
  ];
  const badge: CSSProperties = {
    ...landing.center,
    gap: 'var(--seed-dimension-x2)',
    padding: 'var(--seed-dimension-x3) var(--seed-dimension-x5)',
    borderRadius: 'var(--seed-radius-r3)',
    border: '1px dashed var(--seed-color-stroke-neutral-weak)',
    background: 'var(--seed-color-bg-layer-default)',
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t4)',
    fontWeight: 'var(--seed-font-weight-bold)',
  };
  return (
    <div>
      <div style={{ ...landing.center, gap: 'var(--seed-dimension-x3)', flexWrap: 'wrap' }}>
        {stores.map((s) => (
          <span key={s.label} style={badge} aria-disabled="true">
            <Glyph name={s.glyph} size={18} />
            {s.label}
          </span>
        ))}
      </div>
      <p style={{ ...landing.caption, textAlign: 'center' }}>
        출시를 준비하고 있습니다.
        <br />
        조만간 만나요!
      </p>
    </div>
  );
}
