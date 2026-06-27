import Link from 'next/link';
const card = { display: 'block', padding: '22px 24px', borderRadius: 18, background: '#fff', border: '1px solid #e5e8eb', boxShadow: '0 10px 30px -22px rgba(0,0,0,.4)' };
export const metadata = { title: '모두립 · 설계' };
export default function DesignIndex() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '56px 28px 96px' }}>
      <p style={{ margin: 0, color: 'rgba(55,56,60,.61)', fontSize: 14, fontWeight: 600 }}>모두립 · 설계</p>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-.02em', color: '#171719', margin: '6px 0 10px' }}>설계</h1>
      <p style={{ margin: 0, color: 'rgba(46,47,51,.7)', fontSize: 15, lineHeight: 1.6 }}>데이터베이스 설계와 결정 사항. 원천 문서는 <code>docs/</code>(markdown), 이 화면은 브라우징용 뷰.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, margin: '34px 0' }}>
        <Link href="/design/database" style={card}><div style={{ fontSize: 18, fontWeight: 800, color: '#171719' }}>데이터베이스 설계 →</div><div style={{ fontSize: 13, color: 'rgba(55,56,60,.61)', marginTop: 6 }}>ERD(간소화·상세) · 관계 · 매핑</div></Link>
        <Link href="/design/decisions" style={card}><div style={{ fontSize: 18, fontWeight: 800, color: '#171719' }}>결정 사항 →</div><div style={{ fontSize: 13, color: 'rgba(55,56,60,.61)', marginTop: 6 }}>공모전·기술 결정 체크리스트</div></Link>
      </div>
      <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: '#0066ff' }}>← 홈</Link>
    </main>
  );
}
