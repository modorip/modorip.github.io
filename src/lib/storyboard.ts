// 스토리보드: 사용자 시나리오별 화면 흐름. id는 screens.ts의 화면 인벤토리를 참조한다.
// 동작/결과는 docs/01-기능명세서/*.md에서 도출한 한글 흐름.
import type { ScreenId } from './screens';

export interface FlowStep {
  /** screens.ts 의 SCREENS 에 실재하는 화면 id 여야 한다(타입으로 강제). */
  id: ScreenId;
  /** 이 단계에서 사용자가 하는 조작 */
  action: string;
  /** 그 조작의 결과 · 다음 분기 */
  result: string;
}

export interface Flow {
  title: string;
  desc: string;
  steps: readonly FlowStep[];
}

export const FLOWS: readonly Flow[] = [
  {
    title: '첫 진입 · 온보딩',
    desc: '설치 후 첫 실행부터 홈 진입까지',
    steps: [
      {
        id: 'onboarding',
        action: '5장 페이저로 컨셉·발견 동작·칭호를 보고 마지막에 탐험가 이름 입력',
        result: '이름 미입력 시 "꼬마탐험가"로 저장 후 onComplete → 홈 진입',
      },
      {
        id: 'home',
        action: '인사·통계 스트립·오늘의 추천·아직 안 가본 지역 확인',
        result: '발견 / 도감 / 광장 / 나 4개 탭으로 분기 가능',
      },
    ],
  },
  {
    title: '발견 루프 (핵심)',
    desc: 'GPS로 자원을 발견해 도감을 채우는 핵심 경험',
    steps: [
      {
        id: 'home',
        action: '하단 탭바에서 발견 탭 선택',
        result: '근처 자원 GPS 지도로 전환',
      },
      {
        id: 'discover',
        action: '지도에서 자원 핀 탭 → 바텀 시트에서 "여기에서 발견하기"',
        result: '발견 성공 오버레이 트리거 (DiscoverSuccessScreen)',
      },
      {
        id: 'discover-success',
        action: '카드 회전·confetti 보상 확인, "후기 남기기" 탭',
        result: '도감 +1 · 칭호 점수 재계산 · 후기 작성 화면이 오버레이 위에 열림',
      },
      {
        id: 'review-create',
        action: '사진 한 장(장소당 1장)과 최대 300자 후기를 적고 등록',
        result: '등록 시 저장 후 발견 성공 화면으로 복귀(요약 표시) · 광장 피드 생성',
      },
      {
        id: 'dex',
        action: '"도감에서 확인" CTA로 이동',
        result: '해당 광역 채움률이 갱신되어 표시',
      },
    ],
  },
  {
    title: '도감 탐색',
    desc: '전국 → 지역 → 장소로 좁혀보는 컬렉션',
    steps: [
      {
        id: 'dex',
        action: '17광역 지도/카드에서 채움률을 훑고 관심 지역 선택',
        result: '선택 지역 카드 탭 → 지역 상세 진입',
      },
      {
        id: 'dex-region',
        action: '4계열 버튼·카테고리 칩·발견/미발견 필터로 자원 그리드 탐색',
        result: '자원 카드 선택 (미발견은 grayscale로 구분)',
      },
      {
        id: 'place',
        action: '헤로·30일 혼잡도·주변 정보 확인, 미발견이면 발견 동선 안내',
        result: '발견됨이면 초록 안내, 미발견이면 "여기로 떠나기" CTA',
      },
    ],
  },
  {
    title: '코스 · 프리셋',
    desc: '한 지역에서 발견한 자원을 코스로 묶어 공유',
    steps: [
      {
        id: 'dex-region',
        action: '2곳 이상 발견 시 노출되는 "프리셋 만들기" 버튼 탭',
        result: '해당 지역 프리셋 편집 화면 진입',
      },
      {
        id: 'preset-create',
        action: '코스 이름·태그 입력, 발견 자원을 골라 순서대로 구성',
        result: '"등록" → modorip:my-presets 에 저장',
      },
      {
        id: 'preset',
        action: '프리셋 상세에서 코스 순서·지도 경로 확인, 공유',
        result: '광장 인기 프리셋 노출 / 다른 사용자가 담기',
      },
    ],
  },
  {
    title: '광장 · 소셜',
    desc: '다른 탐험가의 발견·코스에서 동기를 얻는다',
    steps: [
      {
        id: 'plaza',
        action: '피드·인기 프리셋·리더보드·동행 탐색, 태그 검색·필터',
        result: '관심 프리셋 카드 또는 작성자 선택',
      },
      {
        id: 'preset',
        action: '담을 만한 프리셋 상세 열람',
        result: '"내 프리셋에 가져오기"로 담음 (modorip:saved-presets)',
      },
      {
        id: 'user-profile',
        action: '작성자 카드 탭 → 타 유저 도감·칭호·등록 프리셋 열람',
        result: '프리셋 담기 또는 그 유저 도감 지역으로 이동',
      },
    ],
  },
  {
    title: '성취 · 프로필',
    desc: '모은 도감과 칭호로 나의 성취를 확인한다',
    steps: [
      {
        id: 'profile',
        action: '다크 히어로의 활성 칭호·통계·4계열 진행·내 프리셋 확인',
        result: '빠른 링크에서 칭호 화면으로 이동',
      },
      {
        id: 'titles',
        action: '입문·광역·카테고리·표고·마스터 5티어 획득 현황 보기',
        result: '진행 중 칭호로 다음 목표 자원/지역 인지',
      },
    ],
  },
];
