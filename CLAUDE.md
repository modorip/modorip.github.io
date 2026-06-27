# mockup/ — 모두립 화면 목업 (Next.js)

15개 화면의 **와이어프레임**과 **풀스크린 목업**. seed-design 레퍼런스(`../seed-design/reference/app`)를 Next로 이식해 화면과 일치시킨다.

## 스택·실행·라우트
- Next.js 16(App Router) / React 19. 실행 `npm run dev` · 빌드 `npm run build`.
- `/wireframes`(저충실도) · `/mockup`·`/mockup/[id]`(풀스크린) · `/prototype`(인터랙티브) · `/design`(설계 뷰: DB설계·결정, seed-design 토큰 사용).

## 토큰·번들
- 디자인 토큰: `src/styles/tokens.css` = **seed-design 생성물**(직접 수정 금지, `../seed-design`에서 `npm run sync`). `globals.css`가 `@import`.
- `src/design/bundle.jsx` = 레퍼런스 이식 번들(생성물). 재생성법은 [README](./README.md).

## 규칙
- 웹 룰·공통·Git Flow·커밋: 루트 [CLAUDE.md](../CLAUDE.md).
- 휘발성·개인 설정은 `CLAUDE.local.md`(gitignore).
