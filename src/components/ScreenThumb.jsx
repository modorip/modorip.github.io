'use client';
import Link from 'next/link';
import ClientOnly from './ClientOnly';
import MockFrame from './MockFrame';
import ScreenHost from './ScreenHost';

export default function ScreenThumb({ id, scale = 0.24 }) {
  return (
    <Link href={'/mockup/' + id} title="풀스크린 목업 열기" style={{ display: 'block', borderRadius: 14, overflow: 'hidden' }}>
      <ClientOnly fallback={<div style={{ width: 402 * scale, height: 874 * scale, borderRadius: 14, background: '#e7eaee' }} />}>
        <MockFrame scale={scale}><ScreenHost id={id} /></MockFrame>
      </ClientOnly>
    </Link>
  );
}
