// 문서형 페이지(설계·스토리보드·와이어프레임)의 공용 스타일과 이동 컴포넌트.
// 자체 CSS 파일 없이 SEED 토큰만 참조한다. SEED 는 문서 타이포그래피 프리셋을
// 배포하지 않으므로 font-size·line-height·spacing 토큰으로 직접 조립한다.
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from '@seed-design/react';
import { IconChevronLeftLine, IconChevronRightLine } from '@karrotmarket/react-monochrome-icon';

export const surface: CSSProperties = {
  background: 'var(--seed-color-bg-layer-default)',
  border: '1px solid var(--seed-color-stroke-neutral-muted)',
  borderRadius: 'var(--seed-radius-r4)',
};

// `satisfies` 로 둔다. 각 값은 CSSProperties 로 검사받으면서 키 목록은 그대로 남아,
// 없는 키를 참조하면(예전 `doc.pos`) 컴파일 단계에서 걸린다.
export const doc = {
  main: {
    maxWidth: 1180, margin: '0 auto',
    padding: 'var(--seed-dimension-x10) var(--seed-dimension-x6) 90px',
    color: 'var(--seed-color-fg-neutral-muted)',
  },
  kicker: {
    fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-brand)',
  },
  h1: {
    fontSize: 'var(--seed-font-size-t11)', lineHeight: 'var(--seed-line-height-t11)',
    fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)',
    margin: 'var(--seed-dimension-x1_5) 0 var(--seed-dimension-x2)',
  },
  h2: {
    fontSize: 'var(--seed-font-size-t6)', lineHeight: 'var(--seed-line-height-t6)',
    fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)',
    margin: 'var(--seed-dimension-x9) 0 var(--seed-dimension-x3_5)',
    paddingBottom: 'var(--seed-dimension-x2)',
    borderBottom: '2px solid var(--seed-color-stroke-neutral-muted)',
    scrollMarginTop: 64,
  },
  sub: {
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t4)', lineHeight: 'var(--seed-line-height-t5)',
    maxWidth: 840,
  },
  // 제목 옆 보조 표기(버전·순번). licenses 페이지가 `doc.pos` 를 참조하는데
  // 정의가 없어 스프레드가 조용히 무시되고 있었다. TS 전환에서 드러나 추가했다.
  pos: {
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t3)',
    fontWeight: 'var(--seed-font-weight-medium)',
  },
  note: {
    fontSize: 'var(--seed-font-size-t2)', lineHeight: 'var(--seed-line-height-t3)',
    color: 'var(--seed-color-fg-neutral-subtle)',
    margin: 'var(--seed-dimension-x2_5) 2px 0',
  },
  code: {
    fontFamily: 'ui-monospace, monospace',
    background: 'var(--seed-color-bg-neutral-weak)',
    borderRadius: 'var(--seed-radius-r1)',
    padding: 'var(--seed-dimension-x0_5) var(--seed-dimension-x1_5)', fontSize: 'var(--seed-font-size-t1)',
  },
  toc: {
    display: 'flex', flexWrap: 'wrap', gap: 'var(--seed-dimension-x2)',
    margin: 'var(--seed-dimension-x4_5) 0 0', position: 'sticky', top: 0, zIndex: 5,
    padding: 'var(--seed-dimension-x2_5) 0',
    background: 'var(--seed-color-bg-layer-basement)',
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
  },
  tocLink: {
    fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-medium)',
    color: 'var(--seed-color-fg-brand)',
    background: 'var(--seed-color-bg-layer-default)',
    border: '1px solid var(--seed-color-stroke-neutral-muted)',
    borderRadius: 'var(--seed-radius-full)',
    padding: 'var(--seed-dimension-x1) var(--seed-dimension-x3)',
    whiteSpace: 'nowrap',
  },
  table: {
    width: '100%', borderCollapse: 'collapse',
    fontSize: 'var(--seed-font-size-t2)',
    background: 'var(--seed-color-bg-layer-default)',
    border: '1px solid var(--seed-color-stroke-neutral-muted)',
    borderRadius: 'var(--seed-radius-r3)', overflow: 'hidden',
  },
  th: {
    textAlign: 'left', verticalAlign: 'top',
    padding: 'var(--seed-dimension-x2) var(--seed-dimension-x3_5)',
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
    fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)',
    color: 'var(--seed-color-fg-neutral-subtle)', textTransform: 'uppercase',
  },
  td: {
    textAlign: 'left', verticalAlign: 'top',
    padding: 'var(--seed-dimension-x2) var(--seed-dimension-x3_5)',
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
  },
  // 짝수 행 얼룩말. CSS :nth-child 를 못 쓰므로 인덱스로 준다.
  zebra: { background: 'var(--seed-color-bg-layer-basement)' },
  // 원칙/외부 패널. 옛 @media(min-width:880px) 2단을 auto-fit 으로 대체해
  // 미디어쿼리 없이 같은 반응형 거동을 낸다.
  panelGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' },
  row: {
    display: 'flex', gap: 'var(--seed-dimension-x3)',
    padding: 'var(--seed-dimension-x3) var(--seed-dimension-x4)',
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
  },
  rowIcon: { fontSize: 'var(--seed-font-size-t6)', flex: '0 0 auto', width: 'var(--seed-dimension-x6)', textAlign: 'center' },
  backLink: {
    color: 'var(--seed-color-fg-brand)',
    fontWeight: 'var(--seed-font-weight-bold)',
    fontSize: 'var(--seed-font-size-t3)',
  },
} satisfies Record<string, CSSProperties>;

