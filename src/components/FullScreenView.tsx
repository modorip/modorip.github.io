'use client';
import { BackLink } from './doc';
import ClientOnly from './ClientOnly';
import MockFrame, { useFitScale } from './MockFrame';
import ScreenHost from './ScreenHost';
import MockApp from './MockApp';

/**
 * 두 모드는 필요한 값이 다르다. `screen` 은 어떤 화면을 그릴지 알아야 하고
 * `app` 은 스택을 스스로 관리하므로 id 가 없다. 판별 유니온으로 강제한다.
 */
export type FullScreenViewProps = { backHref?: string; title?: string } & (
  | { mode: 'app'; id?: never }
  | { mode: 'screen'; id: string }
);

export default function FullScreenView({ mode, id, backHref = '/', title = '' }: FullScreenViewProps) {
  const scale = useFitScale(120);
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--seed-dimension-x3)', padding: 'var(--seed-dimension-x3_5) var(--seed-dimension-x5)', borderBottom: '1px solid var(--seed-color-stroke-neutral-muted)', background: 'var(--seed-color-bg-layer-default)' }}>
        <BackLink href={backHref}>목록</BackLink>
        <span style={{ fontSize: 'var(--seed-font-size-t4)', fontWeight: 'var(--seed-font-weight-bold)', color: 'var(--seed-color-fg-neutral)' }}>{title}</span>
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--seed-dimension-x6)' }}>
        <ClientOnly fallback={<div style={{ color: 'var(--seed-color-fg-neutral-subtle)', fontSize: 'var(--seed-font-size-t3)' }}>화면 로딩 중…</div>}>
          <MockFrame scale={scale}>
            {mode === 'app' ? <MockApp /> : <ScreenHost id={id} />}
          </MockFrame>
        </ClientOnly>
      </div>
    </div>
  );
}
