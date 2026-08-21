// 도감 카드 삽화. 앱 화면을 옮긴 것이 아니라 **설명을 위한 그림**이다.
//
// [주의] 여기 나오는 자원 이름과 계열은 예시다. 화면 설계 근거로 쓰지 마라.
import type { CSSProperties } from 'react';
import { CATEGORY_GROUPS, landing } from '@/components/landing';
import { Glyph, type GlyphName } from '@/components/landing-glyph';

const THUMB: CSSProperties = {
  ...landing.center,
  height: 80,
  color: 'var(--seed-color-fg-neutral-inverted)',
};

const NAME: CSSProperties = {
  fontSize: 'var(--seed-font-size-t3)',
  lineHeight: 'var(--seed-line-height-t3)',
  fontWeight: 'var(--seed-font-weight-bold)',
  color: 'var(--seed-color-fg-neutral)',
  marginTop: 0,
  marginBottom: 'var(--seed-dimension-x1)',
};

const WHERE: CSSProperties = {
  fontSize: 'var(--seed-font-size-t1)',
  lineHeight: 'var(--seed-line-height-t1)',
  color: 'var(--seed-color-fg-neutral-subtle)',
  marginTop: 0,
  marginBottom: 0,
};

function groupOf(id: string) {
  return CATEGORY_GROUPS.find((c) => c.id === id) ?? CATEGORY_GROUPS[0];
}

function FoundCard({
  name,
  where,
  categoryId,
  glyph,
}: {
  name: string;
  where: string;
  categoryId: string;
  glyph: GlyphName;
}) {
  const c = groupOf(categoryId);
  return (
    <div style={landing.card}>
      <div style={{ ...THUMB, background: `linear-gradient(135deg, ${c.color} 0%, ${c.dark} 100%)` }}>
        <Glyph name={glyph} size={28} />
      </div>
      <div style={landing.cardBody}>
        <p style={NAME}>{name}</p>
        <p style={WHERE}>{where}</p>
        <p
          style={{
            ...WHERE,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--seed-dimension-x1)',
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-brand)',
            marginTop: 'var(--seed-dimension-x2)',
          }}
        >
          <Glyph name="check" size={12} />
          발견됨
        </p>
      </div>
    </div>
  );
}

function EmptyCard({ where }: { where: string }) {
  return (
    <div style={landing.dashed}>
      <div style={{ ...THUMB, color: 'var(--seed-color-fg-neutral-subtle)' }}>
        <Glyph name="plus" size={28} />
      </div>
      <div style={landing.cardBody}>
        <p style={{ ...NAME, fontWeight: 'var(--seed-font-weight-medium)', color: 'var(--seed-color-fg-neutral-subtle)' }}>
          미발견
        </p>
        <p style={WHERE}>{where}</p>
      </div>
    </div>
  );
}

/** 히어로. 채운 카드 둘과 아직 비어 있는 카드 둘. */
export function CollectionPreview() {
  return (
    <div style={landing.grid2}>
      <FoundCard name="오대산 국립공원" where="강원 · 자연" categoryId="nature" glyph="leaf" />
      <FoundCard name="불국사" where="경북 · 유적" categoryId="heritage" glyph="landmark" />
      <EmptyCard where="? · 문화" />
      <EmptyCard where="? · 축제" />
    </div>
  );
}

function StageCard({ label, where, filled }: { label: string; where: string; filled: boolean }) {
  return (
    <div
      style={{
        ...landing.card,
        flex: 1,
        minWidth: 0,
        border: filled
          ? '2px solid var(--seed-color-bg-brand-solid)'
          : '1px solid var(--seed-color-stroke-brand-weak)',
      }}
    >
      <div
        style={{
          ...THUMB,
          height: 56,
          background: filled ? 'var(--seed-color-bg-brand-solid)' : 'var(--seed-color-bg-brand-weak)',
          color: filled ? 'var(--seed-color-fg-neutral-inverted)' : 'var(--seed-color-fg-brand)',
        }}
      >
        <Glyph name={filled ? 'star' : 'check'} size={20} />
      </div>
      <div style={{ padding: 'var(--seed-dimension-x2_5)' }}>
        <p style={{ ...NAME, fontSize: 'var(--seed-font-size-t2)' }}>{label}</p>
        <p style={{ ...WHERE, color: filled ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral-subtle)' }}>
          {where}
        </p>
      </div>
    </div>
  );
}

/** 미발견에서 수집 완료까지, 카드 한 장이 어떻게 변하는가. */
export function CollectStages() {
  const skeleton = (width: string, height: string) => (
    <div
      style={{
        width,
        height,
        background: 'var(--seed-color-bg-neutral-weak)',
        borderRadius: 'var(--seed-radius-full)',
      }}
    />
  );
  return (
    <div>
      <div style={{ display: 'flex', gap: 'var(--seed-dimension-x2_5)' }}>
        <div style={{ ...landing.dashed, flex: 1, minWidth: 0 }}>
          <div style={{ ...THUMB, height: 56, color: 'var(--seed-color-fg-neutral-subtle)' }}>
            <Glyph name="plus" size={20} />
          </div>
          <div
            style={{
              padding: 'var(--seed-dimension-x2_5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--seed-dimension-x1)',
            }}
          >
            {skeleton('60%', 'var(--seed-dimension-x2)')}
            {skeleton('40%', 'var(--seed-dimension-x1_5)')}
          </div>
        </div>
        <StageCard label="해인사" where="경남 · 유적" filled={false} />
        <StageCard label="한라산" where="제주 · 자연" filled />
      </div>
      <p
        style={{
          ...landing.center,
          gap: 'var(--seed-dimension-x2_5)',
          marginTop: 'var(--seed-dimension-x4)',
          fontSize: 'var(--seed-font-size-t2)',
          lineHeight: 'var(--seed-line-height-t2)',
          color: 'var(--seed-color-fg-neutral-subtle)',
        }}
      >
        미발견
        <Glyph name="arrow" size={16} />
        발견
        <span style={{ ...landing.center, color: 'var(--seed-color-fg-brand)' }}>
          <Glyph name="arrow" size={16} />
        </span>
        <span style={{ color: 'var(--seed-color-fg-brand)', fontWeight: 'var(--seed-font-weight-bold)' }}>
          수집 완료
        </span>
      </p>
    </div>
  );
}
