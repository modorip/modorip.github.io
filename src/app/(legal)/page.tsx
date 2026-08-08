import type { Metadata } from 'next';
import Link from 'next/link';
import { legal } from '@/components/legal';

export const metadata: Metadata = {
  title: '모두립 — 발로 채우는 여행 도감',
  description:
    'GPS 로 관광자원을 발견해 17개 광역 도감을 채웁니다. 위치는 기기 안에서만 쓰입니다.',
};

/// 🔴 **공개 랜딩이다.** 스토어 심사자와 이용자가 본다.
///
/// 내부 설계·목업으로 가는 링크를 걸지 않는다. 라우트는 살아 있지만
/// `robots.txt` 가 색인을 막고 여기서 길을 내주지 않는다.
///
/// ⚠️ 아직 출시 전이라 스토어 배지를 걸지 않았다. 링크가 생기면 여기 붙인다.
const CONTACT = 'gdpark.dev@gmail.com';

const FEATURES: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: '가면 채워지는 도감',
    body: '관광자원 근처에 도착하면 발견으로 기록됩니다. 17개 광역과 4개 계열로 나뉜 도감이 다녀온 만큼 채워집니다.',
  },
  {
    title: '공공데이터 기반',
    body: '전국 관광자원 정보를 공공데이터로 받아 지도와 도감에 씁니다. 미리 받아 두지 않고 필요할 때 조회합니다.',
  },
  {
    title: '기록은 남기고 동선은 남기지 않습니다',
    body: '위치 좌표는 기기 안에서만 계산되고 서버로 전송되지 않습니다. 어디를 다녀왔는지는 남지만 언제 어디에 있었는지는 남지 않습니다.',
  },
];

const DOCUMENTS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
  { href: '/location', label: '위치기반서비스 이용약관' },
  { href: '/support', label: '지원' },
];

export default function LandingPage() {
  return (
    <article style={legal.article}>
      <p style={{ ...legal.meta, marginBottom: 'var(--seed-dimension-x2)' }}>MILLO</p>
      <h1 style={legal.h1}>모두립</h1>
      <p
        style={{
          ...legal.lead,
          fontSize: 'var(--seed-font-size-t6)',
          lineHeight: 'var(--seed-line-height-t7)',
        }}
      >
        발로 채우는 여행 도감. 다녀온 곳이 도감이 되고, 도감이 다음 여행이 됩니다.
      </p>

      <section style={{ marginTop: 'var(--seed-dimension-x10)' }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ marginBottom: 'var(--seed-dimension-x7)' }}>
            <h2 style={{ ...legal.h2, marginTop: 0 }}>{f.title}</h2>
            <p style={{ color: 'var(--seed-color-fg-neutral-muted)', margin: 0 }}>{f.body}</p>
          </div>
        ))}
      </section>

      <section
        style={{
          marginTop: 'var(--seed-dimension-x10)',
          padding: 'var(--seed-dimension-x5)',
          background: 'var(--seed-color-bg-neutral-weak)',
          borderRadius: 'var(--seed-radius-r4)',
        }}
      >
        <h2 style={{ ...legal.h2, marginTop: 0, fontSize: 'var(--seed-font-size-t5)' }}>
          곧 만나요
        </h2>
        <p style={{ color: 'var(--seed-color-fg-neutral-muted)', margin: 0 }}>
          출시를 준비하고 있습니다. 문의는 {CONTACT} 로 받습니다.
        </p>
      </section>

      <nav style={{ marginTop: 'var(--seed-dimension-x10)' }}>
        <h2 style={{ ...legal.h2, fontSize: 'var(--seed-font-size-t5)' }}>문서</h2>
        <ul style={legal.list}>
          {DOCUMENTS.map((d) => (
            <li key={d.href} style={{ marginBottom: 'var(--seed-dimension-x1)' }}>
              <Link href={d.href} style={{ color: 'var(--seed-color-fg-brand)' }}>
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p style={legal.footer}>MILLO · 모두립</p>
    </article>
  );
}
