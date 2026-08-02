import Link from 'next/link';
import { CardLink } from '@/components/doc';
import { SCREENS } from '@/lib/screens';

export default function Home() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 'var(--seed-dimension-x14) var(--seed-dimension-x7) 96px' }}>
      <p style={{ margin: 0, color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 'var(--seed-font-size-t4)', fontWeight: 'var(--seed-font-weight-bold)' }}>모두립 · Mockup</p>
      <h1 style={{ fontSize: 'var(--seed-font-size-t12)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)', margin: 'var(--seed-dimension-x1_5) 0 var(--seed-dimension-x2_5)' }}>화면별 목업</h1>
      <p style={{ margin: 0, color: 'var(--seed-color-fg-neutral-muted)', fontSize: 'var(--seed-font-size-t5)', lineHeight: 1.6 }}>
        claude design(<code>/app</code>) 레퍼런스를 Next.js로 이식한 목업. 15개 화면의 풀스크린 고충실도 목업과 탭 네비게이션이 동작하는 인터랙티브 프로토타입.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 'var(--seed-dimension-x4)', margin: 'var(--seed-dimension-x9) 0 var(--seed-dimension-x12)' }}>
        <CardLink href="/mockup" title="화면별 목업" description="디자인 충실 풀스크린 (전체화면)" />
        <CardLink href="/storyboard" title="스토리보드" description="6개 시나리오 × 단계별 흐름" />
        <CardLink href="/prototype" title="프로토타입" description="탭 네비게이션 동작 데모" />
        <CardLink href="/design" title="설계" description="DB 설계 · 결정 사항" />
      </div>
      <h2 style={{ fontSize: 'var(--seed-font-size-t5)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)', margin: '0 0 var(--seed-dimension-x3)' }}>화면 목록</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 'var(--seed-dimension-x2)' }}>
        {SCREENS.map((s) => (
          <Link key={s.id} href={`/mockup/${s.id}`} style={{ display: 'flex', gap: 'var(--seed-dimension-x2_5)', alignItems: 'baseline', padding: 'var(--seed-dimension-x2_5) var(--seed-dimension-x3)', borderRadius: 'var(--seed-radius-r3)', background: 'var(--seed-color-bg-layer-default)', border: '1px solid var(--seed-color-stroke-neutral-muted)' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)', fontSize: 'var(--seed-font-size-t3)' }}>{s.no}</span>
            <span style={{ fontSize: 'var(--seed-font-size-t3)', color: 'var(--seed-color-fg-neutral-muted)' }}>{s.name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
