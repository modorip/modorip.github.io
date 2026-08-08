'use client';

import {
  useCallback,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from 'react';

/// 내부 화면(목업·설계) 앞에 세우는 비밀번호 문.
///
/// 🔴 **보안이 아니다. 문지기다.**
///
/// 이 사이트는 GitHub Pages 정적 호스팅이라 **서버가 없다.** 서버가 없으면 접근을
/// 막을 주체도 없다. 즉 이 문은 다음을 **막지 못한다.**
///
/// - 저장소가 공개라 **소스를 그대로 읽을 수 있다**
/// - 🔴 **화면 내용이 HTML 안 RSC 페이로드에 그대로 들어간다.** 서버 컴포넌트인
///   레이아웃이 children 을 먼저 렌더해 직렬화하기 때문이고, 잠금 화면을 보여
///   주는 것과 무관하다. `curl` 한 번이면 나온다(2026-08-08 실측: `/mockup` 의
///   34KB 페이로드에 화면 이름이 전부 들어 있다)
/// - 아래 해시를 사전 공격으로 되돌릴 수 있다
///
/// 막아 주는 것은 하나뿐이다 — **주소를 우연히 연 사람이 그냥 보게 되는 것.**
/// 심사자·검색엔진·링크를 타고 온 사람에게는 충분하고, 작정한 사람에게는 아니다.
///
/// ⚠️ **정말 감춰야 하는 것을 이 뒤에 두지 마라.** 그건 이 저장소에 두지 않는 것이
/// 답이다(AGENTS.md "이 저장소는 공개다").
///
/// 비밀번호를 평문으로 두지 않고 SHA-256 만 둔다. 되돌릴 수 있지만 소스를 훑다
/// 눈에 띄는 일은 없앤다.
const PASSWORD_SHA256 = 'a3691cb37d91aea594d0732eff7cc6ad91d712859b832703c87906c7ec442ed5';

/// 탭을 닫으면 사라진다. 공용 기기에 남기지 않으려고 localStorage 를 쓰지 않는다.
const SESSION_KEY = 'modorip:internal-unlocked';

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/// sessionStorage 는 React 밖의 저장소다. effect 안에서 setState 로 옮기면
/// 렌더가 한 번 더 돌고 ESLint 가 막는다. 이 훅이 그것을 위한 자리다.
///
/// 서버 스냅샷은 **항상 잠김**이다. 정적 export 라 이 컴포넌트가 미리 렌더되는데,
/// 열림으로 두면 잠금 화면이 아니라 내용이 HTML 에 구워진다.
function useUnlockedInSession(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener('storage', onChange);
      return () => window.removeEventListener('storage', onChange);
    },
    () => sessionStorage.getItem(SESSION_KEY) === '1',
    () => false,
  );
}

export default function PasswordGate({ children }: { children: ReactNode }) {
  const storedUnlocked = useUnlockedInSession();
  // 방금 푼 경우. storage 이벤트는 **다른 탭에서만** 오므로 이 탭은 따로 기억한다.
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [failed, setFailed] = useState(false);
  const unlocked = storedUnlocked || justUnlocked;

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const ok = (await sha256(input)) === PASSWORD_SHA256;
      if (!ok) {
        setFailed(true);
        setInput('');
        return;
      }
      sessionStorage.setItem(SESSION_KEY, '1');
      setJustUnlocked(true);
    },
    [input],
  );

  if (unlocked) return <>{children}</>;

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--seed-color-bg-layer-default)',
        padding: 'var(--seed-dimension-x5)',
      }}
    >
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 320 }}>
        <h1
          style={{
            fontSize: 'var(--seed-font-size-t6)',
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-neutral)',
            margin: '0 0 var(--seed-dimension-x2)',
          }}
        >
          내부 자료
        </h1>
        <p
          style={{
            color: 'var(--seed-color-fg-neutral-subtle)',
            fontSize: 'var(--seed-font-size-t3)',
            margin: '0 0 var(--seed-dimension-x5)',
          }}
        >
          모두립 설계 자료입니다. 비밀번호를 입력해 주세요.
        </p>

        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setFailed(false);
          }}
          aria-label="비밀번호"
          autoFocus
          style={{
            width: '100%',
            padding: 'var(--seed-dimension-x3)',
            fontSize: 'var(--seed-font-size-t4)',
            color: 'var(--seed-color-fg-neutral)',
            background: 'var(--seed-color-bg-neutral-weak)',
            border: `1px solid var(--seed-color-stroke-${failed ? 'critical' : 'neutral'}-muted)`,
            borderRadius: 'var(--seed-radius-r3)',
          }}
        />

        {failed && (
          <p
            role="alert"
            style={{
              color: 'var(--seed-color-fg-critical)',
              fontSize: 'var(--seed-font-size-t3)',
              margin: 'var(--seed-dimension-x2) 0 0',
            }}
          >
            비밀번호가 맞지 않습니다.
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: 'var(--seed-dimension-x4)',
            padding: 'var(--seed-dimension-x3)',
            fontSize: 'var(--seed-font-size-t4)',
            fontWeight: 'var(--seed-font-weight-bold)',
            color: 'var(--seed-color-fg-neutral-inverted)',
            background: 'var(--seed-color-bg-brand-solid)',
            border: 'none',
            borderRadius: 'var(--seed-radius-r3)',
            cursor: 'pointer',
          }}
        >
          열기
        </button>
      </form>
    </main>
  );
}
