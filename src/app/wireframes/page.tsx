import type { Metadata } from 'next';
import { buildGallery } from '@/lib/wireframes';
import { WF_GALLERY } from '@/lib/wireframeStyles';
import { doc, BackLink } from '@/components/doc';

export const metadata: Metadata = { title: '와이어프레임 · 모두립' };

export default function WireframesPage() {
  return (
    <main style={{ ...doc.main, maxWidth: 1480 }}>
      <BackLink href="/">홈</BackLink>
      <h1 style={doc.h1}>모두립 · 와이어프레임</h1>
      <p style={doc.sub}>
        13개 화면 저충실도(low-fi) · 디바이스 402×874 기준 · 출처 docs/01-기능명세서
      </p>
      <div style={{ ...WF_GALLERY, marginTop: 'var(--seed-dimension-x5)' }}
        dangerouslySetInnerHTML={{ __html: buildGallery() }} />
    </main>
  );
}
