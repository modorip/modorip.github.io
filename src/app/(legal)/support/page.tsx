import type { Metadata } from 'next';
import Link from 'next/link';
import { legal, Section, Table } from '@/components/legal';

export const metadata: Metadata = {
  title: '지원 · 모두립',
  description: '모두립 문의와 도움말',
};

/// App Store Connect 는 **지원 URL(Support URL)이 필수**다. 이 페이지가 그 자리다.
/// Google Play 는 처리방침 URL 이 필수이고 지원 연락처를 따로 받는다.
const CONTACT = 'gdpark.dev@gmail.com';

export default function SupportPage() {
  return (
    <article style={legal.article}>
      <h1 style={legal.h1}>지원</h1>
      <p style={legal.lead}>
        모두립을 쓰다 막히는 곳이 있으면 알려 주세요. 확인하고 답변드립니다.
      </p>

      <Section title="문의">
        <Table
          head={['구분', '내용']}
          rows={[
            ['이메일', CONTACT],
            ['운영', 'MILLO'],
          ]}
        />
        <p style={legal.note}>
          오류를 알려 주실 때 쓰시는 기기와 앱 버전을 함께 적어 주시면 원인을 찾기가
          훨씬 빠릅니다.
        </p>
      </Section>

      <Section title="자주 묻는 것">
        <h3 style={{ ...legal.h2, fontSize: 'var(--seed-font-size-t5)' }}>
          위치 권한은 왜 필요한가요
        </h3>
        <p>
          관광자원 근처에 도착했는지 확인하기 위해서입니다. <strong>위치 좌표는 단말기
          안에서만 쓰이고 서버로 전송되지 않습니다.</strong> 자세한 내용은{' '}
          <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
            개인정보처리방침
          </Link>
          에 적어 두었습니다.
        </p>

        <h3 style={{ ...legal.h2, fontSize: 'var(--seed-font-size-t5)' }}>
          다른 방법으로 로그인했더니 도감이 비어 있어요
        </h3>
        <p>
          로그인 수단마다 계정이 따로 만들어졌을 수 있습니다. 처음 가입하신 방법으로
          로그인하시면 기록이 그대로 있습니다. 프로필 화면의 <strong>연결된 계정</strong>에서
          로그인 수단을 미리 이어 두시면 어느 쪽으로 들어와도 같은 도감이 열립니다.
        </p>

        <h3 style={{ ...legal.h2, fontSize: 'var(--seed-font-size-t5)' }}>
          계정과 기록을 지우고 싶어요
        </h3>
        <p>
          앱의 <strong>프로필 → 계정 삭제</strong>에서 직접 하실 수 있습니다. 회원 정보와 사진은 지체 없이 파기되고, 노트는 익명으로 남습니다.
        </p>
      </Section>

      <Section title="문서">
        <ul style={legal.list}>
          <li>
            <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
              개인정보처리방침
            </Link>
          </li>
        </ul>
      </Section>
    </article>
  );
}
