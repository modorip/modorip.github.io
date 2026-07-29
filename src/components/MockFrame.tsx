'use client';
import { useState, useEffect, type ReactNode } from 'react';

// 402×874 (iPhone 14 Pro 비율) 디바이스 프레임. 디자인 레퍼런스 캔버스 크기와 일치.
export const CANVAS_W = 402;
export const CANVAS_H = 874;

/** 프레임이 뷰포트에 들어가도록 축소 배율을 계산한다. 확대는 하지 않는다(상한 1). */
export function useFitScale(pad = 48): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const s = Math.min((window.innerHeight - pad) / CANVAS_H, (window.innerWidth - pad) / CANVAS_W, 1);
      setScale(Math.max(0.3, s));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [pad]);
  return scale;
}

export interface MockFrameProps {
  children: ReactNode;
  /** 1 = 실물 크기. useFitScale() 값이나 썸네일용 고정 배율을 넘긴다. */
  scale?: number;
}

export default function MockFrame({ children, scale = 1 }: MockFrameProps) {
  return (
    <div style={{ width: CANVAS_W * scale, height: CANVAS_H * scale }}>
      <div style={{
        width: CANVAS_W, height: CANVAS_H,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        position: 'relative', borderRadius: 52,
        background: 'var(--seed-color-palette-gray-1000)', padding: 'var(--seed-dimension-x3)',
        boxShadow: 'var(--seed-shadow-s3)',
      }}>
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 'var(--seed-dimension-x7)', background: 'var(--seed-color-palette-gray-1000)', borderRadius: 'var(--seed-radius-r4)', zIndex: 50,
        }} />
        <div style={{
          width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden',
          position: 'relative', background: 'var(--seed-color-bg-layer-default)',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
