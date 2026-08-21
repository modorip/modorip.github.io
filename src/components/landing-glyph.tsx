// 랜딩 삽화가 쓰는 아이콘. `currentColor` 라 부모의 `color` 가 색을 정한다.
//
// SEED 는 아이콘을 별도 패키지(@karrotmarket/react-*-icon)로 배포하지만 여기서는
// 쓰지 않는다. 이 저장소는 공개 정적 사이트라 귀속 고지를 둘 자리가 없다.
import type { ReactNode } from 'react';

const PATHS = {
  star: <path d="M12 2l-4 6H2l5 5-2 7 7-4 7 4-2-7 5-5h-6l-4-6z" fill="currentColor" />,
  leaf: <path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10zM2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  landmark: <path d="M3 22h18M4 11h16M12 3l8 5H4l8-5zM6 11v9M10 11v9M14 11v9M18 11v9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  frame: <path d="M4 5h16v14H4zM8 19l4-6 3 4 2-2 3 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  ticket: <><circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.2 6.2l2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /></>,
  pin: <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 10h.01" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  cards: <path d="M4 7h16v12H4zM4 11h16M8 4h12v3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  trophy: <path d="M7 4h10v5a5 5 0 01-10 0V4zM4 5h3M17 5h3M9 20h6M12 14v6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  route: <path d="M4 6l8-3 8 3v9l-8 3-8-3V6zM4 6l8 3 8-3M12 9v9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  lock: <path d="M6 11h12v9H6zM9 11V8a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  doc: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  checkCircle: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" /><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
  play: <path d="M7 4l11 8-11 8V4z" fill="currentColor" />,
  apple: <path d="M17.05 12.94c-.03-2.6 2.12-3.85 2.22-3.91a4.8 4.8 0 00-3.78-2.04c-1.6-.16-3.13.94-3.94.94-.82 0-2.07-.92-3.4-.9a5.02 5.02 0 00-4.23 2.57c-1.82 3.15-.47 7.82 1.3 10.38.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.8-.84 3.38-.84 1.58 0 2.03.84 3.4.81 1.4-.02 2.29-1.27 3.14-2.53a10.5 10.5 0 001.42-2.92 4.6 4.6 0 01-2.75-4.18zM14.6 5.36A4.55 4.55 0 0015.66 2a4.66 4.66 0 00-3.01 1.56 4.34 4.34 0 00-1.1 2.88c1.24.1 2.51-.58 3.05-1.08z" fill="currentColor" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  chevronRight: <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  pencil: <path d="M4 20h4L20 8l-4-4L4 16v4z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  home: <path d="M4 11l8-7 8 7v9H4zM10 20v-5h4v5" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  compass: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" /><path d="M15 9l-2 4-4 2 2-4z" fill="currentColor" /></>,
  book: <path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round" />,
  people: <><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.7" fill="none" /><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5M16 7.5a3 3 0 010 5.6M18 20c0-2.6-1-4-2.5-4.6" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" /></>,
  person: <><circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" fill="none" /><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" /></>,
  plus: <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />,
  check: <path d="M6 12.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
  arrow: <path d="M4 12h13M14 8l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />,
} satisfies Record<string, ReactNode>;

export type GlyphName = keyof typeof PATHS;

export function Glyph({ name, size = 24 }: { name: GlyphName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
