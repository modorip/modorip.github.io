import Link from 'next/link';
import { buildGallery } from '@/lib/wireframes';
import './wireframes.css';

export const metadata = { title: '와이어프레임 · 모두립' };

export default function WireframesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#e9edf1' }}>
      <main style={{ maxWidth: 1480, margin: '0 auto', padding: '32px 28px 80px' }}>
        <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: '#0066ff' }}>← 홈</Link>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#171719', margin: '10px 0 6px', letterSpacing: '-.02em' }}>모두립 · 와이어프레임</h1>
        <p style={{ margin: 0, color: 'rgba(55,56,60,.61)', fontSize: 14 }}>
          13개 화면 저충실도(low-fi) · 디바이스 402×874 기준 · 출처 docs/01-기능명세서
        </p>
        <div className="wf" style={{ marginTop: 22 }}>
          <div className="gallery" dangerouslySetInnerHTML={{ __html: buildGallery() }} />
        </div>
      </main>
    </div>
  );
}
