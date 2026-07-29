'use client';
import { useMemo, useState, type CSSProperties } from 'react';
import ClientOnly from './ClientOnly';
import MockFrame from './MockFrame';
import ScreenHost from './ScreenHost';
import { ActionButton, PrefixIcon, SuffixIcon } from '@seed-design/react';
import { IconChevronLeftLine, IconChevronRightLine } from '@karrotmarket/react-monochrome-icon';
import { FLOWS, type FlowStep } from '@/lib/storyboard';
import { byId } from '@/lib/screens';

// 미리보기 프레임 스케일 (패널 우측에서 충분히 크게 보이도록).
const PREVIEW_SCALE = 0.8;

// 자체 CSS 없이 SEED 토큰만으로 조립한다. SEED 에 트리 내비·2단 스테이지 레이아웃
// 컴포넌트가 없어 Box 수준으로 직접 세운다.
const card: CSSProperties = {
  background: 'var(--seed-color-bg-layer-default)',
  border: '1px solid var(--seed-color-stroke-neutral-muted)',
  borderRadius: 'var(--seed-radius-r3)',
};

const S = {
  shell: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--seed-dimension-x5)', alignItems: 'start' },
  tree: { ...card, padding: 'var(--seed-dimension-x3)', position: 'sticky', top: 'var(--seed-dimension-x5)', maxHeight: 'calc(100dvh - 40px)', overflowY: 'auto' },
  treeHead: {
    fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-neutral-subtle)',
    padding: '0 var(--seed-dimension-x2) var(--seed-dimension-x2)',
  },
  group: { marginBottom: 'var(--seed-dimension-x3)' },
  groupHead: {
    display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2)',
    padding: 'var(--seed-dimension-x1_5) var(--seed-dimension-x2)',
  },
  groupNo: {
    flex: '0 0 auto', width: 'var(--seed-dimension-x5)', height: 'var(--seed-dimension-x5)', borderRadius: 'var(--seed-radius-full)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--seed-color-bg-brand-solid)', color: 'var(--seed-color-palette-static-white)',
    fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)',
  },
  groupTitle: { fontSize: 'var(--seed-font-size-t3)', fontWeight: 'var(--seed-font-weight-bold)' },
  steps: {
    listStyle: 'none', margin: '0 0 0 var(--seed-dimension-x5)',
    padding: '0 0 0 var(--seed-dimension-x2_5)',
    borderLeft: '1.5px solid var(--seed-color-stroke-neutral-muted)',
  },
  stage: { ...card, padding: 'var(--seed-dimension-x5)', minWidth: 0 },
  stageHead: {
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
    paddingBottom: 'var(--seed-dimension-x3)', marginBottom: 'var(--seed-dimension-x5)',
  },
  flowRow: { display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2)', flexWrap: 'wrap' },
  flowNo: {
    flex: '0 0 auto', width: 22, height: 22, borderRadius: 'var(--seed-radius-full)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--seed-color-bg-brand-solid)', color: 'var(--seed-color-palette-static-white)',
    fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)',
  },
  flowTitle: { fontSize: 'var(--seed-font-size-t6)', fontWeight: 'var(--seed-font-weight-bold)' },
  flowDesc: { fontSize: 'var(--seed-font-size-t3)', color: 'var(--seed-color-fg-neutral-subtle)' },
  screenLine: { marginTop: 'var(--seed-dimension-x2)', fontSize: 'var(--seed-font-size-t4)', fontWeight: 'var(--seed-font-weight-medium)' },
  screenNo: {
    display: 'inline-block', marginRight: 'var(--seed-dimension-x1_5)',
    padding: '2px var(--seed-dimension-x1_5)', borderRadius: 'var(--seed-radius-r1)',
    background: 'var(--seed-color-bg-neutral-weak)',
    fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)',
    fontVariantNumeric: 'tabular-nums',
  },
  pos: { color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 'var(--seed-font-size-t3)' },
  body: { display: 'flex', gap: 'var(--seed-dimension-x6)', flexWrap: 'wrap' },
  preview: { flex: '0 0 auto' },
  skel: { background: 'var(--seed-color-bg-neutral-weak)', borderRadius: 'var(--seed-radius-r6)' },
  meta: { flex: '1 1 280px', minWidth: 240, display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x3)' },
  metaTag: {
    display: 'inline-block', marginBottom: 'var(--seed-dimension-x1_5)',
    padding: '2px var(--seed-dimension-x2)', borderRadius: 'var(--seed-radius-full)',
    fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)',
  },
  metaText: { margin: 0, fontSize: 'var(--seed-font-size-t4)', lineHeight: 'var(--seed-line-height-t5)' },
  nav: { display: 'flex', gap: 'var(--seed-dimension-x2)', marginTop: 'auto' },
} satisfies Record<string, CSSProperties>;

const stepRow = (active: boolean): CSSProperties => ({
  width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2)',
  padding: 'var(--seed-dimension-x1_5) var(--seed-dimension-x2)',
  border: 'none', cursor: 'pointer', textAlign: 'left',
  borderRadius: 'var(--seed-radius-r2)',
  background: active ? 'var(--seed-color-bg-brand-weak)' : 'transparent',
  color: active ? 'var(--seed-color-fg-brand)' : 'var(--seed-color-fg-neutral-subtle)',
  fontWeight: active ? 'var(--seed-font-weight-bold)' : 'var(--seed-font-weight-regular)',
  fontSize: 'var(--seed-font-size-t2)',
});

