// 법적 페이지(개인정보처리방침 · 지원)의 공용 스타일과 조각.
//
// [중요] **이 페이지들은 외부에 공개된다.** 스토어에 URL 을 제출해 심사자와 이용자가
// 본다. 그래서 목업 문서(`doc.tsx`)와 분리했다 - 목업은 내부 설계 자료이고
// 톤도 폭도 다르다.
//
// 자체 CSS 파일 없이 SEED 토큰만 참조한다.
import type { CSSProperties, ReactNode } from 'react';

export const legal = {
  article: {
    color: 'var(--seed-color-fg-neutral)',
    fontSize: 'var(--seed-font-size-t4)',
    lineHeight: 'var(--seed-line-height-t6)',
  },
  h1: {
    fontSize: 'var(--seed-font-size-t9)',
    lineHeight: 'var(--seed-line-height-t9)',
    fontWeight: 'var(--seed-font-weight-bold)',
    margin: '0 0 var(--seed-dimension-x3)',
  },
  h2: {
    fontSize: 'var(--seed-font-size-t6)',
    lineHeight: 'var(--seed-line-height-t6)',
    fontWeight: 'var(--seed-font-weight-bold)',
    margin: 'var(--seed-dimension-x9) 0 var(--seed-dimension-x3)',
  },
  lead: {
    color: 'var(--seed-color-fg-neutral-muted)',
    margin: '0 0 var(--seed-dimension-x2)',
  },
  meta: {
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t3)',
    margin: '0 0 var(--seed-dimension-x6)',
  },
  note: {
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t3)',
    lineHeight: 'var(--seed-line-height-t5)',
    margin: 'var(--seed-dimension-x3) 0 0',
  },
  list: {
    margin: 'var(--seed-dimension-x2) 0',
    paddingLeft: 'var(--seed-dimension-x5)',
    color: 'var(--seed-color-fg-neutral-muted)',
  },
  footer: {
    marginTop: 'var(--seed-dimension-x12)',
    paddingTop: 'var(--seed-dimension-x4)',
    borderTop: '1px solid var(--seed-color-stroke-neutral-muted)',
    color: 'var(--seed-color-fg-neutral-subtle)',
    fontSize: 'var(--seed-font-size-t3)',
  },
} satisfies Record<string, CSSProperties>;

/** 강조 절은 왼쪽에 브랜드 색 선을 둔다. 위치정보 절이 그 자리다. */
export function Section({
  title,
  emphasis = false,
  children,
}: {
  title: string;
  emphasis?: boolean;
  children: ReactNode;
}) {
  const body: CSSProperties = emphasis
    ? {
        borderLeft: '3px solid var(--seed-color-fg-brand)',
        paddingLeft: 'var(--seed-dimension-x4)',
      }
    : {};
  return (
    <section>
      <h2 style={legal.h2}>{title}</h2>
      <div style={{ ...body, color: 'var(--seed-color-fg-neutral-muted)' }}>{children}</div>
    </section>
  );
}

/** 처리방침은 항목·목적·기간을 표로 적는 것이 읽기 쉽다. */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  const cell: CSSProperties = {
    padding: 'var(--seed-dimension-x2_5) var(--seed-dimension-x3)',
    borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)',
    textAlign: 'left',
    verticalAlign: 'top',
  };
  return (
    <div style={{ overflowX: 'auto', margin: 'var(--seed-dimension-x3) 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--seed-font-size-t3)' }}>
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                style={{
                  ...cell,
                  color: 'var(--seed-color-fg-neutral)',
                  fontWeight: 'var(--seed-font-weight-bold)',
                  borderBottom: '2px solid var(--seed-color-stroke-neutral-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((c, i) => (
                <td key={`${row[0]}-${i}`} style={cell}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
