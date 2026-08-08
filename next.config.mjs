/** @type {import('next').NextConfig} */

// GitHub Pages 는 정적 파일만 서빙한다. SSR·API 라우트를 쓰지 않으므로
// `output: 'export'` 로 굳혀 `out/` 을 그대로 올린다.
//
// ⚠️ **동적 라우트에는 `generateStaticParams` 가 있어야 한다.**
//    `/mockup/[id]` 가 이미 갖고 있다. 없으면 빌드가 실패한다.
//
// ⚠️ **조직 사이트(`<org>.github.io`)라 basePath 가 없다.** 사이트가 도메인
// 루트에 뜬다. 프로젝트 사이트였다면 `/<repo>` 가 필요했다.
//
// 사용자 지정 도메인(modorip.com)을 붙여도 루트라 그대로다.
// 값이 필요해지는 날을 대비해 주입 경로만 남긴다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  // `/privacy/index.html` 로 내보낸다. Pages 는 디렉터리 인덱스를 그대로 서빙하므로
  // 이게 없으면 `/privacy` 가 404 다.
  trailingSlash: true,
  // 정적 export 는 이미지 최적화 서버가 없다.
  images: { unoptimized: true },
};

export default nextConfig;
