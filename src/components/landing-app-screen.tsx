// 히어로에 들어가는 앱 화면. admin 목업 `16 카드 앨범` 을 랜딩으로 옮긴 것이다.
//
// [주의] **이식본이라 목업과 픽셀이 같지 않다.** admin 이 정본이고 여기는 소개용
// 삽화다. 화면 설계를 이 파일로 하지 마라. 카드 앞면 그림도 실제 사진이 아니라
// 계열색으로 그린 삽화다.
//
// 402x874 로 짜고 `scale` 로 줄인다. 비트맵을 줄이는 것과 달리 글자가 벡터로 남는다.
// 아래 수치는 목업 화면에서 실측해 옮긴 것이다 - 눈대중으로 고치면 비율이 어긋난다.
import type { CSSProperties } from 'react';
import { CATEGORY_GROUPS, landing } from '@/components/landing';
import { Glyph } from '@/components/landing-glyph';

const W = 402;
const H = 874;
const GUTTER = 20;
const STATUS_BAR = 44;

const CARD_W = 246;
const CARD_ART_H = 208;

const CULTURE = CATEGORY_GROUPS.find((c) => c.id === 'culture') ?? CATEGORY_GROUPS[0];

// [주의] 그림 상자의 바탕. SVG 는 기본값 `meet` 이면 viewBox 비율을 지키느라 상자에
// 여백을 남기고, 그 틈으로 카드의 흰 배경이 비쳐 위아래에 흰 줄이 생긴다. `slice` 로
// 덮고 이 바탕색으로 반올림 한 줄까지 막는다.
const SKY_TOP = '#4b3f8f';

const row: CSSProperties = { display: 'flex', alignItems: 'center' };

/** 카드 앞면 그림. 저녁 하늘 아래 박물관 한 채. */
function CardArt() {
  return (
    <svg
      viewBox="0 0 240 200"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="landing-card-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b3f8f" />
          <stop offset="55%" stopColor="#7d6cb8" />
          <stop offset="100%" stopColor="#c9a6c8" />
        </linearGradient>
      </defs>
      <rect width="240" height="200" fill="url(#landing-card-sky)" />
      <g fill="#ffffff">
        <circle cx="24" cy="24" r="1.6" opacity="0.7" />
        <circle cx="58" cy="14" r="1.1" opacity="0.5" />
        <circle cx="88" cy="32" r="1.4" opacity="0.65" />
        <circle cx="120" cy="16" r="1" opacity="0.45" />
        <circle cx="146" cy="30" r="1.5" opacity="0.6" />
        <circle cx="196" cy="20" r="1.2" opacity="0.55" />
        <circle cx="222" cy="40" r="1.6" opacity="0.7" />
        <circle cx="42" cy="48" r="1.2" opacity="0.5" />
        <circle cx="106" cy="52" r="1" opacity="0.4" />
        <circle cx="16" cy="66" r="1.3" opacity="0.5" />
        <circle cx="72" cy="70" r="1" opacity="0.4" />
        <circle cx="210" cy="72" r="1.1" opacity="0.45" />
      </g>
      <circle cx="176" cy="52" r="26" fill="#ffe7b0" opacity="0.14" />
      <circle cx="176" cy="52" r="17" fill="#ffe7b0" opacity="0.95" />
      <path d="M0 104 Q40 74 84 96 Q126 66 170 92 Q204 110 240 96 L240 200 L0 200 Z" fill="#5b4f92" opacity="0.55" />
      <path d="M0 132 Q54 104 100 126 Q148 100 196 122 Q220 132 240 126 L240 200 L0 200 Z" fill="#413769" opacity="0.85" />
      <path d="M34 118 L120 66 L206 118 Z" fill="#2a2447" />
      <rect x="52" y="116" width="136" height="70" fill="#2a2447" />
      <g fill="#ffe7b0" opacity="0.45">
        <rect x="65" y="130" width="12" height="56" />
        <rect x="89" y="130" width="12" height="56" />
        <rect x="113" y="130" width="12" height="56" />
        <rect x="137" y="130" width="12" height="56" />
        <rect x="161" y="130" width="12" height="56" />
      </g>
    </svg>
  );
}

function Pill({ children, background }: { children: string; background: string }) {
  return (
    <span
      style={{
        padding: '4px 8px',
        borderRadius: 7,
        background,
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'var(--seed-font-weight-bold)',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 10, color: 'var(--seed-color-fg-neutral-subtle)' }}>{label}</p>
      <p
        style={{
          margin: '6px 0 0',
          fontSize: 13,
          fontWeight: 'var(--seed-font-weight-bold)',
          color: 'var(--seed-color-fg-neutral)',
        }}
      >
        {value}
      </p>
    </div>
  );
}

/** 가운데 카드. 좌우로 이웃 카드가 살짝 보인다. */
function Card() {
  return (
    <div
      style={{
        width: CARD_W,
        borderRadius: 20,
        border: `2px solid ${CULTURE.color}`,
        background: 'var(--seed-color-bg-layer-default)',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16)',
      }}
    >
      <div style={{ position: 'relative', height: CARD_ART_H, background: SKY_TOP }}>
        <CardArt />
        <div style={{ ...row, position: 'absolute', inset: '10px 10px auto', justifyContent: 'space-between' }}>
          <Pill background="rgba(0, 0, 0, 0.45)">#0005</Pill>
          <Pill background={CULTURE.color}>문화</Pill>
        </div>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-neutral)',
          }}
        >
          국립제주박물관
        </p>
        <p style={{ margin: '7px 0 0', fontSize: 12, color: CULTURE.dark }}>
          박물관 <span style={{ color: 'var(--seed-color-fg-neutral-subtle)' }}>· 제주특별자치도</span>
        </p>
        <div style={{ height: 1, background: 'var(--seed-color-stroke-neutral-weak)', margin: '14px 0' }} />
        <div style={row}>
          <Stat label="발견일" value="2026.05.06" />
          <Stat label="희귀도" value="★★★" />
          <Stat label="시즌" value="봄·가을" />
        </div>
      </div>
    </div>
  );
}

