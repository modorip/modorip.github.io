import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { BrandChip, Eyebrow, MiddotList, Section, landing } from '@/components/landing';
import { CollectStages, CollectionPreview } from '@/components/landing-cards';
import {
  CategoryGrid,
  CourseCard,
  DexDashboard,
  StepList,
  StoreBadges,
  TitleRow,
  type Step,
} from '@/components/landing-dex';
import { Glyph } from '@/components/landing-glyph';
import { AppScreen } from '@/components/landing-app-screen';
import { PhoneCaption, PhoneFrame } from '@/components/landing-phone';
import { BeforeAfter, ContrastColumns } from '@/components/landing-story';
import { AccountCard, ProviderTiles, TrustCards, type TrustPoint } from '@/components/landing-trust';

export const metadata: Metadata = {
  title: '모두립 - 발로 채우는 여행 도감',
  description:
    '전국의 자연 · 유적 · 문화 · 축제를 도감으로 만들고 직접 다녀온 곳부터 채웁니다. 위치는 기기 안에서만 쓰입니다.',
};

/// [중요] **공개 랜딩이다.** 스토어 심사자와 이용자가 본다.
///
/// 내부 설계 자료로 가는 링크를 걸지 않는다. 아래 세 가지는 자리를 옮겨도
/// 지우지 않는다 - 계정과 로그인 절 · 위치 절 · 문서 3종 링크.
const CONTACT = 'gdpark.dev@gmail.com';

// 히어로 폰 화면의 안쪽 폭. 화면은 402 로 그리고 이 값으로 줄인다.
const SCREEN_WIDTH = 264;

const DOCUMENTS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
  { href: '/support', label: '지원' },
];

// 줄바꿈이 관형어와 그 뒤 명사를 갈라놓는 자리에만 `nowrap` 을 씌운다.
const STEPS: ReadonlyArray<Step> = [
  {
    no: '01',
    title: '발견',
    body: (
      <>
        목적지에 도착하면 <span style={landing.nowrap}>그 자리에서</span> 발견으로 기록됩니다.{' '}
        <span style={landing.nowrap}>다녀온 곳만</span> 도감에 남습니다.
      </>
    ),
    glyph: 'pin',
  },
  {
    no: '02',
    title: '수집',
    body: (
      <>
        발견한 곳은 나만의 카드가 됩니다. 하나씩 채울수록{' '}
        <span style={landing.nowrap}>다녀온 길이</span> 기록으로 쌓입니다.
      </>
    ),
    glyph: 'cards',
  },
  {
    no: '03',
    title: '완성',
    body: (
      <>
        전국 17개 광역과 <span style={landing.nowrap}>네 계열로</span> 나뉜 도감을 채웁니다.{' '}
        <span style={landing.nowrap}>남은 빈 칸이</span> 다음 목적지가 됩니다.
      </>
    ),
    glyph: 'trophy',
  },
];

const TRUST: ReadonlyArray<TrustPoint> = [
  {
    title: '공공데이터 기반',
    body: (
      <>
        전국 관광자원 정보를 공공데이터로 받아 지도와 도감에 씁니다. 인기순으로 걸러내지 않아, 덜
        알려진 곳도 <span style={landing.nowrap}>같은 무게로</span> 도감에 들어갑니다.
      </>
    ),
    glyph: 'doc',
  },
  {
    title: '현장 인증',
    body: <>자원 근처에 도착해야만 발견으로 기록됩니다.</>,
    glyph: 'pin',
  },
  {
    title: '동선을 남기지 않음',
    body: (
      <>
        위치 좌표와 이동 경로는 기기 안에서만 쓰이고 서버로 보내지 않습니다. 서버에{' '}
        <span style={landing.nowrap}>남는 것은</span> 이용자가 직접 남긴 발견 기록뿐입니다.
      </>
    ),
    glyph: 'lock',
  },
];

const ACCOUNT_NOTES: ReadonlyArray<ReactNode> = [
  <>
    Google 계정에서 <span style={landing.nowrap}>받는 것은</span>{' '}
    <strong style={landing.nowrap}>이름과 이메일 주소</strong>뿐이며,{' '}
    <MiddotList text="Gmail · 드라이브 · 연락처 · 캘린더" />에는 접근하지 않습니다.
  </>,
  <>광고에 쓰지 않고 제3자와 공유하지 않습니다.</>,
  <>
    계정과 기록의 삭제는 앱 안의 프로필 화면에서{' '}
    <span style={landing.nowrap}>직접 할 수 있습니다</span>.
  </>,
];

