import type { Metadata } from 'next';
import Link from 'next/link';
import { legal, Section } from '@/components/legal';

export const metadata: Metadata = {
  title: '위치기반서비스 이용약관 · 모두립',
  description: '모두립이 단말기 위치를 어떻게 쓰는지',
};

/// 🔴 **이 문서의 핵심 주장은 코드가 보증한다.**
///
/// "좌표를 서버로 보내지 않는다" 는 server ADR-0003 이 정한 불변식이고,
/// client 의 발견 등록 요청 본문이 `{ placeId }` 하나뿐인 것으로 성립한다.
/// **그 불변식이 깨지면 이 문서가 거짓이 된다.** 위치를 다루는 코드를 고칠 때
/// 이 페이지를 함께 본다.
const EFFECTIVE = '2026년 8월 10일';
const CONTACT = 'gdpark.dev@gmail.com';

export default function LocationTermsPage() {
  return (
    <article style={legal.article}>
      <h1 style={legal.h1}>위치기반서비스 이용약관</h1>
      <p style={legal.lead}>
        이 약관은 모두립(이하 &ldquo;서비스&rdquo;)이 단말기의 위치를 어떻게 이용하는지
        정합니다.
      </p>
      <p style={legal.meta}>시행일 · {EFFECTIVE}</p>

      <Section title="제1조 (위치정보를 수집하지 않습니다)" emphasis>
        <p>
          서비스는 관광자원 근처에 도착했는지 확인하기 위해 <strong>단말기의 위치 권한</strong>을
          사용합니다. 그러나 <strong>위치 좌표는 이용자의 단말기 안에서만 사용되며 운영자의
          서버로 전송되거나 저장되지 않습니다.</strong>
        </p>
        <p>
          거리 계산과 도착 판정은 전부 단말기에서 이루어지고, 서버에는 그 결과인
          &ldquo;어떤 관광자원을 발견했는가&rdquo;만 전달됩니다.{' '}
          <strong>다만 관광자원의 위치는 정해져 있으므로, 운영자는 이용자가 기록한 방문
          장소와 시각을 확인할 수 있습니다.</strong>
        </p>
        <p style={legal.note}>
          이는 설계 단계에서 정해 문서로 고정한 방침이며, 이용자의 이동 경로를 남기지 않기
          위한 것입니다.
        </p>
      </Section>

      <Section title="제2조 (이용 목적)">
        <p>단말기 위치는 다음 목적으로만 사용합니다.</p>
        <ul style={legal.list}>
          <li>주변 관광자원을 지도에 표시</li>
          <li>관광자원과의 거리를 계산해 발견 가능 여부를 판정</li>
        </ul>
        <p>
          광고·프로파일링·이동 경로 분석에는 사용하지 않으며, 그 목적의 데이터를 만들지도
          않습니다.
        </p>
      </Section>

      <Section title="제3조 (제3자 제공)">
        <p>
          운영자는 위치정보를 보유하지 않으므로 <strong>제3자에게 제공할 위치정보가
          없습니다.</strong>
        </p>
        <p style={legal.note}>
          지도 표시를 위해 단말기가 지도 서비스 제공자와 직접 통신합니다. 그 과정은 해당
          제공자의 방침에 따르며 운영자를 거치지 않습니다.
        </p>
      </Section>

      <Section title="제4조 (권한의 동의와 철회)">
        <p>
          위치 권한은 이용자가 직접 허용해야 사용됩니다.{' '}
          <strong>단말기 설정에서 언제든 철회할 수 있습니다.</strong>
        </p>
        <ul style={legal.list}>
          <li>iOS — 설정 &gt; 개인정보 보호 및 보안 &gt; 위치 서비스 &gt; 모두립</li>
          <li>Android — 설정 &gt; 애플리케이션 &gt; 모두립 &gt; 권한 &gt; 위치</li>
        </ul>
        <p>
          철회하면 지도에 현재 위치가 표시되지 않고 발견 기록을 남길 수 없습니다. 도감 조회 등
          나머지 기능은 그대로 이용할 수 있습니다.
        </p>
        <p style={legal.note}>
          서비스는 <strong>앱을 사용하는 동안의 위치 권한만</strong> 요청하며, 백그라운드 위치
          권한은 요청하지 않습니다.
        </p>
      </Section>

      <Section title="제5조 (만 8세 이하 아동의 보호)">
        <p>
          서비스는 만 14세 미만의 가입을 받지 않으므로 만 8세 이하 아동의 위치정보를 별도로
          처리하지 않습니다.
        </p>
      </Section>

      <Section title="제6조 (문의)">
        <p>
          위치 이용과 관련한 문의는 {CONTACT} 로 받습니다. 개인정보 전반에 관한 사항은{' '}
          <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
            개인정보처리방침
          </Link>
          을 참고해 주십시오.
        </p>
      </Section>

      <p style={legal.footer}>시행일 · {EFFECTIVE}</p>
    </article>
  );
}
