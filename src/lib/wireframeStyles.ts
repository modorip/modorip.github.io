// 와이어프레임 갤러리 스타일. 자체 CSS 파일 없이 SEED 토큰만 쓴다.
//
// buildGallery() 가 만드는 HTML 문자열은 가독성을 위해 class 를 그대로 두고,
// 여기서 한 번에 인라인 style 로 치환한다. 후손 선택자(.dark .box, .hero .box,
// .cell.locked .ci 등)를 살리려고 태그 스택을 들고 조상 클래스를 따라간다.
// 생성 HTML 은 기계 산출이라 태그가 항상 짝을 이루므로 이 수준의 파서로 충분하다.

import type { CSSProperties } from 'react';

/**
 * 이 모듈의 스타일 값은 대부분 `css()` 로 직렬화돼 HTML 문자열의 `style=` 속성에
 * 들어간다(React 의 style prop 이 아니다). 그래서 `React.CSSProperties` 가 아니라
 * 문자열/숫자 맵으로 둔다. 예외는 `WF_GALLERY` 하나로, React style prop 에 쓰인다.
 */
type StyleDecl = Record<string, string | number>;

/** `[클래스 조합, 스타일]` - 조합에 든 클래스를 모두 가진 요소에만 적용한다. */
type CompoundRule = readonly [combo: readonly string[], style: StyleDecl];

/** `[조상 클래스, 자신 클래스, 스타일]` - 후손 선택자 대체. */
type DescendantRule = readonly [ancestor: string, self: string, style: StyleDecl];

const T = {
  ink: 'var(--seed-color-fg-neutral)',
  fg: 'var(--seed-color-fg-neutral-muted)',
  sub: 'var(--seed-color-fg-neutral-subtle)',
  line: 'var(--seed-color-stroke-neutral-muted)',
  lineStrong: 'var(--seed-color-stroke-neutral-solid)',
  surface: 'var(--seed-color-bg-layer-default)',
  soft: 'var(--seed-color-bg-neutral-weak)',
  bg: 'var(--seed-color-bg-layer-basement)',
  blue: 'var(--seed-color-bg-brand-solid)',
  blueWeak: 'var(--seed-color-bg-brand-weak)',
  onBlue: 'var(--seed-color-palette-static-white)',   // bg.brandSolid 위 전경
  onBrandWeak: 'var(--seed-color-fg-brand-contrast)', // bg.brandWeak 위 전경
  success: 'var(--seed-color-bg-positive-solid)',
  white: 'var(--seed-color-palette-static-white)',
};

// 4계열 · 혼잡도 3색. SEED 에 이 축이 없어 팔레트 계열로 배정한다
// (자연=green · 유적=yellow · 문화=purple · 축제=red).
export const WF_CAT: readonly string[] = [
  'var(--seed-color-palette-green-700)',
  'var(--seed-color-palette-yellow-700)',
  'var(--seed-color-palette-purple-700)',
  'var(--seed-color-palette-red-700)',
];
export const WF_HEAT: Record<'calm' | 'mid' | 'busy', string> = {
  calm: 'var(--seed-color-palette-green-400)',
  mid: 'var(--seed-color-palette-yellow-300)',
  busy: 'var(--seed-color-palette-red-400)',
};
export const WF_SOFT = T.soft;
export const WF_SUB = T.sub;

// 갤러리 그리드. buildGallery() 가 <figure> 만 뱉으므로 감싸는 쪽에서 얹어야 한다.
// 이게 빠지면 13개 프레임이 전폭으로 세로 적층된다.
export const WF_GALLERY: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: 'var(--seed-dimension-x10) var(--seed-dimension-x6)',
  alignItems: 'start',
};

// 사진/지도 placeholder 의 빗금·방사형. 이게 없으면 그냥 회색 박스라 "자리표시자"로 안 읽힌다.
const HATCH = 'repeating-linear-gradient(135deg, var(--seed-color-bg-neutral-weak) 0 8px, var(--seed-color-palette-gray-300) 8px 16px)';
const HATCH_LIGHT = 'repeating-linear-gradient(135deg, var(--seed-color-palette-static-white-alpha-200) 0 8px, var(--seed-color-palette-static-white-alpha-100) 8px 16px)';
const MAP_BG = 'radial-gradient(circle at 50% 42%, var(--seed-color-bg-informative-weak) 0 30%, var(--seed-color-bg-layer-basement) 31% 100%)';

