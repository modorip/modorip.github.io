'use client';
import type { ReactElement } from 'react';
import * as D from '@/design/bundle';
import { byId } from '@/lib/screens';

const noop = () => {};

/** 정적 목업에 쓰는 샘플 파라미터. 실제 데이터가 아니라 화면을 채우기 위한 고정값이다. */
const S = { region: 'jeju', place: 'seongsan', undiscovered: 'saebyeol', preset: 'p1', user: 'u-hanradol' };

// 단일 화면을 기본 props로 렌더 (정적 목업용). 핸들러는 no-op, 파라미터는 샘플 데이터.
function renderScreen(id: string): ReactElement {
  switch (id) {
    case 'onboarding':       return <D.OnboardingScreen onComplete={noop} />;
    case 'home':             return <D.HomeScreen user={{ name: '탐험가' }} onNavigate={noop} onOpenRegion={noop} onOpenPlace={noop} />;
    case 'discover':         return <D.DiscoverScreen onDiscoverSuccess={noop} />;
    case 'discover-success': return (<><D.DiscoverScreen onDiscoverSuccess={noop} /><D.DiscoverSuccessScreen placeId={S.undiscovered} onDone={noop} onWriteReview={noop} /></>);
    case 'review-create':    return <D.ReviewCreateScreen placeId={S.undiscovered} onBack={noop} onSubmit={noop} />;
    case 'dex':              return <D.DexNationScreen onOpenRegion={noop} />;
    case 'dex-province':     return <D.DexProvinceScreen regionId={S.region} onBack={noop} onOpenSigun={noop} onOpenPlace={noop} onOpenPreset={noop} onOpenSigunPicker={noop} />;
    case 'dex-sigun-picker': return <D.DexSigunPickerScreen regionId={S.region} onBack={noop} onOpenSigun={noop} />;
    case 'dex-region':       return <D.DexRegionScreen regionId={S.region} onBack={noop} onOpenPlace={noop} onCreatePreset={noop} sigunName="제주시" />;
    case 'place':            return <D.PlaceDetailScreen placeId={S.place} onBack={noop} onDiscover={noop} />;
    case 'preset-create':    return <D.PresetCreateScreen regionId={S.region} onBack={noop} onCreated={noop} />;
    case 'preset':           return <D.PresetDetailScreen presetId={S.preset} onBack={noop} onOpenPlace={noop} onOpenUser={noop} />;
    case 'user-profile':     return <D.UserProfileScreen userId={S.user} onBack={noop} onOpenPreset={noop} onOpenRegion={noop} />;
    case 'plaza':            return <D.PlazaScreen onOpenPlace={noop} onOpenPreset={noop} onOpenUser={noop} />;
    case 'titles':           return <D.TitlesScreen onBack={noop} />;
    case 'profile':          return <D.ProfileScreen user={{ name: '탐험가' }} onOpenTitles={noop} onReset={noop} onOpenPreset={noop} />;
    // 알 수 없는 id 는 홈으로 떨어뜨린다. HomeScreen 은 핸들러 4개를 모두 요구한다.
    default:                 return <D.HomeScreen user={{ name: '탐험가' }} onNavigate={noop} onOpenRegion={noop} onOpenPlace={noop} />;
  }
}

export interface ScreenHostProps {
  /** screens.ts 의 화면 id. 라우트 파라미터에서 오므로 검증되지 않은 문자열이다. */
  id: string;
}

export default function ScreenHost({ id }: ScreenHostProps) {
  const meta = byId(id);
  const tab = meta?.tab;
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'var(--seed-color-bg-layer-default)' }}>
      <div
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {renderScreen(id)}
      </div>
      {tab && <D.TabBar active={tab} onChange={noop} />}
    </div>
  );
}
