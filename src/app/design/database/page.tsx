'use client';
import type { ComponentType, CSSProperties, ReactNode } from 'react';
import { Text, Badge, Divider, Icon } from '@seed-design/react';
import {
  IconArrowCounterclockwiseCircularLine,
  IconBarchartSquareLine,
  IconCircle4SquareLine,
  IconFlagLine,
  IconHashLine,
  IconKeyholeShieldLine,
  IconLocationpinLine,
  IconMapLine,
  IconPersonShieldLine,
  IconPictureLine,
  IconTrophyLine,
} from '@karrotmarket/react-monochrome-icon';

// 이름 → 컴포넌트. import * 는 아이콘 676개를 전부 번들에 넣으므로 금지.
const ROW_ICONS: Record<string, ComponentType> = { IconArrowCounterclockwiseCircularLine, IconBarchartSquareLine, IconCircle4SquareLine, IconFlagLine, IconHashLine, IconKeyholeShieldLine, IconLocationpinLine, IconMapLine, IconPersonShieldLine, IconPictureLine, IconTrophyLine };
import { Callout } from 'seed-design/ui/callout';
import Mermaid from '@/components/Mermaid';
import { doc, surface, withCodeStyle, BackLink } from '@/components/doc';
import { PRIN, CTX, RELS, MAP, EXT, MERMAID_SIMPLE, MERMAID_DETAIL, type RelationKind } from '@/lib/designData';

// SEED 컴포넌트를 먼저 쓴다. 타이포는 Text(textStyle), 안내 박스는 Callout,
// 관계 태그는 Badge. SEED 에 없는 것(문서용 table · 2단 패널)만 토큰으로 조립한다.

/** 목차 항목: `[앵커 id, 라벨]`. */
type TocEntry = readonly [id: string, label: string];

const TOC: readonly TocEntry[] = [
  ['principles', '설계 원칙'], ['contexts', '컨텍스트'], ['erd-simple', 'ERD 간소화'],
  ['erd-detail', 'ERD 상세'], ['rels', '연관관계'], ['events', '이벤트 흐름'], ['ext', '외부'], ['map', '매핑'],
];

const erd: CSSProperties = { ...surface, padding: 'var(--seed-dimension-x4_5)', overflow: 'auto', maxHeight: '80vh', display: 'flex', justifyContent: 'center' };

// 마지막 행의 구분선은 지운다 (CSS :last-child 를 못 쓰므로 인덱스로 판단).
const rowAt = (i: number, len: number, extra?: CSSProperties): CSSProperties =>
  ({ ...doc.row, ...(i === len - 1 ? { borderBottom: 'none' } : null), ...extra });

// 관계 종류 → SEED Badge tone. fk=물리 FK · ev=도메인 이벤트 · id=ID 참조
const REL_TONE: Record<RelationKind, 'informative' | 'brand' | 'neutral'> = { fk: 'informative', ev: 'brand', id: 'neutral' };
const REL_LABEL: Record<RelationKind, string> = { fk: 'FK', ev: 'EVENT', id: 'ID' };

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <Text as="h2" id={id} textStyle="t6Bold" color="fg.neutral" style={doc.h2}>{children}</Text>
);

// PRIN·EXT 의 첫 요소는 SEED 아이콘 컴포넌트명이다(구 이모지에서 교체).
// 이름을 못 찾으면 아무것도 그리지 않는다 - 이모지가 남아 있으면 여기서 티가 난다.
const RowIcon = ({ name }: { name: string }) => {
  const Glyph = ROW_ICONS[name];
  if (!Glyph) return <span style={doc.rowIcon} />;
  return (
    <span style={doc.rowIcon}>
      <Icon svg={<Glyph />} size="var(--seed-dimension-x5)" color="fg.neutralSubtle" />
    </span>
  );
};