const dash = (s: string): string => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const css = (o: StyleDecl): string =>
  Object.entries(o).map(([k, v]) => `${dash(k)}:${v}`).join(';');

// 클래스 단독 규칙.
const BASE: Record<string, StyleDecl> = {
  gallery: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 'var(--seed-dimension-x10) var(--seed-dimension-x6)', alignItems: 'start' },
  device: { margin: 0, minWidth: 0 },

  cap: { margin: '0 0 var(--seed-dimension-x2_5)', display: 'flex', gap: 'var(--seed-dimension-x2)', alignItems: 'baseline' },
  no: { fontWeight: 'var(--seed-font-weight-bold)', color: T.white, background: T.ink, fontSize: 'var(--seed-font-size-t2)', fontVariantNumeric: 'tabular-nums', borderRadius: 'var(--seed-radius-r2)', padding: 'var(--seed-dimension-x0_5) var(--seed-dimension-x2)' },
  nm: { fontWeight: 'var(--seed-font-weight-bold)', color: T.ink, fontSize: 'var(--seed-font-size-t4)' },
  tb: { marginLeft: 'auto', fontSize: 'var(--seed-font-size-t1)', textTransform: 'uppercase', color: T.sub, border: `1px solid ${T.line}`, borderRadius: 'var(--seed-radius-full)', padding: 'var(--seed-dimension-x0_5) var(--seed-dimension-x2)' },

  screen: { position: 'relative', aspectRatio: '402 / 760', border: `2px solid ${T.ink}`, borderRadius: '34px' /* 기기 베젤 실측. SEED radius 최대가 r6=24 라 의도적 예외 */, background: T.bg, overflow: 'hidden', boxShadow: 'var(--seed-shadow-s3)' },
  notch: { position: 'absolute', top: '9px', left: '50%', transform: 'translateX(-50%)', width: '96px', height: '18px', background: T.ink, borderRadius: '0 0 var(--seed-radius-r3) var(--seed-radius-r3)', zIndex: 30 },
  scroll: { position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', padding: 'var(--seed-dimension-x9) var(--seed-dimension-x4) var(--seed-dimension-x16)', scrollbarWidth: 'thin' },

  b: { marginBottom: 'var(--seed-dimension-x2_5)' },
  box: { border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r3)', background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 'var(--seed-font-size-t2)', lineHeight: 1.4, color: T.sub, padding: 'var(--seed-dimension-x2_5)', whiteSpace: 'pre-line' },
  img: { border: `1.4px dashed ${T.lineStrong}`, background: HATCH, color: T.sub },

  row: { display: 'flex', gap: 'var(--seed-dimension-x2)' },
  bar: { display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2)', padding: 'var(--seed-dimension-x2_5) var(--seed-dimension-x3)', background: T.surface, border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r3)', fontWeight: 'var(--seed-font-weight-bold)', color: T.ink, fontSize: 'var(--seed-font-size-t4)' },
  icns: { marginLeft: 'auto', display: 'flex', gap: 'var(--seed-dimension-x1_5)' },
  ic: { width: '22px', height: '22px', border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r1_5)' },

  ttl: { fontSize: 'var(--seed-font-size-t8)', fontWeight: 'var(--seed-font-weight-bold)', color: T.ink, display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2)' },

  stat: { display: 'flex', gap: 'var(--seed-dimension-x2)' },
  v: { fontWeight: 'var(--seed-font-weight-bold)', color: T.ink, fontSize: 'var(--seed-font-size-t5)', fontVariantNumeric: 'tabular-nums' },
  k: { fontSize: 'var(--seed-font-size-t1)', color: T.sub, marginTop: 'var(--seed-dimension-x0_5)' },

  chips: { display: 'flex', gap: 'var(--seed-dimension-x1_5)', overflowX: 'auto', paddingBottom: 'var(--seed-dimension-x0_5)', scrollbarWidth: 'none' },
  chip: { flex: '0 0 auto', border: `1.3px solid ${T.line}`, borderRadius: 'var(--seed-radius-full)', padding: 'var(--seed-dimension-x1_5) var(--seed-dimension-x3)', fontSize: 'var(--seed-font-size-t1)', background: T.surface, color: T.fg },

  seg: { display: 'flex', background: T.soft, borderRadius: 'var(--seed-radius-r3)', padding: 'var(--seed-dimension-x1)', gap: 'var(--seed-dimension-x0_5)' },

  grid: { display: 'grid', gap: 'var(--seed-dimension-x2)' },
  cell: { border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r3)', overflow: 'hidden', background: T.surface },
  ci: { height: '52px', background: HATCH, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cph: { fontSize: 'var(--seed-font-size-t1)', color: T.sub },
  ct: { padding: 'var(--seed-dimension-x2) var(--seed-dimension-x2)', fontSize: 'var(--seed-font-size-t1)', color: T.fg },
  idx: { position: 'absolute', top: '5px', left: '6px', fontFamily: 'ui-monospace, monospace', fontSize: 'var(--seed-font-size-t1)', color: T.sub },
  bdg: { position: 'absolute', top: '5px', right: '6px', width: '15px', height: '15px', borderRadius: '50%', background: T.success, border: `1.5px solid ${T.white}` },

  cta: { borderRadius: 'var(--seed-radius-r3)', padding: 'var(--seed-dimension-x3_5)', textAlign: 'center', fontWeight: 'var(--seed-font-weight-bold)', fontSize: 'var(--seed-font-size-t3)' },
  cat: { display: 'flex', gap: 'var(--seed-dimension-x2)' },
  cb: { flex: 1, borderRadius: 'var(--seed-radius-r3)', padding: 'var(--seed-dimension-x3) var(--seed-dimension-x1)', textAlign: 'center', fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)' },

  pager: { display: 'flex', gap: 'var(--seed-dimension-x1)', justifyContent: 'center', padding: 'var(--seed-dimension-x1_5) 0' },
  d: { width: '7px', height: '7px', borderRadius: 'var(--seed-radius-r1)', background: 'var(--seed-color-bg-neutral-solid-muted)' },

  note: { fontSize: 'var(--seed-font-size-t1)', lineHeight: 1.5, color: T.onBrandWeak, background: T.blueWeak, borderLeft: `3px solid ${T.blue}`, borderRadius: '0 var(--seed-radius-r1_5) var(--seed-radius-r1_5) 0', padding: 'var(--seed-dimension-x2) var(--seed-dimension-x2_5)', margin: 'var(--seed-dimension-x2) 0 var(--seed-dimension-x3)' },
  sect: { fontSize: 'var(--seed-font-size-t4)', fontWeight: 'var(--seed-font-weight-bold)', color: T.ink, margin: 'var(--seed-dimension-x3_5) var(--seed-dimension-x0_5) var(--seed-dimension-x2)' },
  hint: { textAlign: 'center', fontSize: 'var(--seed-font-size-t1)', lineHeight: 1.5, color: T.sub, padding: 'var(--seed-dimension-x2) var(--seed-dimension-x1)' },

  listrow: { display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x2_5)', background: T.surface, border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r3)', padding: 'var(--seed-dimension-x2_5) var(--seed-dimension-x3)', marginBottom: 'var(--seed-dimension-x2)' },
  ld: { width: '28px', height: '28px', borderRadius: 'var(--seed-radius-r2)', background: T.soft, flex: '0 0 auto' },
  tx: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x0_5)' },
  av: { width: '36px', height: '36px', borderRadius: '50%', background: T.soft, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)', color: T.sub },

  prog: { height: '6px', borderRadius: 'var(--seed-radius-r0_5)', background: T.soft, overflow: 'hidden', marginTop: 'var(--seed-dimension-x2_5)' },

  tabbar: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '52px', background: T.surface, borderTop: `1.4px solid ${T.line}`, display: 'flex', zIndex: 20 },
  g: { width: '18px', height: '18px', border: `1.6px solid ${T.sub}`, borderRadius: 'var(--seed-radius-r1)' },

  hero: { borderRadius: 'var(--seed-radius-r4)', padding: 'var(--seed-dimension-x4_5) var(--seed-dimension-x4)', color: T.white, background: 'linear-gradient(135deg, var(--seed-color-palette-gray-900), var(--seed-color-palette-gray-1000))' },
  small: { fontSize: 'var(--seed-font-size-t1)', opacity: 0.85 },
  big: { fontSize: 'var(--seed-font-size-t7)', fontWeight: 'var(--seed-font-weight-bold)', marginTop: 'var(--seed-dimension-x0_5)' },

  map: { border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r4)', background: MAP_BG, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.sub, fontSize: 'var(--seed-font-size-t1)' },
  pin: { position: 'absolute', width: '17px', height: '17px', borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', border: `2px solid ${T.white}`, background: T.surface, boxShadow: 'var(--seed-shadow-s1)' },
  me: { position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', background: T.blue, border: `2.5px solid ${T.white}` },
  zoom: { position: 'absolute', right: '9px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 'var(--seed-dimension-x1_5)', alignItems: 'center' },
  zb: { width: '28px', height: '28px', border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r2)', background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'var(--seed-font-weight-bold)', color: T.ink },
  zp: { fontSize: 'var(--seed-font-size-t1)', background: T.ink, color: T.white, borderRadius: 'var(--seed-radius-full)', padding: 'var(--seed-dimension-x0_5) var(--seed-dimension-x2)' },

  sheet: { position: 'absolute', left: '9px', right: '9px', bottom: '9px', background: T.surface, border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r4)', padding: 'var(--seed-dimension-x3)', zIndex: 10, boxShadow: 'var(--seed-shadow-s2)' },

  card3d: { width: '172px', height: '244px', margin: 'var(--seed-dimension-x5) auto', borderRadius: 'var(--seed-radius-r4)', border: `2px solid ${T.line}`, background: 'linear-gradient(135deg, var(--seed-color-palette-purple-900), var(--seed-color-palette-red-1000))', position: 'relative', overflow: 'hidden', boxShadow: 'var(--seed-shadow-s3)' },
  ph: { position: 'absolute', inset: '11px 11px 72px', borderRadius: 'var(--seed-radius-r2)', background: HATCH_LIGHT },
  meta: { position: 'absolute', left: '13px', right: '13px', bottom: '13px', color: T.white },
};

// 복합 클래스 규칙 (`.a.b`) - 조합이 모두 걸린 요소에만 얹는다.
const COMPOUND: readonly CompoundRule[] = [
  [['chip', 'on'], { background: T.ink, color: T.white, borderColor: T.ink }],
  [['cta', 'p'], { background: T.blue, color: T.onBlue }],
  [['cta', 's'], { background: 'var(--seed-color-bg-positive-weak)', color: 'var(--seed-color-fg-positive)', border: '1.3px solid var(--seed-color-stroke-positive-weak)' }],
  [['cta', 'd'], { background: T.soft, color: T.sub, border: `1.3px dashed ${T.lineStrong}` }],
  [['d', 'on'], { width: '24px', background: T.blue }],
  [['prog', 'light'], { background: 'var(--seed-color-palette-static-white-alpha-300)' }],
  [['hero', 'tone'], { background: 'linear-gradient(135deg, var(--seed-color-palette-blue-700), var(--seed-color-palette-blue-1000))' }],
  [['pin', 'sel'], { background: T.white, borderColor: T.blue, transform: 'rotate(-45deg) scale(1.4)' }],
  [['cell', 'heat'], { borderColor: 'transparent', background: 'transparent' }],
  [['scroll', 'dark'], { background: 'var(--seed-color-palette-gray-1000)', paddingTop: 'var(--seed-dimension-x10)' }],
];

// 조상 클래스에 따른 후손 규칙: [조상, 자신, 스타일].
const DESCENDANT: readonly DescendantRule[] = [
  ['hdr', 'sub', { fontSize: 'var(--seed-font-size-t2)', color: T.sub }],
  ['ttl', 'tr', { marginLeft: 'auto', fontSize: 'var(--seed-font-size-t1)', fontWeight: 'var(--seed-font-weight-bold)', color: T.blue, border: `1.3px solid ${T.blue}`, borderRadius: 'var(--seed-radius-r2)', padding: 'var(--seed-dimension-x1) var(--seed-dimension-x2_5)' }],
  ['stat', 'c', { flex: 1, background: T.surface, border: `1.4px solid ${T.line}`, borderRadius: 'var(--seed-radius-r3)', padding: 'var(--seed-dimension-x3) var(--seed-dimension-x1_5)', textAlign: 'center' }],
  ['seg', 's', { flex: 1, textAlign: 'center', fontSize: 'var(--seed-font-size-t1)', padding: 'var(--seed-dimension-x2) var(--seed-dimension-x1)', borderRadius: 'var(--seed-radius-r2)', color: T.sub }],
  ['listrow', 't', { fontSize: 'var(--seed-font-size-t2)', fontWeight: 'var(--seed-font-weight-bold)', color: T.ink }],
  ['listrow', 's', { fontSize: 'var(--seed-font-size-t1)', color: T.sub }],
  ['listrow', 'tr', { fontSize: 'var(--seed-font-size-t1)', color: T.sub, flex: '0 0 auto' }],
  ['tabbar', 't', { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--seed-dimension-x0_5)', fontSize: 'var(--seed-font-size-t1)', color: T.sub }],
  ['heat', 'ci', { height: '22px', borderRadius: 'var(--seed-radius-r1_5)', background: T.soft }],
  ['locked', 'ci', { filter: 'grayscale(1)', opacity: 0.72 }],
  ['locked', 'ct', { color: T.sub }],
  ['hero', 'box', { background: 'var(--seed-color-palette-static-white-alpha-100)', borderColor: 'var(--seed-color-palette-static-white-alpha-200)', color: T.white }],
  ['hero', 'row', { marginTop: 'var(--seed-dimension-x3)' }],
  ['meta', 'nm', { fontWeight: 'var(--seed-font-weight-bold)', fontSize: 'var(--seed-font-size-t4)', color: T.white }],
  ['meta', 'sm', { fontSize: 'var(--seed-font-size-t1)', opacity: 0.85, marginTop: 'var(--seed-dimension-x0_5)' }],
  // 다크 오버레이 화면
  ['dark', 'box', { background: 'var(--seed-color-palette-static-white-alpha-100)', borderColor: 'var(--seed-color-palette-static-white-alpha-200)', color: 'var(--seed-color-palette-gray-300)' }],
  ['dark', 'bar', { background: 'var(--seed-color-palette-static-white-alpha-100)', borderColor: 'var(--seed-color-palette-static-white-alpha-200)', color: 'var(--seed-color-palette-gray-300)' }],
  ['dark', 'sect', { color: 'var(--seed-color-palette-gray-200)' }],
  ['dark', 'hint', { color: 'var(--seed-color-palette-gray-300)' }],
  ['dark', 'seg', { background: 'var(--seed-color-palette-static-white-alpha-100)' }],
  ['dark', 's', { color: 'var(--seed-color-palette-gray-400)' }],
];

// `on` 상태 후손 (.tabbar .t.on, .seg .s.on) - 복합+후손이 겹쳐 따로 둔다.
const ON: readonly DescendantRule[] = [
  ['tabbar', 't', { color: T.blue, fontWeight: 'var(--seed-font-weight-bold)' }],
  ['seg', 's', { background: T.surface, color: T.ink, fontWeight: 'var(--seed-font-weight-bold)' }],
];

const VOID = new Set(['br', 'img', 'input', 'hr']);

export function inlineStyles(html: string): string {
  // 조상 추적용 클래스 스택. 열린 태그마다 그 태그의 클래스 배열을 push 한다.
  const stack: string[][] = [];
  return html.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (tag: string, name: string, attrs: string) => {
    if (tag.startsWith('</')) { stack.pop(); return tag; }

    const m = attrs.match(/\sclass="([^"]*)"/);
    const own = m ? m[1].split(/\s+/).filter(Boolean) : [];
    const anc = stack.flat();

    if (!VOID.has(name.toLowerCase()) && !attrs.trimEnd().endsWith('/')) stack.push(own);
    if (!m) return tag;

    const style: StyleDecl = {};
    for (const c of own) Object.assign(style, BASE[c]);
    for (const [combo, s] of COMPOUND) if (combo.every((c) => own.includes(c))) Object.assign(style, s);
    for (const [a, self, s] of DESCENDANT) if (anc.includes(a) && own.includes(self)) Object.assign(style, s);
    if (own.includes('on')) for (const [a, self, s] of ON) if (anc.includes(a) && own.includes(self)) Object.assign(style, s);
    // .row 의 직계 자식은 균등 분할한다 (.wf .row > *).
    if (stack.length >= 2 && stack[stack.length - 2].includes('row')) {
      Object.assign(style, { flex: 1, marginBottom: 0, minWidth: 0 });
    }
    if (!Object.keys(style).length) return tag.replace(m[0], '');

    // 클래스 스타일을 앞에, 빌더가 심은 인라인 style 을 뒤에 둬서 인라인이 이긴다.
    const existing = attrs.match(/\sstyle="([^"]*)"/);
    const merged = css(style) + (existing ? ';' + existing[1] : '');
    let next = attrs.replace(m[0], '');
    next = existing ? next.replace(existing[0], ` style="${merged}"`) : `${next} style="${merged}"`;
    return `<${name}${next}>`;
  });
}
