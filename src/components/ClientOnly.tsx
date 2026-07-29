'use client';
import { useSyncExternalStore, type ReactNode } from 'react';

export interface ClientOnlyProps {
  children: ReactNode;
  /** 마운트 전(SSG HTML)에 그릴 자리표시자. 생략하면 아무것도 그리지 않는다. */
  fallback?: ReactNode;
}

const subscribeToHydration = () => () => {};

// localStorage/document를 쓰는 디자인 번들은 클라이언트에서만 렌더한다.
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  return hydrated ? children : fallback;
}