export default function LandingPage() {
  return (
    <>
      <Section tone="brand">
        <BrandChip />
        <h1 style={landing.h1}>
          국내여행에도
          <br />
          위시리스트가 필요합니다
        </h1>
        <p style={{ ...landing.lead, marginBottom: 'var(--seed-dimension-x10)' }}>
          맛집과 카페를 찾아 떠나는 여행에서,
          <br />
          이번에는 <span style={landing.brandText}>이곳에 가기 위해</span> 떠나보세요.
        </p>
        <PhoneFrame screenWidth={SCREEN_WIDTH}>
          <AppScreen width={SCREEN_WIDTH} />
        </PhoneFrame>
        <PhoneCaption>카드 앨범. 다녀온 곳이 카드가 되고 그 아래에 남긴 말이 붙습니다.</PhoneCaption>
        <div style={{ marginTop: 'var(--seed-dimension-x8)' }}>
          <StoreBadges />
        </div>
      </Section>

      <Section>
        <Eyebrow label="PROBLEM" />
        <h2 style={landing.h2}>
          국내여행에는
          <br />
          &apos;여기에 가야 할 이유&apos;가
          <br />
          약합니다
        </h2>
        <div style={{ ...landing.stack, marginBottom: 'var(--seed-dimension-x8)' }}>
          <p style={landing.body}>
            해외여행을 가면 자연스럽게 그 도시의 랜드마크를 찾습니다. 한 번뿐일지도 모르는
            여행이기에 여기까지 왔으면 이것만큼은 봐야지 하는 목적지가 생깁니다.
          </p>
          <p style={landing.body}>
            하지만 국내여행은 언제든 <span style={landing.nowrap}>다시 올 수 있다는</span> 생각에,
            지역의 자연과 문화유산보다 맛집과 카페를 먼저 찾게 됩니다.
          </p>
        </div>
        <ContrastColumns />
        <p style={{ ...landing.emphasis, marginTop: 'var(--seed-dimension-x8)' }}>
          가볼 곳이 없는 게 아닙니다.
          <br />
          굳이 이번 여행에서 <span style={{ ...landing.brandText, ...landing.nowrap }}>
            가야 할 이유
          </span>가 <span style={landing.nowrap}>없는 것입니다</span>.
        </p>
      </Section>

      <Section tone="fill">
        <Eyebrow label="INSIGHT" variant="plain" />
        <h2 style={landing.h2}>
          여행에 목표가 생기면
          <br />
          평소 지나치던 곳도
          <br />
          목적지가 됩니다
        </h2>
        <BeforeAfter />
      </Section>

      <Section>
        <Eyebrow label="SOLUTION" />
        <h2 style={{ ...landing.h2, marginBottom: 'var(--seed-dimension-x3)' }}>
          가야 할 이유를
          <br />
          도감으로 만듭니다
        </h2>
        <p style={{ ...landing.lead, marginBottom: 'var(--seed-dimension-x9)' }}>
          전국의 <span style={landing.nowrap}>자연 · 유적 · 문화 · 축제</span>를 하나의 도감으로
          만들고, 직접 다녀올 때마다 한 칸씩 채웁니다.
        </p>
        <CollectStages />
      </Section>

      <Section tone="fill">
        <Eyebrow label="HOW IT WORKS" variant="plain" />
        <h2 style={landing.h2}>
          이번 여행의 목적지를
          <br />
          도감에서 찾아보세요
        </h2>
        <StepList steps={STEPS} />
      </Section>

      <Section>
        <Eyebrow label="COLLECTION" />
        <h2 style={landing.h2}>
          전국의 여행지를
          <br />
          하나의 도감으로
        </h2>
        <CategoryGrid />
        <p style={{ ...landing.body, marginTop: 'var(--seed-dimension-x6)' }}>
          전국 <span style={landing.nowrap}>17개 광역시 · 도</span>를{' '}
          <span style={landing.nowrap}>네 계열</span>로 나눠 담습니다. 지역마다 도감이 따로 있어
          어디를 아직 안 가 봤는지가 한눈에 보입니다.
        </p>
        <div style={{ marginTop: 'var(--seed-dimension-x6)' }}>
          <CollectionPreview />
        </div>
      </Section>

      <Section tone="fill">
        <Eyebrow label="GAMIFICATION" variant="plain" />
        <h2 style={landing.h2}>
          여행할수록
          <br />
          나만의 도감이 완성됩니다
        </h2>
        <div style={{ marginBottom: 'var(--seed-dimension-x8)' }}>
          <DexDashboard />
        </div>
        <TitleRow />
        <p style={{ ...landing.emphasis, marginTop: 'var(--seed-dimension-x8)' }}>
          다음 여행에서 무엇을 할지 고민하는 대신,
          <br />
          <span style={{ ...landing.brandText, ...landing.nowrap }}>어떤 카드를 채울지</span>{' '}
          고민하게 됩니다.
        </p>
      </Section>

      <Section>
        <Eyebrow label="SHARE" />
        <h2 style={{ ...landing.h2, marginBottom: 'var(--seed-dimension-x3)' }}>
          내가 발견한 곳이
          <br />
          다음 여행자의
          <br />
          위시리스트가 됩니다
        </h2>
        <p style={{ ...landing.lead, marginBottom: 'var(--seed-dimension-x8)' }}>
          다녀온 장소를 코스로 묶어 공유하고,{' '}
          <span style={landing.nowrap}>다른 탐험가의</span> 다음 여행을 시작하게 합니다.
        </p>
        <CourseCard />
      </Section>

      {/* [중요] **이 두 절을 지우지 마라.**
          근거 절의 셋째 카드는 이 서비스의 핵심 주장이고 server ADR-0003 이 코드로
          보증한다. 계정 절은 구글 OAuth 브랜딩 인증이 홈페이지에서 찾는 것이다 -
          2026-08-19 인증 시도가 "홈페이지에 앱의 목적에 관한 설명이 없습니다" 로
          걸렸다. 받는 항목이 바뀌면 여기와 개인정보처리방침을 함께 고친다. */}
      <Section tone="fill">
        <Eyebrow label="WHY TRUST" variant="plain" />
        <h2 style={landing.h2}>믿을 수 있는 이유</h2>
        <TrustCards points={TRUST} />
      </Section>

      <Section tone="brandWeak">
        <Eyebrow label="ACCOUNT" variant="plain" />
        <h2 style={{ ...landing.h2, marginBottom: 'var(--seed-dimension-x3)' }}>계정과 로그인</h2>
        <p style={{ ...landing.lead, marginBottom: 'var(--seed-dimension-x7)' }}>
          모두립은 Android 와 iOS 에서 쓰는 여행 기록 모바일 앱입니다.{' '}
          <MiddotList text="Google · 카카오 · Apple" /> 계정으로 로그인합니다.
        </p>
        <div style={{ marginBottom: 'var(--seed-dimension-x7)' }}>
          <ProviderTiles />
        </div>
        <AccountCard
          lead="계정이 필요한 이유는 하나입니다."
          reason="기기를 바꾸거나 앱을 다시 깔아도 그동안 채운 도감을 이어서 보기 위해서입니다."
          notes={ACCOUNT_NOTES}
        />
        <p style={{ ...landing.body, marginTop: 'var(--seed-dimension-x5)', textAlign: 'right' }}>
          자세한 내용은{' '}
          <Link href="/privacy" style={landing.brandText}>
            개인정보처리방침
          </Link>
          에 있습니다.
        </p>
      </Section>

      <Section tone="brand">
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              ...landing.center,
              width: 48,
              height: 48,
              margin: '0 auto var(--seed-dimension-x6)',
              borderRadius: 'var(--seed-radius-r3_5)',
              background: 'var(--seed-color-bg-brand-solid)',
              color: 'var(--seed-color-fg-neutral-inverted)',
            }}
          >
            <Glyph name="star" size={24} />
          </p>
          <h2 style={{ ...landing.h2, marginBottom: 'var(--seed-dimension-x3)' }}>
            다음 여행에서
            <br />
            무엇을 발견할까요?
          </h2>
          <p style={{ ...landing.lead, marginBottom: 'var(--seed-dimension-x2)' }}>
            모두립과 함께 전국의 도감을 채워보세요.
          </p>
          <p style={landing.body}>
            <span style={landing.nowrap}>문의는 {CONTACT} 으로 주세요.</span>
          </p>
        </div>
      </Section>

      <footer
        style={{
          background: 'var(--seed-color-bg-neutral-inverted)',
          padding: 'var(--seed-dimension-x10) var(--seed-dimension-x6)',
          textAlign: 'center',
        }}
      >
        <div style={landing.inner}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 'var(--seed-dimension-x6)',
              marginBottom: 'var(--seed-dimension-x5)',
            }}
          >
            {DOCUMENTS.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                style={{
                  fontSize: 'var(--seed-font-size-t3)',
                  color: 'var(--seed-color-fg-neutral-inverted)',
                }}
              >
                {d.label}
              </Link>
            ))}
          </div>
          <a
            href={`mailto:${CONTACT}`}
            style={{
              fontSize: 'var(--seed-font-size-t3)',
              color: 'var(--seed-color-palette-static-white-alpha-700)',
            }}
          >
            {CONTACT}
          </a>
          <p
            style={{
              fontSize: 'var(--seed-font-size-t2)',
              color: 'var(--seed-color-palette-static-white-alpha-500)',
              margin: 'var(--seed-dimension-x4) 0 0',
            }}
          >
            2026 MILLO · 모두립
          </p>
        </div>
      </footer>
    </>
  );
}
