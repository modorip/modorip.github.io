import type { Metadata } from 'next';
import Link from 'next/link';
import { legal, Section } from '@/components/legal';

export const metadata: Metadata = {
  title: '이용약관 · 모두립',
  description: '모두립 서비스 이용약관',
};

/// [주의] **여기 적은 것은 전부 실제로 그렇게 운영돼야 한다.**
///
/// 지키지 못할 조항을 넣으면 약관 자체가 위험해진다. 결제·환불 조항이 없는
/// 이유가 그것이다 — 결제 기능이 없다.
const EFFECTIVE = '2026년 8월 24일';
const CONTACT = 'gdpark.dev@gmail.com';

export default function TermsPage() {
  return (
    <article style={legal.article}>
      <h1 style={legal.h1}>이용약관</h1>
      <p style={legal.lead}>
        이 약관은 MILLO(이하 &ldquo;운영자&rdquo;)가 제공하는 모두립(이하
        &ldquo;서비스&rdquo;)의 이용 조건을 정합니다.
      </p>
      <p style={legal.meta}>시행일 · {EFFECTIVE}</p>

      <Section title="제1조 (목적)">
        <p>
          이 약관은 서비스의 이용과 관련하여 운영자와 이용자의 권리·의무 및 책임 사항을
          규정하는 것을 목적으로 합니다.
        </p>
      </Section>

      <Section title="제2조 (서비스의 내용)">
        <p>서비스는 여행 기록을 돕는 도감형 애플리케이션이며 다음을 제공합니다.</p>
        <ul style={legal.list}>
          <li>관광자원 정보의 조회</li>
          <li>이용자가 방문한 관광자원의 기록과 도감 형태의 표시</li>
          <li>이용자가 발견 카드에 남긴 노트와 사진의 저장 및 다른 이용자에게의 표시</li>
          <li>기록에 따른 칭호 등 성취 표시</li>
        </ul>
        <p style={legal.note}>
          관광자원 정보는 공공데이터를 기반으로 하며 운영자가 그 내용을 직접 작성하거나
          검증하지 않습니다. 정확성·최신성은 원 제공기관의 자료에 따릅니다.
        </p>
      </Section>

      <Section title="제3조 (이용계약의 성립)">
        <p>
          이용자가 소셜 계정으로 로그인하고 이 약관에 동의하면 이용계약이 성립합니다.
          만 14세 미만은 서비스를 이용할 수 없습니다.
        </p>
      </Section>

      <Section title="제4조 (이용자의 의무)">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <ul style={legal.list}>
          <li>타인의 계정을 도용하거나 부정한 방법으로 접근하는 행위</li>
          <li>실제로 방문하지 않은 장소를 기록하기 위해 위치를 조작하는 행위</li>
          <li>타인을 비방하거나 권리를 침해하는 내용을 게시하는 행위</li>
          <li>서비스의 정상적인 운영을 방해하는 행위</li>
        </ul>
      </Section>

      <Section title="제5조 (게시물의 권리와 관리)">
        <p>
          이용자가 발견 카드에 남긴 노트와 사진의 <strong>저작권은 이용자에게 있습니다.</strong> 운영자는
          서비스를 제공하고 표시하는 데 필요한 범위에서만 이를 이용합니다.
        </p>
        <p>
          <strong>노트와 사진은 기본적으로 다른 이용자에게 공개되며, 카드마다
          &ldquo;나만 보기&rdquo;를 고를 수 있습니다.</strong> 보이는 곳은 그 관광자원의
          상세 화면과 광장이며, 공개 범위와 삭제 방법은{' '}
          <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
            개인정보처리방침
          </Link>
          에 적어 두었습니다.
        </p>
        <p>다만 제4조를 위반한 게시물은 운영자가 삭제하거나 노출을 제한할 수 있습니다.</p>
        <p>
          이용자는 다른 이용자의 게시물을 <strong>신고</strong>할 수 있고, 특정 이용자의
          게시물을 <strong>자신의 화면에서 숨길</strong> 수 있습니다. 신고가 일정 건수 이상
          쌓이면 운영자 확인 전에 노출이 먼저 제한될 수 있으며, 확인 결과 문제가 없으면
          다시 표시합니다.
        </p>
      </Section>

      <Section title="제6조 (서비스의 변경과 중단)">
        <p>
          운영자는 서비스의 내용을 변경하거나 중단할 수 있습니다. 이용자에게 불리한 변경은
          시행 30일 전에 공지합니다.
        </p>
        <p style={legal.note}>
          점검·장애·천재지변 등 부득이한 사유로 서비스가 일시 중단될 수 있습니다.
        </p>
      </Section>

      <Section title="제7조 (이용계약의 해지)">
        <p>
          이용자는 언제든지 서비스 안의 <strong>계정 삭제</strong>로 이용계약을 해지할 수
          있습니다.
        </p>
        <p>
          회원 정보와 남기신 사진은 지체 없이 파기합니다. <strong>노트는 다른 이용자를
          위해 남으며 작성자는 익명으로 표시됩니다.</strong> 자세한 내용은{' '}
          <Link href="/privacy" style={{ color: 'var(--seed-color-fg-brand)' }}>
            개인정보처리방침
          </Link>
          에 적어 두었습니다.
        </p>
        <p style={legal.note}>[중요] 해지하면 되돌릴 수 없습니다.</p>
      </Section>

      <Section title="제8조 (책임의 한계)" emphasis>
        <p>
          운영자는 무료로 제공되는 서비스와 관련하여 관련 법령이 허용하는 범위에서 책임을
          집니다. 이용자가 게시한 내용이나 이용자 간 분쟁에 대해서는 책임지지 않습니다.
        </p>
        <p>
          <strong>서비스를 이용하는 동안의 안전은 이용자에게 있습니다.</strong> 이동 중에는
          주변을 살피고 교통법규를 지켜 주십시오. <strong>운전 중에는 서비스를 이용하지
          마십시오.</strong>
        </p>
      </Section>

      <Section title="제9조 (약관의 변경)">
        <p>
          이 약관을 변경할 때에는 시행일 최소 7일 전에 공지합니다. 이용자에게 불리한 변경은
          30일 전에 공지하며, 공지 후 이용을 계속하면 변경에 동의한 것으로 봅니다.
        </p>
      </Section>

      <Section title="제10조 (문의와 준거법)">
        <p>문의는 {CONTACT} 로 받습니다.</p>
        <p>
          이 약관은 대한민국 법령에 따라 해석하며, 분쟁은 민사소송법이 정하는 법원을 관할로
          합니다.
        </p>
      </Section>

      <p style={legal.footer}>시행일 · {EFFECTIVE}</p>
    </article>
  );
}
