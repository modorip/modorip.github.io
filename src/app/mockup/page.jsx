import Link from 'next/link';
import ClientOnly from '@/components/ClientOnly';
import MockFrame from '@/components/MockFrame';
import ScreenHost from '@/components/ScreenHost';
import { SCREENS } from '@/lib/screens';

export const metadata = { title: '화면별 목업 · 모두립' };
const THUMB = 0.33;

export default function MockupGallery() {
  return (
    <main style={{ maxWidth: 1480, margin: '0 auto', padding: '32px 28px 80px' }}>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: '#0066ff' }}>← 홈</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#171719', margin: '10px 0 6px', letterSpacing: '-.02em' }}>화면별 목업</h1>
      <p style={{ margin: 0, color: 'rgba(55,56,60,.61)', fontSize: 14 }}>claude design 충실 고충실도. 카드를 누르면 전체화면으로 열립니다.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 22px', marginTop: 24 }}>
        {SCREENS.map((s) => (
          <Link key={s.id} href={`/mockup/${s.id}`} style={{ display: 'block' }}>
            <div style={{ fontSize: 12, color: 'rgba(55,56,60,.61)', marginBottom: 8 }}>
              <b style={{ color: '#171719', fontVariantNumeric: 'tabular-nums' }}>{s.no}</b> <span style={{ color: 'rgba(46,47,51,.88)', fontWeight: 600 }}>{s.name}</span>
            </div>
            <div style={{ pointerEvents: 'none' }}>
              <ClientOnly fallback={<div style={{ width: 402 * THUMB, height: 874 * THUMB, borderRadius: 18, background: '#fff', border: '1px solid #d7dbe0' }} />}>
                <MockFrame scale={THUMB}><ScreenHost id={s.id} /></MockFrame>
              </ClientOnly>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
