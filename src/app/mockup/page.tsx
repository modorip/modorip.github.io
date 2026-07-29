import type { Metadata } from 'next';
import Link from 'next/link';
import { BackLink } from '@/components/doc';
import ClientOnly from '@/components/ClientOnly';
import MockFrame from '@/components/MockFrame';
import ScreenHost from '@/components/ScreenHost';
import { SCREENS } from '@/lib/screens';

export const metadata: Metadata = { title: '화면별 목업 · 모두립' };

/** 갤러리 썸네일 배율. 402×874 프레임을 카드 크기로 줄인다. */
const THUMB = 0.33;

export default function MockupGallery() {
  return (
    <main style={{ maxWidth: 1480, margin: '0 auto', padding: 'var(--seed-dimension-x8) var(--seed-dimension-x7) 80px' }}>
      <BackLink href="/">홈</BackLink>
      <h1 style={{ fontSize: 'var(--seed-font-size-t10)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)', margin: 'var(--seed-dimension-x2_5) 0 var(--seed-dimension-x1_5)' }}>화면별 목업</h1>
      <p style={{ margin: 0, color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 'var(--seed-font-size-t4)' }}>claude design 충실 고충실도. 카드를 누르면 전체화면으로 열립니다.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 22px', marginTop: 'var(--seed-dimension-x6)' }}>
        {SCREENS.map((s) => (
          <Link key={s.id} href={`/mockup/${s.id}`} style={{ display: 'block' }}>
            <div style={{ fontSize: 'var(--seed-font-size-t2)', color: 'var(--seed-color-fg-neutral-subtle)', marginBottom: 'var(--seed-dimension-x2)' }}>
              <b style={{ color: 'var(--seed-color-fg-neutral)', fontVariantNumeric: 'tabular-nums' }}>{s.no}</b> <span style={{ color: 'var(--seed-color-fg-neutral-muted)', fontWeight: 'var(--seed-font-weight-bold)' }}>{s.name}</span>
            </div>
            <div style={{ pointerEvents: 'none' }}>
              <ClientOnly fallback={<div style={{ width: 402 * THUMB, height: 874 * THUMB, borderRadius: 'var(--seed-radius-r5)', background: 'var(--seed-color-bg-layer-default)', border: '1px solid var(--seed-color-stroke-neutral-muted)' }} />}>
                <MockFrame scale={THUMB}><ScreenHost id={s.id} /></MockFrame>
              </ClientOnly>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
