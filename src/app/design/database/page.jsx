'use client';
import '../design.css';
import Link from 'next/link';
import Mermaid from '@/components/Mermaid';
import { PRIN, CTX, RELS, MAP, EXT, MERMAID_SIMPLE, MERMAID_DETAIL } from '@/lib/designData';

const TOC = [
  ['principles', '설계 원칙'], ['contexts', '컨텍스트'], ['erd-simple', 'ERD 간소화'],
  ['erd-detail', 'ERD 상세'], ['rels', '연관관계'], ['events', '이벤트 흐름'], ['ext', '외부'], ['map', '매핑'],
];

export default function DatabaseDesign() {
  return (
    <main className="dz">
      <div className="kicker">모두립 · 백엔드</div>
      <h1>데이터베이스 설계</h1>
      <p className="sub">Spring Boot + DDD(ADR-0009), PostgreSQL. 모듈러 모놀리스. 사용자 생성 데이터 중심, KTO 자원은 실시간 + read-through 캐시. 로그인 OAuth 전용(Apple·Google·Kakao).</p>

      <nav className="toc">{TOC.map(([id, label]) => (<a key={id} href={'#' + id}>{label}</a>))}</nav>

      <h2 id="principles">설계 원칙</h2>
      <div className="principles">{PRIN.map((p, i) => (
        <div className="prow" key={i}><span className="pic">{p[0]}</span><span dangerouslySetInnerHTML={{ __html: p[1] }} /></div>
      ))}</div>

      <h2 id="contexts">바운디드 컨텍스트</h2>
      <div className="ctxs">{CTX.map((c, i) => (
        <span className="ctx" key={i} style={{ background: c[1] }}>{c[0]} <small>{c[2]}</small></span>
      ))}</div>

      <h2 id="erd-simple">연관관계 (간소화 · 카디널리티)</h2>
      <div className="erd"><Mermaid chart={MERMAID_SIMPLE} /></div>
      <p className="erdnote">테이블 = 물리명 + 논리명. 화살표 라벨 = 카디널리티(1:N · N:1 · N:M · 1:1). N:M은 junction(preset_saves·feed_cheers·companion_members·wishlist). 점선 1:1 = 파생(도메인 이벤트). · 다이어그램은 스크롤/확대 가능.</p>

      <h2 id="erd-detail">연관관계 도식 (상세)</h2>
      <div className="erd"><Mermaid chart={MERMAID_DETAIL} /></div>
      <p className="erdnote">실선 = 물리 FK(1:N), 점선 = 컨텍스트 간 ID 참조. 크로우풋(○&lt;)=N, 막대(∥)=1.</p>

      <h2 id="rels">연관관계 표</h2>
      <table><thead><tr><th>관계</th><th>경유</th><th>종류</th><th>카디널리티</th></tr></thead><tbody>
        {RELS.map((r, i) => (<tr key={i}><td>{r[0]}</td><td><code>{r[1]}</code></td><td><span className={'rtag ' + r[2]}>{r[2] === 'fk' ? 'FK' : r[2] === 'ev' ? 'EVENT' : 'ID'}</span></td><td>{r[3]}</td></tr>))}
      </tbody></table>

      <h2 id="events">도메인 이벤트 흐름</h2>
      <div className="evflow">발견 1건(<code>PlaceDiscovered</code>)이 핵심 도메인을 가로지른다(<code>@TransactionalEventListener(AFTER_COMMIT)</code>):
        <ul style={{ margin: '10px 0 0', paddingLeft: 20 }}>
          <li><code>PlaceDiscovered</code> → place_counters +1 · feed_items 생성 · account_titles 재산출 · abuse_flags 검사(공개 좌표)</li>
          <li><code>TitleEarned</code> → feed_items.title_earned 표기 · <code>ReportThresholdReached</code> → 콘텐츠 숨김+검토</li>
        </ul>
      </div>

      <h2 id="ext">외부 — DB에 저장하지 않는 것</h2>
      <div className="ext">{EXT.map((e, i) => (<div className="prow" key={i}><span className="pic">{e[0]}</span><span dangerouslySetInnerHTML={{ __html: e[1] }} /></div>))}</div>

      <h2 id="map">애그리거트 ↔ 테이블 매핑</h2>
      <table><thead><tr><th>애그리거트</th><th>테이블</th><th>컨텍스트</th></tr></thead><tbody>
        {MAP.map((m, i) => (<tr key={i}><td><code>{m[0]}</code></td><td><code>{m[1]}</code></td><td>{m[2]}</td></tr>))}
      </tbody></table>

      <p className="erdnote" style={{ marginTop: 24 }}>전체 컬럼·제약·DDL 원천: <code>docs/02-아키텍처/데이터모델.md</code> · 도메인: <code>docs/06-백엔드/도메인모델-DDD.md</code></p>
      <p style={{ marginTop: 18 }}><Link href="/design" style={{ color: '#0066ff', fontWeight: 700, fontSize: 13 }}>← 설계</Link></p>
    </main>
  );
}
