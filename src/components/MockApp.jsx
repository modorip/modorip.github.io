'use client';
import { useState, useMemo } from 'react';
import * as D from '@/design/bundle';

// 인터랙티브 프로토타입: /app design 레퍼런스 app.jsx의 스택 네비게이션을 이식 (개발용 TweaksPanel 제외).
export default function MockApp() {
  const [user, setUser] = useState(null);
  const [stack, setStack] = useState([{ screen: 'onboarding' }]);
  const [overlay, setOverlay] = useState(null);
  const top = stack[stack.length - 1];

  const push = (screen, params = {}) => setStack((s) => [...s, { screen, ...params }]);
  const pop = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const switchTab = (tab) => setStack([{ screen: tab }]);
  const completeOnboarding = (name) => { setUser({ name }); setStack([{ screen: 'home' }]); };
  const onDiscoverSuccess = (placeId) => setOverlay({ type: 'success', placeId });

  const activeTab = useMemo(() => {
    for (let i = stack.length - 1; i >= 0; i--) {
      const s = stack[i].screen;
      if (['home', 'discover', 'dex', 'plaza', 'profile'].includes(s)) return s;
      if (s === 'dex-province' || s === 'dex-region' || s === 'dex-sigun-picker' || s === 'preset-create') return 'dex';
      if (s === 'titles') return 'profile';
      if (s === 'preset' || s === 'user-profile') return 'plaza';
    }
    return 'home';
  }, [stack]);

  const renderScreen = () => {
    switch (top.screen) {
      case 'onboarding': return <D.OnboardingScreen onComplete={completeOnboarding} />;
      case 'home': return <D.HomeScreen user={user} onNavigate={(s) => (s === 'titles' ? push('titles') : switchTab(s))} onOpenRegion={(id) => setStack([{ screen: 'dex' }, { screen: 'dex-province', regionId: id }])} onOpenPlace={(id) => push('place', { placeId: id })} />;
      case 'discover': return <D.DiscoverScreen onDiscoverSuccess={onDiscoverSuccess} />;
      case 'dex': return <D.DexNationScreen onOpenRegion={(id) => push('dex-province', { regionId: id })} />;
      case 'dex-province': return <D.DexProvinceScreen regionId={top.regionId} onBack={pop} onOpenSigun={(rid, sname) => push('dex-region', { regionId: rid, sigunName: sname })} onOpenPlace={(pid) => push('place', { placeId: pid })} onOpenPreset={(pid) => push('preset', { presetId: pid })} onOpenSigunPicker={(rid) => push('dex-sigun-picker', { regionId: rid })} />;
      case 'dex-sigun-picker': return <D.DexSigunPickerScreen regionId={top.regionId} onBack={pop} onOpenSigun={(rid, sname) => push('dex-region', { regionId: rid, sigunName: sname })} />;
      case 'dex-region': return <D.DexRegionScreen regionId={top.regionId} sigunName={top.sigunName} onBack={pop} onOpenPlace={(pid) => push('place', { placeId: pid })} onCreatePreset={(rid) => push('preset-create', { regionId: rid })} />;
      case 'preset-create': return <D.PresetCreateScreen regionId={top.regionId} onBack={pop} onCreated={(p) => setStack((s) => [...s.slice(0, -1), { screen: 'preset', presetId: p.id }])} />;
      case 'preset': return <D.PresetDetailScreen presetId={top.presetId} onBack={pop} onOpenPlace={(pid) => push('place', { placeId: pid })} onOpenUser={(uid) => push('user-profile', { userId: uid })} />;
      case 'user-profile': return <D.UserProfileScreen userId={top.userId} onBack={pop} onOpenPreset={(pid) => push('preset', { presetId: pid })} />;
      case 'place': return <D.PlaceDetailScreen placeId={top.placeId} onBack={pop} onDiscover={(pid) => onDiscoverSuccess(pid)} />;
      case 'plaza': return <D.PlazaScreen onOpenPlace={(pid) => push('place', { placeId: pid })} onOpenPreset={(pid) => push('preset', { presetId: pid })} onOpenUser={(uid) => push('user-profile', { userId: uid })} />;
      case 'titles': return <D.TitlesScreen onBack={pop} />;
      case 'profile': return <D.ProfileScreen user={user} onOpenTitles={() => push('titles')} onOpenPreset={(pid) => push('preset', { presetId: pid })} onReset={() => { setStack([{ screen: 'onboarding' }]); setUser(null); }} />;
      default: return <D.HomeScreen user={user} />;
    }
  };

  const hideTabBar = top.screen === 'onboarding';

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg, #f4f6f8)' }}>
      <div key={top.screen + (top.regionId || '') + (top.placeId || '')}
        className="scroll-hidden"
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {renderScreen()}
      </div>
      {!hideTabBar && <D.TabBar active={activeTab} onChange={switchTab} />}
      {overlay?.type === 'success' && (
        <D.DiscoverSuccessScreen placeId={overlay.placeId} onDone={() => {
          setOverlay(null);
          setStack([{ screen: 'dex' }, { screen: 'dex-region', regionId: D.PLACES.find((p) => p.id === overlay.placeId)?.region }]);
        }} />
      )}
    </div>
  );
}