/** 좌우에서 반쯤 보이는 이웃 카드. 계열색만 남기고 내용은 그리지 않는다. */
function NeighborCard({ side, categoryId }: { side: 'left' | 'right'; categoryId: string }) {
  const c = CATEGORY_GROUPS.find((g) => g.id === categoryId) ?? CATEGORY_GROUPS[0];
  return (
    <div
      style={{
        position: 'absolute',
        top: 22,
        [side]: -(CARD_W - 46),
        width: CARD_W - 30,
        height: 300,
        borderRadius: 18,
        background: 'var(--seed-color-bg-layer-default)',
        border: `1px solid ${c.soft}`,
        overflow: 'hidden',
        opacity: 0.6,
      }}
    >
      <div style={{ height: 186, background: c.soft }} />
    </div>
  );
}

function ArrowButton({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      style={{
        ...landing.center,
        position: 'absolute',
        top: '50%',
        [side]: 14,
        transform: 'translateY(-50%)',
        width: 30,
        height: 30,
        borderRadius: 'var(--seed-radius-full)',
        background: 'var(--seed-color-bg-layer-default)',
        color: 'var(--seed-color-fg-neutral-muted)',
        boxShadow: '0 1px 5px rgba(0, 0, 0, 0.18)',
      }}
    >
      <Glyph name={side === 'left' ? 'chevronLeft' : 'chevronRight'} size={16} />
    </span>
  );
}

const TABS = [
  { label: '홈', glyph: 'home' },
  { label: '발견', glyph: 'compass' },
  { label: '도감', glyph: 'book' },
  { label: '광장', glyph: 'people' },
  { label: '나', glyph: 'person' },
] as const;

function TabBar() {
  return (
    <div
      style={{
        ...row,
        borderTop: '1px solid var(--seed-color-stroke-neutral-weak)',
        background: 'var(--seed-color-bg-layer-default)',
        padding: '12px 0 26px',
      }}
    >
      {TABS.map((t) => {
        const active = t.label === '도감';
        return (
          <div
            key={t.label}
            style={{
              flex: 1,
              textAlign: 'center',
              color: active ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral-subtle)',
            }}
          >
            <span style={landing.center}>
              <Glyph name={t.glyph} size={23} />
            </span>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 11,
                fontWeight: active ? 'var(--seed-font-weight-bold)' : 'var(--seed-font-weight-regular)',
              }}
            >
              {t.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Header() {
  return (
    <div style={{ ...row, justifyContent: 'space-between', padding: `0 ${GUTTER}px` }}>
      <span style={row}>
        <span
          style={{
            ...landing.center,
            width: 40,
            height: 40,
            borderRadius: 13,
            border: '1px solid var(--seed-color-stroke-neutral-weak)',
            color: 'var(--seed-color-fg-neutral)',
          }}
        >
          <Glyph name="chevronLeft" size={19} />
        </span>
        <span
          style={{
            marginLeft: 12,
            fontSize: 24,
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-neutral)',
          }}
        >
          카드 앨범
        </span>
      </span>
      <span style={{ ...row, gap: 7, color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 14 }}>
        <span
          style={{
            fontSize: 18,
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-neutral)',
          }}
        >
          5
        </span>
        / 42
        <Glyph name="pencil" size={16} />
      </span>
    </div>
  );
}

/** admin 목업 `16 카드 앨범` 화면. `width` 만큼 줄여 그린다. */
export function AppScreen({ width = 264 }: { width?: number }) {
  const scale = width / W;
  return (
    <div style={{ width, height: Math.round(H * scale), overflow: 'hidden' }}>
      <div
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--seed-color-bg-layer-basement)',
        }}
      >
        <div style={{ background: 'var(--seed-color-bg-layer-default)', paddingTop: STATUS_BAR }}>
          <Header />
          <div style={{ ...landing.center, position: 'relative', padding: '19px 0 0' }}>
            <NeighborCard side="left" categoryId="festival" />
            <NeighborCard side="right" categoryId="heritage" />
            <Card />
            <ArrowButton side="left" />
            <ArrowButton side="right" />
          </div>
          <p
            style={{
              margin: '9px 0 14px',
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--seed-color-fg-neutral-subtle)',
            }}
          >
            탭해서 카드 뒤집기
          </p>
        </div>

        <p
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 0,
            padding: `0 ${GUTTER}px`,
            fontSize: 16,
            lineHeight: 1.8,
            fontWeight: 'var(--seed-font-weight-medium)',
            color: 'var(--seed-color-fg-neutral-muted)',
            wordBreak: 'keep-all',
          }}
        >
          돌하르방 앞에서 한참 서 있었다. 제주 사람들이 어떻게 살아왔는지 한 층씩 올라가며 보는
          구성이라, 나오면서 창밖 풍경이 달라 보였다.
        </p>

        <div style={{ padding: `0 ${GUTTER}px 20px` }}>
          <div
            style={{
              ...landing.center,
              gap: 7,
              height: 50,
              borderRadius: 14,
              background: 'var(--seed-color-bg-neutral-inverted)',
              color: 'var(--seed-color-fg-neutral-inverted)',
              fontSize: 15,
              fontWeight: 'var(--seed-font-weight-bold)',
            }}
          >
            국립제주박물관 자세히 보기
            <Glyph name="arrow" size={16} />
          </div>
        </div>

        <TabBar />
      </div>
    </div>
  );
}
