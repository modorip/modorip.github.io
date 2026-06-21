import Link from 'next/link';
import { SCREENS } from '@/lib/screens';

const card = { display: 'block', padding: '22px 24px', borderRadius: 18, background: '#fff', border: '1px solid #e5e8eb', boxShadow: '0 10px 30px -22px rgba(0,0,0,.4)' };

export default function Home() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '56px 28px 96px' }}>
      <p style={{ margin: 0, color: 'rgba(55,56,60,.61)', fontSize: 14, fontWeight: 600 }}>모두립 · Mockup</p>
      <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-.02em', color: '#171719', margin: '6px 0 10px' }}>와이어프레임 & 화면별 목업</h1>
      <p style={{ margin: 0, color: 'rgba(46,47,51,.7)', fontSize: 15, lineHeight: 1.6 }}>
        claude design(<code>/app</code>) 레퍼런스를 Next.js로 이식한 목업. 15개 화면의 저충실도 와이어프레임과 풀스크린 고충실도 목업, 그리고 탭 네비게이션이 동작하는 인터랙티브 프로토타입.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, margin: '34px 0 44px' }}>
        <Link href="/wireframes" style={card}><div style={{ fontSize: 18, fontWeight: 800, color: '#171719' }}>와이어프레임 →</div><div style={{ fontSize: 13, color: 'rgba(55,56,60,.61)', marginTop: 6 }}>15개 화면 저충실도 설계 갤러리</div></Link>
        <Link href="/mockup" style={card}><div style={{ fontSize: 18, fontWeight: 800, color: '#171719' }}>화면별 목업 →</div><div style={{ fontSize: 13, color: 'rgba(55,56,60,.61)', marginTop: 6 }}>디자인 충실 풀스크린 (전체화면)</div></Link>
        <Link href="/prototype" style={card}><div style={{ fontSize: 18, fontWeight: 800, color: '#171719' }}>프로토타입 →</div><div style={{ fontSize: 13, color: 'rgba(55,56,60,.61)', marginTop: 6 }}>탭 네비게이션 동작 데모</div></Link>
      </div>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: '#171719', margin: '0 0 12px' }}>화면 목록</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 8 }}>
        {SCREENS.map((s) => (
          <Link key={s.id} href={`/mockup/${s.id}`} style={{ display: 'flex', gap: 10, alignItems: 'baseline', padding: '10px 12px', borderRadius: 10, background: '#fff', border: '1px solid #e5e8eb' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, color: '#171719', fontSize: 13 }}>{s.no}</span>
            <span style={{ fontSize: 13, color: 'rgba(46,47,51,.88)' }}>{s.name}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