export default function DatabaseDesign() {
  return (
    <main style={doc.main}>
      <Text textStyle="t2Bold" color="fg.brand" style={{ display: 'block' }}>모두립 · 백엔드</Text>
      <Text as="h1" textStyle="t11Bold" color="fg.neutral" style={doc.h1}>데이터베이스 설계</Text>
      <Text as="p" textStyle="t4Regular" color="fg.neutralSubtle" style={doc.sub}>
        Spring Boot + DDD(ADR-0009), PostgreSQL. 모듈러 모놀리스. 사용자 생성 데이터 중심, KTO 자원은 실시간 + read-through 캐시. 로그인 OAuth 전용(Apple·Google·Kakao).
      </Text>

      <nav style={doc.toc}>{TOC.map(([id, label]) => (<a key={id} href={'#' + id} style={doc.tocLink}>{label}</a>))}</nav>

      <H2 id="principles">설계 원칙</H2>
      <div style={{ ...surface, ...doc.panelGrid, padding: '6px 4px', marginTop: 'var(--seed-dimension-x4_5)' }}>{PRIN.map((p, i) => (
        <div style={rowAt(i, PRIN.length)} key={i}><RowIcon name={p[0]} /><span dangerouslySetInnerHTML={{ __html: withCodeStyle(p[1]) }} /></div>
      ))}</div>

      <H2 id="contexts">바운디드 컨텍스트</H2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--seed-dimension-x2)', margin: 'var(--seed-dimension-x3_5) 0' }}>{CTX.map((c, i) => (
        // SEED Badge 는 tone 이 enum 이라 컨텍스트 9색(식별색)을 표현할 수 없다.
        // 색이 곧 데이터라 Badge 대신 토큰 배경의 pill 로 둔다.
        <span key={i} style={{
          display: 'inline-flex', alignItems: 'center', gap: 'var(--seed-dimension-x1_5)',
          fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)',
          borderRadius: 'var(--seed-radius-full)', padding: 'var(--seed-dimension-x1) var(--seed-dimension-x3)',
          background: c[1], color: 'var(--seed-color-palette-static-white)',
        }}>{c[0]} <small style={{ fontWeight: 'var(--seed-font-weight-medium)', opacity: 0.85 }}>{c[2]}</small></span>
      ))}</div>

      <H2 id="erd-simple">연관관계 (간소화 · 카디널리티)</H2>
      <div style={erd}><Mermaid chart={MERMAID_SIMPLE} /></div>
      <div style={{ marginTop: 'var(--seed-dimension-x2_5)' }}>
        <Callout
          tone="informative"
          description="테이블 = 물리명 + 논리명. 화살표 라벨 = 카디널리티(1:N · N:1 · N:M · 1:1). N:M은 junction(preset_saves·feed_cheers·companion_members·wishlist). 점선 1:1 = 파생(도메인 이벤트). 다이어그램은 스크롤·확대할 수 있습니다."
        />
      </div>

      <H2 id="erd-detail">연관관계 도식 (상세)</H2>
      <div style={erd}><Mermaid chart={MERMAID_DETAIL} /></div>
      <div style={{ marginTop: 'var(--seed-dimension-x2_5)' }}>
        <Callout tone="informative" description="실선 = 물리 FK(1:N), 점선 = 컨텍스트 간 ID 참조. 크로우풋(○&lt;)=N, 막대(∥)=1." />
      </div>

      <H2 id="rels">연관관계 표</H2>
      <table style={doc.table}><thead><tr>{['관계', '경유', '종류', '카디널리티'].map((h) => <th key={h} style={doc.th}>{h}</th>)}</tr></thead><tbody>
        {RELS.map((r, i) => (
          <tr key={i} style={i % 2 ? doc.zebra : undefined}>
            <td style={doc.td}>{r[0]}</td>
            <td style={doc.td}><code style={doc.code}>{r[1]}</code></td>
            <td style={doc.td}>
              <Badge tone={REL_TONE[r[2]]} variant="weak" size="medium">{REL_LABEL[r[2]]}</Badge>
            </td>
            <td style={doc.td}>{r[3]}</td>
          </tr>
        ))}
      </tbody></table>

      <H2 id="events">도메인 이벤트 흐름</H2>
      <div style={{ ...surface, padding: 'var(--seed-dimension-x4) var(--seed-dimension-x4_5)' }}>
        <Text as="p" textStyle="t3Regular" color="fg.neutralMuted" style={{ margin: 0 }}>
          발견 1건(<code style={doc.code}>PlaceDiscovered</code>)이 핵심 도메인을 가로지른다(<code style={doc.code}>@TransactionalEventListener(AFTER_COMMIT)</code>):
        </Text>
        <Divider />
        <ul style={{ margin: 'var(--seed-dimension-x2_5) 0 0', paddingLeft: 'var(--seed-dimension-x5)' }}>
          <li><code style={doc.code}>PlaceDiscovered</code> → place_counters +1 · feed_items 생성 · account_titles 재산출 · abuse_flags 검사(공개 좌표)</li>
          <li><code style={doc.code}>TitleEarned</code> → feed_items.title_earned 표기 · <code style={doc.code}>ReportThresholdReached</code> → 콘텐츠 숨김+검토</li>
        </ul>
      </div>

      <H2 id="ext">외부 - DB에 저장하지 않는 것</H2>
      <div style={{
        ...surface, ...doc.panelGrid, padding: '4px', marginTop: 'var(--seed-dimension-x1_5)',
        background: 'var(--seed-color-bg-warning-weak)',
        borderColor: 'var(--seed-color-stroke-warning-weak)',
      }}>{EXT.map((e, i) => (<div style={rowAt(i, EXT.length, { borderBottomColor: 'var(--seed-color-stroke-warning-weak)' })} key={i}><RowIcon name={e[0]} /><span dangerouslySetInnerHTML={{ __html: withCodeStyle(e[1]) }} /></div>))}</div>

      <H2 id="map">애그리거트 ↔ 테이블 매핑</H2>
      <table style={doc.table}><thead><tr>{['애그리거트', '테이블', '컨텍스트'].map((h) => <th key={h} style={doc.th}>{h}</th>)}</tr></thead><tbody>
        {MAP.map((m, i) => (<tr key={i} style={i % 2 ? doc.zebra : undefined}><td style={doc.td}><code style={doc.code}>{m[0]}</code></td><td style={doc.td}><code style={doc.code}>{m[1]}</code></td><td style={doc.td}>{m[2]}</td></tr>))}
      </tbody></table>

      <Text as="p" textStyle="t2Regular" color="fg.neutralSubtle" style={{ ...doc.note, marginTop: 'var(--seed-dimension-x6)' }}>
        전체 컬럼·제약·DDL 원천: <code style={doc.code}>docs/02-아키텍처/데이터모델.md</code> · 도메인: <code style={doc.code}>docs/06-백엔드/도메인모델-DDD.md</code>
      </Text>
      <p style={{ marginTop: 'var(--seed-dimension-x4_5)' }}><BackLink href="/design">설계</BackLink></p>
    </main>
  );
}
