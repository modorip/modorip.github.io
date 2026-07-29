import type { Metadata } from 'next';
import StoryboardView from '@/components/StoryboardView';
import { doc } from '@/components/doc';

export const metadata: Metadata = { title: '모두립 · 스토리보드' };

export default function Storyboard() {
  return (
    <main style={{ ...doc.main, maxWidth: 1320 }}>
      <header style={{ marginBottom: 'var(--seed-dimension-x6)' }}>
        <div style={doc.kicker}>모두립 · 화면 설계</div>
        <h1 style={doc.h1}>스토리보드</h1>
        <p style={{ ...doc.sub, maxWidth: 760 }}>
          사용자 시나리오별 화면 흐름. 좌측 트리에서 단계를 고르면 우측에 화면이 <b>크게</b> 미리보기로
          뜨고, 그 단계의 <b>동작</b>과 <b>결과</b>를 확인할 수 있습니다.
        </p>
      </header>
      <StoryboardView />
    </main>
  );
}