/** 동작(파랑)/결과(초록) 두 종류의 메타 카드. */
type MetaTone = 'action' | 'result';

const metaCard = (tone: MetaTone): CSSProperties => ({
  ...card,
  padding: 'var(--seed-dimension-x4)',
  background: tone === 'action'
    ? 'var(--seed-color-bg-informative-weak)'
    : 'var(--seed-color-bg-positive-weak)',
  borderColor: tone === 'action'
    ? 'var(--seed-color-stroke-informative-weak)'
    : 'var(--seed-color-stroke-positive-weak)',
});

/** 평탄화된 단계 하나. fi=플로우 인덱스 · si=플로우 안 단계 인덱스. */
interface FlatStep {
  fi: number;
  si: number;
  step: FlowStep;
}

// 모든 플로우의 step을 평탄화 - 이전/다음 이동(플로우 롤오버)에 사용.
function buildIndex(): FlatStep[] {
  const flat: FlatStep[] = [];
  FLOWS.forEach((flow, fi) => {
    flow.steps.forEach((step, si) => {
      flat.push({ fi, si, step });
    });
  });
  return flat;
}

export default function StoryboardView() {
  const flat = useMemo(() => buildIndex(), []);
  // 선택 상태는 평탄화 인덱스로 관리. 기본 = 첫 step.
  const [cursor, setCursor] = useState(0);

  const current = flat[cursor] ?? flat[0];
  const flow = FLOWS[current.fi];
  const step = current.step;
  // FLOWS 의 id 는 ScreenId 로 강제되지만 byId 는 미검증 문자열도 받으므로 undefined 를 돌려준다.
  const meta = byId(step.id);

  const goPrev = () => setCursor((c) => (c - 1 + flat.length) % flat.length);
  const goNext = () => setCursor((c) => (c + 1) % flat.length);

  return (
    <div style={S.shell}>
      <aside style={S.tree} aria-label="플로우 트리">
        <div style={S.treeHead}>FLOWS</div>
        {FLOWS.map((f, fi) => (
          <section style={S.group} key={fi}>
            <header style={S.groupHead}>
              <span style={S.groupNo}>{fi + 1}</span>
              <span style={S.groupTitle}>{f.title}</span>
            </header>
            <ul style={S.steps}>
              {f.steps.map((s, si) => {
                const m = byId(s.id);
                const flatIdx = flat.findIndex((x) => x.fi === fi && x.si === si);
                const active = flatIdx === cursor;
                return (
                  <li key={s.id + si}>
                    <button
                      type="button"
                      style={stepRow(active)}
                      onClick={() => setCursor(flatIdx)}
                      aria-current={active ? 'true' : undefined}
                    >
                      <span style={{ flex: '0 0 auto', width: 22, fontVariantNumeric: 'tabular-nums' }}>{m?.no}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m?.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </aside>

      <section style={S.stage} aria-label="화면 미리보기">
        <header style={S.stageHead}>
          <div style={S.flowRow}>
            <span style={S.flowNo}>{current.fi + 1}</span>
            <span style={S.flowTitle}>{flow.title}</span>
            <span style={S.flowDesc}>{flow.desc}</span>
          </div>
          <div style={S.screenLine}>
            <span style={S.screenNo}>{meta?.no}</span> {meta?.name}
            <span style={S.pos}>
              {' '}· {current.si + 1} / {flow.steps.length}
            </span>
          </div>
        </header>

        <div style={S.body}>
          <div style={S.preview}>
            <ClientOnly
              fallback={
                <div style={{ ...S.skel, width: 402 * PREVIEW_SCALE, height: 874 * PREVIEW_SCALE }} />
              }
            >
              <MockFrame scale={PREVIEW_SCALE}>
                <ScreenHost id={step.id} />
              </MockFrame>
            </ClientOnly>
          </div>

          <div style={S.meta}>
            <div style={metaCard('action')}>
              <span style={{ ...S.metaTag, background: 'var(--seed-color-bg-informative-solid)', color: 'var(--seed-color-palette-static-white)' }}>동작</span>
              <p style={S.metaText}>{step.action}</p>
            </div>
            <div style={metaCard('result')}>
              <span style={{ ...S.metaTag, background: 'var(--seed-color-bg-positive-solid)', color: 'var(--seed-color-palette-static-white)' }}>결과</span>
              <p style={S.metaText}>{step.result}</p>
            </div>

            <nav style={S.nav} aria-label="단계 이동">
              <ActionButton variant="neutralOutline" size="medium" onClick={goPrev} style={{ flex: 1 }}>
                <PrefixIcon svg={<IconChevronLeftLine />} />
                이전
              </ActionButton>
              <ActionButton variant="brandSolid" size="medium" onClick={goNext} style={{ flex: 1 }}>
                다음
                <SuffixIcon svg={<IconChevronRightLine />} />
              </ActionButton>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