// designData 의 PRIN·EXT 는 <b>·<code> 가 박힌 HTML 문자열이라 dangerouslySetInnerHTML 로
// 들어간다. JSX 밖이라 style prop 을 못 주므로 여기서 <code> 에 인라인 스타일을 심는다.
// (<b> 는 브라우저 기본 굵기로 충분하다.)
const cssText = (o: CSSProperties): string => Object.entries(o)
  .map(([k, v]) => `${k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}:${v}`)
  .join(';');
const CODE_STYLE = cssText(doc.code);
export const withCodeStyle = (html: string): string =>
  html.replace(/<code>/g, `<code style="${CODE_STYLE}">`);

export interface BackLinkProps {
  href: string;
  children: ReactNode;
}

// 방향 표시는 텍스트 화살표(← →) 대신 SEED 아이콘을 쓴다.
// Icon 은 Radix Slot 으로 svg 를 감싸므로 크기·색이 SEED 규격을 따른다.
export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link href={href} style={{ ...doc.backLink, display: 'inline-flex', alignItems: 'center', gap: 'var(--seed-dimension-x1)' }}>
      <Icon svg={<IconChevronLeftLine />} size="var(--seed-dimension-x4)" color="fg.brand" />
      {children}
    </Link>
  );
}

export interface CardLinkProps {
  href: string;
  title: string;
  description: string;
}

// 인덱스·설계 페이지의 이동 카드. 제목 끝의 → 를 SEED chevron 으로 바꾼다.
export function CardLink({ href, title, description }: CardLinkProps) {
  return (
    <Link href={href} style={{
      ...surface,
      display: 'block',
      padding: 'var(--seed-dimension-x5) var(--seed-dimension-x6)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x1_5)',
        fontSize: 'var(--seed-font-size-t6)', fontWeight: 'var(--seed-font-weight-bold)',
        color: 'var(--seed-color-fg-neutral)',
      }}>
        {title}
        <Icon svg={<IconChevronRightLine />} size="var(--seed-dimension-x5)" color="fg.neutralSubtle" />
      </div>
      <div style={{
        marginTop: 'var(--seed-dimension-x1_5)',
        fontSize: 'var(--seed-font-size-t3)', color: 'var(--seed-color-fg-neutral-subtle)',
      }}>{description}</div>
    </Link>
  );
}
