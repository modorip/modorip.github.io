'use client';
import { useState, useEffect } from 'react';

// 402×874 (iPhone 14 Pro 비율) 디바이스 프레임. 디자인 레퍼런스 캔버스 크기와 일치.
export const CANVAS_W = 402;
export const CANVAS_H = 874;

export function useFitScale(pad = 48) {
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

export default function MockFrame({ children, scale = 1 }) {
  return (
    <div style={{ width: CANVAS_W * scale, height: CANVAS_H * scale }}>
      <div style={{
        width: CANVAS_W, height: CANVAS_H,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        position: 'relative', borderRadius: 52,
        background: '#1b1c1e', padding: 12,
        boxShadow: '0 24px 60px -22px rgba(0,0,0,.55), 0 0 0 1.5px rgba(0,0,0,.25)',
      }}>
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 116, height: 28, background: '#1b1c1e', borderRadius: 16, zIndex: 50,
        }} />
        <div style={{
          width: '100%', height: '100%', borderRadius: 42, overflow: 'hidden',
          position: 'relative', background: 'var(--color-bg, #f4f6f8)',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
