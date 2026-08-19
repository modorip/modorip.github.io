import type { Metadata } from 'next';
import Link from 'next/link';
import { legal } from '@/components/legal';

export const metadata: Metadata = {
  title: '모두립 - 발로 채우는 여행 도감',
  description:
    'GPS 로 관광자원을 발견해 17개 광역 도감을 채웁니다. 위치는 기기 안에서만 쓰입니다.',
};

/// [중요] **공개 랜딩이다.** 스토어 심사자와 이용자가 본다.
///
/// 내부 설계·목업으로 가는 링크를 걸지 않는다. 라우트는 살아 있지만
/// `robots.txt` 가 색인을 막고 여기서 길을 내주지 않는다.
///
/// [주의] 아직 출시 전이라 스토어 배지를 걸지 않았다. 링크가 생기면 여기 붙인다.
///
/// [주의] 위치기반서비스 이용약관은 **보류 중**이다(`(legal)/_location/README.md`).
/// 공개하기로 정하면 아래 목록에 되살린다.
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
    body: '위치 좌표와 이동 경로는 기기 안에서만 쓰이고 서버로 전송되지 않습니다. 서버에 남는 것은 이용자가 직접 남긴 발견 기록뿐입니다.',
  },
];

const DOCUMENTS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
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

      <p style={{ color: 'var(--seed-color-fg-neutral-muted)', marginTop: 'var(--seed-dimension-x5)' }}>
        모두립은 Android 와 iOS 에서 쓰는 여행 기록 모바일 앱입니다. 관광지에 직접 도착하면 그
        자리가 도감에 기록되고, 전국 17개 광역과 자연 · 유적 · 문화 · 축제 네 계열로 나뉜 도감이
        다녀온 만큼 채워집니다.
      </p>

      <section style={{ marginTop: 'var(--seed-dimension-x10)' }}>
        {FEATURES.map((f) => (
          <div key={f.title} style={{ marginBottom: 'var(--seed-dimension-x7)' }}>
            <h2 style={{ ...legal.h2, marginTop: 0 }}>{f.title}</h2>
            <p style={{ color: 'var(--seed-color-fg-neutral-muted)', margin: 0 }}>{f.body}</p>
          </div>
        ))}
      </section>

      {/* [중요] **이 절을 지우지 마라.** 구글 OAuth 브랜딩 인증이 홈페이지에서
          "앱의 목적" 과 "구글 계정을 왜 받는가" 를 찾는다. 2026-08-19 인증 시도가
          "홈페이지에 앱의 목적에 관한 설명이 없습니다" 로 걸렸고, 그때 이 페이지는
          앱이라는 말도 로그인 이야기도 없이 소개 문구만 있었다.

          범위를 늘리거나 받는 항목이 바뀌면 여기와 개인정보처리방침을 함께 고친다.
          둘이 어긋나면 인증이 아니라 스토어 심사에서 걸린다. */}
      <section style={{ marginTop: 'var(--seed-dimension-x10)' }}>
        <h2 style={{ ...legal.h2, marginTop: 0 }}>계정과 로그인</h2>
        <p style={{ color: 'var(--seed-color-fg-neutral-muted)' }}>
          모두립은 Google · 카카오 · Apple 계정으로 로그인합니다. 계정이 필요한 이유는 하나입니다.
          기기를 바꾸거나 앱을 다시 깔아도 그동안 채운 도감을 이어서 보기 위해서입니다.
        </p>
        <p style={{ color: 'var(--seed-color-fg-neutral-muted)' }}>
          Google 계정으로 로그인할 때 모두립이 받는 것은 <strong>이름과 이메일 주소</strong>{' '}
          뿐입니다. 이름은 다른 이용자에게 보이는 탐험가 이름의 기본값으로 쓰고, 이메일 주소는 같은
          사람의 계정을 알아보는 데 씁니다. Gmail · 드라이브 · 연락처 · 캘린더를 비롯한 다른 Google
          서비스의 데이터에는 접근하지 않습니다.
        </p>
        <p style={{ color: 'var(--seed-color-fg-neutral-muted)', marginBottom: 0 }}>
          받은 정보를 광고에 쓰지 않고 제3자와 공유하지 않습니다. 계정과 기록의 삭제는 앱 안의 프로필
          화면에서 직접 할 수 있습니다. 자세한 내용은{' '}
          <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
            개인정보처리방침
          </Link>
          에 있습니다.
        </p>
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
