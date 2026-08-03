'use client';
import { useEffect, useRef, useId, useState } from 'react';

// mermaid 는 themeVariables 색으로 명암 연산을 하므로 var() 문자열을 넘길 수 없다.
// 그래서 SEED 토큰을 런타임에 계산값으로 읽어 넘긴다. 색 정의는 여전히 SEED 가 정본.
const token = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
};

// mermaid 의 classDef 파서는 괄호를 못 읽어 `fill:var(--x)` 에서 깨진다
// ("Expecting 'SEMI'... got '(-'"). 그래서 다이어그램 문자열의 var() 를
// 렌더 직전에 계산값으로 바꾼다. 색 정의는 계속 SEED 가 정본이다.
const resolveTokens = (chart: string): string =>
  chart.replace(/var\((--seed-[a-z0-9-]+)\)/g, (m, name: string) => token(name, m));

export interface MermaidProps {
  /** mermaid 다이어그램 소스. var(--seed-*) 를 써도 렌더 직전에 계산값으로 치환된다. */
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[:]/g, '');
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    import('mermaid').then(async (m) => {
      if (!alive) return;
      const mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false, theme: 'base', securityLevel: 'loose',
        themeVariables: {
          fontFamily: 'inherit',
          // fallback 은 SSR 등 getComputedStyle 을 못 쓸 때만 쓰인다.
          // layout.tsx 의 브랜드 재정의 블록과 같은 값을 유지하라.
          primaryColor: token('--seed-color-bg-brand-weak', '#EEF5FF'),
          primaryBorderColor: token('--seed-color-stroke-brand-solid', '#0250C5'),
          lineColor: token('--seed-color-fg-neutral-subtle', '#868b94'),
          primaryTextColor: token('--seed-color-fg-neutral', '#1a1c20'),
        },
        er: { useMaxWidth: false }, flowchart: { useMaxWidth: false, htmlLabels: true },
      });
      try {
        const { svg } = await mermaid.render('mmd' + uid, resolveTokens(chart));
        if (alive && ref.current) ref.current.innerHTML = svg;
      } catch (e) { if (alive) setErr(String(e)); console.error(e); }
    });
    return () => { alive = false; };
  }, [chart, uid]);
  if (err) return <pre style={{ color: 'var(--seed-color-fg-critical)', fontSize: 'var(--seed-font-size-t2)' }}>diagram error: {err}</pre>;
  return <div ref={ref} style={{ textAlign: 'center' }} />;
}
