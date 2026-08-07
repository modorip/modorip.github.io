import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { doc, surface, BackLink } from '@/components/doc';

export const metadata: Metadata = { title: '오픈소스 라이선스 · 모두립' };

/** 고지 대상 패키지. name 은 node_modules 하위 디렉터리명과 같아야 한다. */
interface PackageRef {
  name: string;
  role: string;
}

/** 빌드 시점에 node_modules 에서 읽어낸 고지 내용. 파일이 없으면 null 이다. */
interface PackageNotice extends PackageRef {
  version: string | null;
  license: string | null;
  notice: string | null;
}

// Apache-2.0 제4조는 재배포 시 (a) 라이선스 사본과 (d) NOTICE 의 귀속 고지를
// 함께 전달할 것을 요구한다. 손으로 옮겨 적으면 원문과 어긋날 수 있으므로
// 빌드 시점에 설치된 패키지에서 직접 읽는다. SSG 라 결과는 정적으로 굳는다.
const PACKAGES: readonly PackageRef[] = [
  { name: '@seed-design/react', role: 'SEED 컴포넌트 런타임' },
  { name: '@seed-design/css', role: 'SEED 디자인 토큰 · 레시피 CSS' },
  { name: '@karrotmarket/react-monochrome-icon', role: 'SEED Monochrome 아이콘' },
  { name: '@karrotmarket/react-multicolor-icon', role: 'SEED Multicolor 아이콘' },
];

function readPackage({ name, role }: PackageRef): PackageNotice {
  const dir = path.join(process.cwd(), 'node_modules', name);
  const read = (f: string): string | null => {
    try { return fs.readFileSync(path.join(dir, f), 'utf8'); } catch { return null; }
  };
  let version: string | null = null;
  try {
    const pkg = JSON.parse(read('package.json') || '{}') as { version?: string };
    version = pkg.version || null;
  } catch { /* 무시 */ }
  return { name, role, version, license: read('LICENSE'), notice: read('NOTICE') };
}

const pre: CSSProperties = {
  ...surface,
  padding: 'var(--seed-dimension-x4)',
  margin: 'var(--seed-dimension-x2) 0 0',
  maxHeight: 360,
  overflow: 'auto',
  fontFamily: 'ui-monospace, monospace',
  fontSize: 'var(--seed-font-size-t1)',
  lineHeight: 'var(--seed-line-height-t2)',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const label: CSSProperties = {
  fontSize: 'var(--seed-font-size-t1)',
  fontWeight: 'var(--seed-font-weight-bold)',
  color: 'var(--seed-color-fg-neutral-subtle)',
  textTransform: 'uppercase',
  marginTop: 'var(--seed-dimension-x4)',
};

export default function Licenses() {
  const packages = PACKAGES.map(readPackage);
  return (
    <main style={doc.main}>
      <div style={doc.kicker}>모두립 · 오픈소스 고지</div>
      <h1 style={doc.h1}>오픈소스 라이선스</h1>
      <p style={doc.sub}>
        모두립은 당근마켓이 공개한 <b>SEED Design</b> 을 사용합니다. 아래 패키지는 모두
        Apache License 2.0 으로 배포되며, 제4조에 따라 라이선스 사본과 귀속 고지를 함께 싣습니다.
        모두립은 주식회사 당근마켓과 아무런 제휴·후원·보증 관계가 없습니다.
        /icons는 설치 패키지의 아이콘을 확인하는 개발용 카탈로그이며,
        Multicolor 아이콘을 모두립 서비스 화면에 사용한다는 의미가 아닙니다.
      </p>

      <div style={{
        ...surface,
        marginTop: 'var(--seed-dimension-x4_5)',
        padding: 'var(--seed-dimension-x4)',
        background: 'var(--seed-color-bg-informative-weak)',
        borderColor: 'var(--seed-color-stroke-informative-weak)',
        fontSize: 'var(--seed-font-size-t3)',
        lineHeight: 'var(--seed-line-height-t5)',
      }}>
        각 패키지의 NOTICE 는 로고·상호명·캐릭터 등 <b>당근마켓 브랜드 리소스</b>를
        상표로 보호한다고 안내합니다. 모두립의 앱 화면은 당근마켓의 로고·상호명·캐릭터를 사용하지 않습니다.
      </div>

      {packages.map((p) => (
        <section key={p.name}>
          <h2 style={doc.h2}>
            {p.name}
            {p.version && <span style={{ ...doc.pos, marginLeft: 'var(--seed-dimension-x2)' }}>v{p.version}</span>}
          </h2>
          <p style={{ ...doc.note, margin: 0 }}>{p.role} · Apache License 2.0</p>

          <div style={label}>NOTICE</div>
          <pre style={pre}>{p.notice || '(NOTICE 파일 없음)'}</pre>

          <div style={label}>LICENSE (Apache License 2.0)</div>
          <pre style={pre}>{p.license || '(LICENSE 파일 없음)'}</pre>
        </section>
      ))}

      <p style={{ marginTop: 'var(--seed-dimension-x6)' }}>
        <BackLink href="/">홈</BackLink>
      </p>
    </main>
  );
}
