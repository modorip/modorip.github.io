'use client';
import Link from 'next/link';
import ClientOnly from './ClientOnly';
import MockFrame, { useFitScale } from './MockFrame';
import ScreenHost from './ScreenHost';
import MockApp from './MockApp';

export default function FullScreenView({ mode, id, backHref = '/', title = '' }) {
  const scale = useFitScale(120);
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid #d7dbe0', background: '#fff' }}>
        <Link href={backHref} style={{ fontSize: 13, fontWeight: 700, color: '#0066ff' }}>← 목록</Link>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#171719' }}>{title}</span>
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <ClientOnly fallback={<div style={{ color: '#8b939c', fontSize: 13 }}>화면 로딩 중…</div>}>
          <MockFrame scale={scale}>
            {mode === 'app' ? <MockApp /> : <ScreenHost id={id} />}
          </MockFrame>
        </ClientOnly>
      </div>
    </div>
  );
}
