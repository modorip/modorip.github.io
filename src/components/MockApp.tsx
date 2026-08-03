'use client';
import { useState, useMemo, type ReactElement } from 'react';
import * as D from '@/design/bundle';
import type { ScreenTab } from '@/lib/screens';

/** 온보딩에서 입력받는 최소 사용자 정보. 서버 없이 메모리에만 둔다. */
interface User {
  name: string;
}

/**
 * 네비게이션 스택 한 칸. `screen` 외의 필드는 그 화면이 필요로 하는 파라미터라
 * 전부 선택이다(예: dex-region 은 regionId·sigunName 만 쓴다).
 */
interface StackEntry {
  screen: string;
  regionId?: string;
  sigunName?: string | null;
  placeId?: string;
  presetId?: string;
  userId?: string;
}

/** 스택 위에 겹쳐 뜨는 전체화면 오버레이. 현재는 발견 성공 하나뿐이다. */
interface Overlay {
  type: 'success';
  placeId: string;
}

/** PresetCreateScreen 이 등록 완료 시 돌려주는 값. */
interface CreatedPreset {
  id: string;
}

/** 하단 탭바에 대응하는 최상위 화면들. */
const ROOT_TABS: readonly ScreenTab[] = ['home', 'discover', 'dex', 'plaza', 'profile'];

