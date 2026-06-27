'use client';
import * as D from '@/design/bundle';
import { byId } from '@/lib/screens';

const noop = () => {};
const S = { region: 'jeju', place: 'seongsan', undiscovered: 'saebyeol', preset: 'p1', user: 'u-hanradol' };

// 단일 화면을 기본 props로 렌더 (정적 목업용). 핸들러는 no-op, 파라미터는 샘플 데이터.
function renderScreen(id) {
  switch (id) {
    case 'onboarding':       return <D.OnboardingScreen onComplete={noop} />;
    case 'home':             return <D.HomeScreen user={{ name: '탐험가' }} onNavigate={noop} onOpenRegion={noop} onOpenPlace={noop} />;
    case 'discover':         return <D.DiscoverScreen onDiscoverSuccess={noop} />;
    case 'discover-success': return (<><D.DiscoverScreen onDiscoverSuccess={noop} /><D.DiscoverSuccessScreen placeId={S.undiscovered} onDone={noop} /></>);
    case 'dex':              return <D.DexNationScreen onOpenRegion={noop} />;
    case 'dex-province':     return <D.DexProvinceScreen regionId={S.region} onBack={noop} onOpenSigun={noop} onOpenPlace={noop} onOpenPreset={noop} />;
    case 'dex-region':       return <D.DexRegionScreen regionId={S.region} onBack={noop} onOpenPlace={noop} onCreatePreset={noop} sigunName="제주시" />;
    case 'place':            return <D.PlaceDetailScreen placeId={S.place} onBack={noop} onDiscover={noop} />;
    case 'preset-create':    return <D.PresetCreateScreen regionId={S.region} onBack={noop} onCreated={noop} />;
    case 'preset':           return <D.PresetDetailScreen presetId={S.preset} onBack={noop} onOpenPlace={noop} onOpenUser={noop} />;
    case 'user-profile':     return <D.UserProfileScreen userId={S.user} onBack={noop} onOpenPreset={noop} onOpenRegion={noop} />;
    case 'plaza':            return <D.PlazaScreen onOpenPlace={noop} onOpenPreset={noop} onOpenUser={noop} />;
    case 'titles':           return <D.TitlesScreen onBack={noop} />;
    case 'profile':          return <D.ProfileScreen user={{ name: '탐험가' }} onOpenTitles={noop} onReset={noop} onOpenPreset={noop} />;
    default:                 return <D.HomeScreen user={{ name: '탐험가' }} />;
  }
}

export default function ScreenHost({ id }) {
  const meta = byId(id);
  const tab = meta?.tab;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--color-bg, #f4f6f8)' }}>
      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        {renderScreen(id)}
      </div>
      {tab && <D.TabBar active={tab} onChange={noop} />}
    </div>
  );
}
