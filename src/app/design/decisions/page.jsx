'use client';
import '../design.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DECISIONS } from '@/lib/designData';

const KEY = 'modorip-decisions';
export default function Decisions() {
  const flat = DECISIONS.flatMap((g) => g.items);
  const [st, setSt] = useState({});
  useEffect(() => { try { setSt(JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {} }, []);
  const isDone = (it) => (it.id in st && 'done' in (st[it.id] || {})) ? st[it.id].done : it.done;
  const save = (next) => { setSt(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) {} };
  const toggle = (it) => save({ ...st, [it.id]: { ...(st[it.id] || {}), done: !isDone(it) } });
  const memo = (it, v) => save({ ...st, [it.id]: { ...(st[it.id] || {}), memo: v } });
  const done = flat.filter(isDone).length;
  return (
    <main className="dz">
      <div className="kicker">모두립 · 팀 MILLO · 2026 공모전</div>
      <h1>결정 사항</h1>
      <p className="sub">설계·공모전 결정 체크리스트. 체크·메모는 브라우저에 저장. 원천: <code>docs/00-제품/결정사항.md</code></p>
      <div className="prog"><div className="bar"><i style={{ width: (flat.length ? done / flat.length * 100 : 0) + '%' }} /></div><b style={{ whiteSpace: 'nowrap' }}>{done} / {flat.length} 결정</b></div>
      {DECISIONS.map((g, gi) => (
        <div key={gi}>
          <h2>{g.g}</h2>
          {g.items.map((it) => (
            <div className={'dcard ' + it.p} key={it.id}>
              <div className="dhead">
                <input type="checkbox" className="chk" checked={isDone(it)} onChange={() => toggle(it)} />
                <span className="dtitle">{it.id}. {it.t}</span>
              </div>
              <div className={'answer ' + (it.done ? '' : 'pending')}>{it.done ? '✅ 결정: ' : '🟠 '}{it.a}</div>
              <div className="memo"><textarea placeholder="내 메모…" value={(st[it.id] && st[it.id].memo) || ''} onChange={(e) => memo(it, e.target.value)} /></div>
            </div>
          ))}
        </div>
      ))}
      <p style={{ marginTop: 18 }}><Link href="/design" style={{ color: '#0066ff', fontWeight: 700, fontSize: 13 }}>← 설계</Link></p>
    </main>
  );
}
