'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SCREENS } from '@/lib/screens';

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState({ mockup: true, design: true });
  const tg = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const is = (h) => path === h;
  const L = ({ href, children }) => (
    <Link href={href} className={'sb-link' + (is(href) ? ' active' : '')}>{children}</Link>
  );
  return (
    <aside className="sidebar">
      <Link href="/" className="sb-brand">모두립 <span>· Mockup</span></Link>
      <nav className="sb-nav">
        <L href="/wireframes">와이어프레임</L>
        <L href="/storyboard">스토리보드</L>

        <button className="sb-group" onClick={() => tg('mockup')}>
          <span>화면별 목업</span><span className="sb-caret">{open.mockup ? '▾' : '▸'}</span>
        </button>
        {open.mockup && (
          <div className="sb-sub">
            <L href="/mockup">갤러리</L>
            {SCREENS.map((s) => (
              <Link key={s.id} href={'/mockup/' + s.id} className={'sb-link' + (is('/mockup/' + s.id) ? ' active' : '')}>
                <span className="sb-no">{s.no}</span> {s.name}
              </Link>
            ))}
          </div>
        )}

        <L href="/prototype">프로토타입</L>

        <button className="sb-group" onClick={() => tg('design')}>
          <span>설계</span><span className="sb-caret">{open.design ? '▾' : '▸'}</span>
        </button>
        {open.design && (
          <div className="sb-sub">
            <L href="/design/database">데이터베이스</L>
            <L href="/design/decisions">결정 사항</L>
          </div>
        )}
      </nav>
    </aside>
  );
}