// 인터랙티브 프로토타입: /app design 레퍼런스 app.jsx의 스택 네비게이션을 이식 (개발용 TweaksPanel 제외).
export default function MockApp() {
  const [user, setUser] = useState<User | null>(null);
  const [stack, setStack] = useState<StackEntry[]>([{ screen: 'onboarding' }]);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  // 후기 남기기(04B)는 발견 성공 오버레이 위에 한 겹 더 뜬다. 스택에 넣으면
  // 뒤의 오버레이가 가려지고 닫을 때 애니메이션이 처음부터 다시 돈다.
  const [reviewFor, setReviewFor] = useState<string | null>(null);
  const top = stack[stack.length - 1];

  const push = (screen: string, params: Omit<StackEntry, 'screen'> = {}) =>
    setStack((s) => [...s, { screen, ...params }]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const switchTab = (tab: string) => setStack([{ screen: tab }]);
  const completeOnboarding = (name: string) => { setUser({ name }); setStack([{ screen: 'home' }]); };
  const onDiscoverSuccess = (placeId: string) => setOverlay({ type: 'success', placeId });

  // 현재 스택을 위에서부터 훑어 활성 탭을 역추적한다. 상세 화면은 자신이 속한 탭으로 접힌다.
  const activeTab = useMemo<ScreenTab>(() => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const s = stack[i].screen;
      if ((ROOT_TABS as readonly string[]).includes(s)) return s as ScreenTab;
      if (s === 'dex-province' || s === 'dex-region' || s === 'dex-sigun-picker' || s === 'preset-create') return 'dex';
      if (s === 'titles') return 'profile';
      if (s === 'preset' || s === 'user-profile') return 'plaza';
    }
    return 'home';
  }, [stack]);

  /** 광역 도감으로 점프. 홈·타 유저 프로필에서 공통으로 쓴다(탭 스택을 dex 로 갈아끼운다). */
  const openRegion = (id: string) =>
    setStack([{ screen: 'dex' }, { screen: 'dex-province', regionId: id }]);

  // 홈은 `home` 케이스와 알 수 없는 화면의 fallback 두 곳에서 쓰이므로 한 번만 정의한다.
  // (핸들러를 빠뜨린 fallback 이 있었고 TS 전환에서 드러났다.)
  const renderHome = (): ReactElement => (
    <D.HomeScreen
      user={user}
      onNavigate={(s: string) => (s === 'titles' ? push('titles') : switchTab(s))}
      onOpenRegion={openRegion}
      onOpenPlace={(id: string) => push('place', { placeId: id })}
    />
  );

  const renderScreen = (): ReactElement => {
    switch (top.screen) {
      case 'onboarding': return <D.OnboardingScreen onComplete={completeOnboarding} />;
      case 'home': return renderHome();
      case 'discover': return <D.DiscoverScreen onDiscoverSuccess={onDiscoverSuccess} />;
      case 'dex': return <D.DexNationScreen onOpenRegion={(id: string) => push('dex-province', { regionId: id })} />;
      case 'dex-province': return <D.DexProvinceScreen regionId={top.regionId ?? 'jeju'} onBack={pop} onOpenSigun={(rid: string, sname: string | null) => push('dex-region', { regionId: rid, sigunName: sname })} onOpenPlace={(pid: string) => push('place', { placeId: pid })} onOpenPreset={(pid: string) => push('preset', { presetId: pid })} onOpenSigunPicker={(rid: string) => push('dex-sigun-picker', { regionId: rid })} />;
      case 'dex-sigun-picker': return <D.DexSigunPickerScreen regionId={top.regionId ?? 'jeju'} onBack={pop} onOpenSigun={(rid: string, sname: string) => push('dex-region', { regionId: rid, sigunName: sname })} />;
      case 'dex-region': return <D.DexRegionScreen regionId={top.regionId ?? 'jeju'} sigunName={top.sigunName} onBack={pop} onOpenPlace={(pid: string) => push('place', { placeId: pid })} onCreatePreset={(rid: string) => push('preset-create', { regionId: rid })} />;
      case 'preset-create': return <D.PresetCreateScreen regionId={top.regionId ?? 'jeju'} onBack={pop} onCreated={(p: CreatedPreset) => setStack((s) => [...s.slice(0, -1), { screen: 'preset', presetId: p.id }])} />;
      case 'preset': return <D.PresetDetailScreen presetId={top.presetId ?? 'p1'} onBack={pop} onOpenPlace={(pid: string) => push('place', { placeId: pid })} onOpenUser={(uid: string) => push('user-profile', { userId: uid })} />;
      case 'user-profile': return <D.UserProfileScreen userId={top.userId ?? 'u-hanradol'} onBack={pop} onOpenPreset={(pid: string) => push('preset', { presetId: pid })} onOpenRegion={openRegion} />;
      case 'place': return <D.PlaceDetailScreen placeId={top.placeId ?? 'seongsan'} onBack={pop} onDiscover={(pid: string) => onDiscoverSuccess(pid)} />;
      case 'plaza': return <D.PlazaScreen onOpenPlace={(pid: string) => push('place', { placeId: pid })} onOpenPreset={(pid: string) => push('preset', { presetId: pid })} onOpenUser={(uid: string) => push('user-profile', { userId: uid })} />;
      case 'titles': return <D.TitlesScreen onBack={pop} />;
      case 'profile': return <D.ProfileScreen user={user} onOpenTitles={() => push('titles')} onOpenPreset={(pid: string) => push('preset', { presetId: pid })} onReset={() => { setStack([{ screen: 'onboarding' }]); setUser(null); }} />;
      default: return renderHome();
    }
  };

  const hideTabBar = top.screen === 'onboarding';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--seed-color-bg-layer-default)' }}>
      <div key={top.screen + (top.regionId || '') + (top.placeId || '')}
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {renderScreen()}
      </div>
      {!hideTabBar && <D.TabBar active={activeTab} onChange={switchTab} />}
      {overlay?.type === 'success' && (
        <D.DiscoverSuccessScreen placeId={overlay.placeId}
          onWriteReview={setReviewFor}
          onDone={() => {
            setOverlay(null);
            const region = (D.PLACES as readonly { id: string; region: string }[])
              .find((p) => p.id === overlay.placeId)?.region;
            setStack([{ screen: 'dex' }, { screen: 'dex-region', regionId: region }]);
          }} />
      )}
      {reviewFor && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 300,
          background: 'var(--seed-color-palette-static-white)',
          overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          <D.ReviewCreateScreen placeId={reviewFor}
            onBack={() => setReviewFor(null)}
            onSubmit={() => setReviewFor(null)} />
        </div>
      )}
    </div>
  );
}
