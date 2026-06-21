import "./globals.css";

export const metadata = {
  title: "모두립 · 목업",
  description: "와이어프레임 + 화면별 풀스크린 목업 (claude design /app 레퍼런스 기반)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
