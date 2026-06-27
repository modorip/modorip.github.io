'use client';
import { useEffect, useRef, useId, useState } from 'react';

export default function Mermaid({ chart }) {
  const ref = useRef(null);
  const uid = useId().replace(/[:]/g, '');
  const [err, setErr] = useState(null);
  useEffect(() => {
    let alive = true;
    import('mermaid').then(async (m) => {
      if (!alive) return;
      const mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false, theme: 'base', securityLevel: 'loose',
        themeVariables: { fontFamily: 'Pretendard, ui-monospace, monospace', primaryColor: '#eef3ff', primaryBorderColor: '#0066ff', lineColor: '#5b6470', primaryTextColor: '#171719' },
        er: { useMaxWidth: false }, flowchart: { useMaxWidth: false, htmlLabels: true },
      });
      try {
        const { svg } = await mermaid.render('mmd' + uid, chart);
        if (alive && ref.current) ref.current.innerHTML = svg;
      } catch (e) { if (alive) setErr(String(e)); console.error(e); }
    });
    return () => { alive = false; };
  }, [chart, uid]);
  if (err) return <pre style={{ color: '#e5484d', fontSize: 12 }}>diagram error: {err}</pre>;
  return <div ref={ref} style={{ textAlign: 'center' }} />;
}
