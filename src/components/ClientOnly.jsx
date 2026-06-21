'use client';
import { useState, useEffect } from 'react';

// localStorage/document를 쓰는 디자인 번들은 클라이언트에서만 렌더한다.
export default function ClientOnly({ children, fallback = null }) {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m ? children : fallback;
}
