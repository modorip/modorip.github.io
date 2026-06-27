import './storyboard.css';
import StoryboardView from '@/components/StoryboardView';

export const metadata = { title: '모두립 · 스토리보드' };

export default function Storyboard() {
  return (
    <main className="stb">
      <header className="stb-top">
        <div className="kick">모두립 · 화면 설계</div>
        <h1>스토리보드</h1>
        <p className="lead">
          사용자 시나리오별 화면 흐름. 좌측 트리에서 단계를 고르면 우측에 화면이 <b>크게</b> 미리보기로
          뜨고, 그 단계의 <b>동작</b>과 <b>결과</b>를 확인할 수 있습니다.
        </p>
      </header>
      <StoryboardView />
    </main>
  );
}
