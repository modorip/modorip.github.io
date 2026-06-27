'use client';
import { useMemo, useState } from 'react';
import ClientOnly from './ClientOnly';
import MockFrame from './MockFrame';
import ScreenHost from './ScreenHost';
import { FLOWS } from '@/lib/storyboard';
import { byId } from '@/lib/screens';

// 미리보기 프레임 스케일 (패널 우측에서 충분히 크게 보이도록).
const PREVIEW_SCALE = 0.8;

// 모든 플로우의 step을 평탄화 — 이전/다음 이동(플로우 롤오버)에 사용.
function buildIndex() {
  const flat = [];
  FLOWS.forEach((flow, fi) => {
    flow.steps.forEach((step, si) => {
      flat.push({ fi, si, step });
    });
  });
  return flat;
}

export default function StoryboardView() {
  const flat = useMemo(buildIndex, []);
  // 선택 상태는 평탄화 인덱스로 관리. 기본 = 첫 step.
  const [cursor, setCursor] = useState(0);

  const current = flat[cursor] ?? flat[0];
  const flow = FLOWS[current.fi];
  const step = current.step;
  const meta = byId(step.id) || {};

  const goPrev = () => setCursor((c) => (c - 1 + flat.length) % flat.length);
  const goNext = () => setCursor((c) => (c + 1) % flat.length);

  return (
    <div className="stb-shell">
      <aside className="stb-tree" aria-label="플로우 트리">
        <div className="stb-tree-head">FLOWS</div>
        {FLOWS.map((f, fi) => (
          <section className="stb-group" key={fi}>
            <header className="stb-group-head">
              <span className="stb-group-no">{fi + 1}</span>
              <span className="stb-group-title">{f.title}</span>
            </header>
            <ul className="stb-steps">
              {f.steps.map((s, si) => {
                const m = byId(s.id) || {};
                const flatIdx = flat.findIndex((x) => x.fi === fi && x.si === si);
                const active = flatIdx === cursor;
                return (
                  <li key={s.id + si}>
                    <button
                      type="button"
                      className={'stb-step-row' + (active ? ' is-active' : '')}
                      onClick={() => setCursor(flatIdx)}
                      aria-current={active ? 'true' : undefined}
                    >
                      <span className="stb-step-no">{m.no}</span>
                      <span className="stb-step-name">{m.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </aside>

      <section className="stb-stage" aria-label="화면 미리보기">
        <header className="stb-stage-head">
          <div className="stb-stage-flow">
            <span className="stb-stage-flowno">{current.fi + 1}</span>
            <span className="stb-stage-flowtitle">{flow.title}</span>
            <span className="stb-stage-flowdesc">{flow.desc}</span>
          </div>
          <div className="stb-stage-screen">
            <span className="stb-stage-screenno">{meta.no}</span> {meta.name}
            <span className="stb-stage-pos">
              {' '}· {current.si + 1} / {flow.steps.length}
            </span>
          </div>
        </header>

        <div className="stb-stage-body">
          <div className="stb-preview">
            <ClientOnly
              fallback={
                <div
                  className="stb-preview-skel"
                  style={{ width: 402 * PREVIEW_SCALE, height: 874 * PREVIEW_SCALE }}
                />
              }
            >
              <MockFrame scale={PREVIEW_SCALE}>
                <ScreenHost id={step.id} />
              </MockFrame>
            </ClientOnly>
          </div>

          <div className="stb-meta">
            <div className="stb-meta-card stb-action">
              <span className="stb-meta-tag">동작</span>
              <p>{step.action}</p>
            </div>
            <div className="stb-meta-card stb-result">
              <span className="stb-meta-tag">결과</span>
              <p>{step.result}</p>
            </div>

            <nav className="stb-nav" aria-label="단계 이동">
              <button type="button" className="stb-nav-btn" onClick={goPrev}>
                ← 이전
              </button>
              <button type="button" className="stb-nav-btn is-next" onClick={goNext}>
                다음 →
              </button>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
