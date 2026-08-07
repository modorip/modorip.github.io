import type { Metadata } from 'next';
import { CardLink, BackLink } from '@/components/doc';

export const metadata: Metadata = { title: '모두립 · 설계' };

export default function DesignIndex() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: 'var(--seed-dimension-x14) var(--seed-dimension-x7) 96px' }}>
      <p style={{ margin: 0, color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 'var(--seed-font-size-t4)', fontWeight: 'var(--seed-font-weight-bold)' }}>모두립 · 설계</p>
      <h1 style={{ fontSize: 'var(--seed-font-size-t12)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)', margin: 'var(--seed-dimension-x1_5) 0 var(--seed-dimension-x2_5)' }}>설계</h1>
      <p style={{ margin: 0, color: 'var(--seed-color-fg-neutral-muted)', fontSize: 'var(--seed-font-size-t5)', lineHeight: 1.6 }}>데이터베이스 설계와 결정 사항. 원천 문서는 <code>docs/</code>(markdown), 이 화면은 브라우징용 뷰.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--seed-dimension-x4)', margin: 'var(--seed-dimension-x9) 0' }}>
        <CardLink href="/design/database" title="데이터베이스 설계" description="ERD(간소화·상세) · 관계 · 매핑" />
      </div>
      <BackLink href="/">홈</BackLink>
    </main>
  );
}
