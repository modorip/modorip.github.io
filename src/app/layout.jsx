import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "모두립 · 목업",
  description: "와이어프레임 + 화면별 풀스크린 목업 (claude design /app 레퍼런스 기반)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/wanted/colors_and_type.css" />
      </head>
      <body>
        <div className="shell">
          <Sidebar />
          <div className="main">{children}</div>
        </div>
      </body>
    </html>
  );
}
