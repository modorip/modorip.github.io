/** @type {import('next').NextConfig} */

// GitHub Pages 는 정적 파일만 서빙한다. SSR·API 라우트를 쓰지 않으므로
// `output: 'export'` 로 굳혀 `out/` 을 그대로 올린다.
//
// ⚠️ **동적 라우트에는 `generateStaticParams` 가 있어야 한다.**
//    `/mockup/[id]` 가 이미 갖고 있다. 없으면 빌드가 실패한다.
//
// basePath 는 배포 위치에 따라 다르다.
//   프로젝트 사이트  https://<org>.github.io/<repo>/  → '/<repo>'
//   사용자 지정 도메인 https://modorip.com/            → ''
// 값을 소스에 박지 않고 빌드할 때 주입한다. 도메인을 붙이면 워크플로에서
// 이 값을 지우면 되고 코드는 그대로다.
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
