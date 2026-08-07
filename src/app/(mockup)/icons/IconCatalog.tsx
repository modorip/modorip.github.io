'use client';

import {
  Suspense,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from 'react';
import {
  ActionButton,
  Badge,
  Text,
  TextFieldInput,
  TextFieldPrefixIcon,
  TextFieldRoot,
} from '@seed-design/react';
import { IconMagnifyingglassLine } from '@karrotmarket/react-monochrome-icon';
import {
  getIcon as getMonochromeIcon,
  iconTokens,
} from '@karrotmarket/react-monochrome-icon/loader';
import {
  getIcon as getMulticolorIcon,
  iconTokens as multicolorIconTokens,
} from '@karrotmarket/react-multicolor-icon/loader';
import {
  SegmentedControl,
  SegmentedControlItem,
} from 'seed-design/ui/segmented-control';
import { doc, surface } from '@/components/doc';
import { CUSTOM_ICON_PATHS } from '@/lib/customIcons';

type IconSet = 'monochrome' | 'multicolor' | 'modorip';
type IconComponent = NonNullable<ReturnType<typeof getMonochromeIcon>>;

interface PackageIconEntry {
  token: string;
  Glyph: IconComponent;
}

const PAGE_SIZE = 96;
const CUSTOM_ICONS = Object.entries(CUSTOM_ICON_PATHS);
const MONOCHROME_ICONS: PackageIconEntry[] = iconTokens.flatMap((token) => {
  const Glyph = getMonochromeIcon(token);
  return Glyph ? [{ token, Glyph }] : [];
});
const MULTICOLOR_ICONS: PackageIconEntry[] = multicolorIconTokens.flatMap((token) => {
  const Glyph = getMulticolorIcon(token);
  return Glyph ? [{ token, Glyph }] : [];
});

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
  gap: 'var(--seed-dimension-x2_5)',
};

const comparisonGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  alignItems: 'start',
  gap: 'var(--seed-dimension-x3)',
};

const comparisonIconGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))',
  gap: 'var(--seed-dimension-x2)',
};

const card: CSSProperties = {
  ...surface,
  minWidth: 0,
  minHeight: 112,
  padding: 'var(--seed-dimension-x3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'var(--seed-dimension-x2_5)',
};

const tokenText: CSSProperties = {
  width: '100%',
  margin: 0,
  color: 'var(--seed-color-fg-neutral-subtle)',
  fontFamily: 'ui-monospace, monospace',
  fontSize: 'var(--seed-font-size-t1)',
  lineHeight: 'var(--seed-line-height-t2)',
  textAlign: 'center',
  overflowWrap: 'anywhere',
};

function splitPaths(path: string): string[] {
  return path.split(' M').map((part, index) => (index === 0 ? part : `M${part}`));
}

function CustomGlyph({
  path,
  ...props
}: { path: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {splitPaths(path).map((part, index) => <path key={index} d={part} />)}
    </svg>
  );
}

function PackageIconCard({ token, Glyph }: PackageIconEntry) {
  return (
    <div style={card}>
      <Suspense
        fallback={<span style={{ width: 32, height: 32 }} aria-hidden />}
      >
        <Glyph size={32} aria-hidden />
      </Suspense>
      <p style={tokenText}>{token}</p>
    </div>
  );
}

function matchesToken(token: string, query: string): boolean {
  return token.replace(/^icon_/, '').includes(query);
}

interface SearchFieldProps {
  value: string;
  placeholder: string;
  onValueChange: (value: string) => void;
}

function SearchField({ value, placeholder, onValueChange }: SearchFieldProps) {
  return (
    <TextFieldRoot variant="outline" size="responsive">
      <TextFieldPrefixIcon svg={<IconMagnifyingglassLine />} />
      <TextFieldInput
        value={value}
        onChange={(event) => onValueChange(event.currentTarget.value)}
        placeholder={placeholder}
        aria-label="아이콘 검색"
      />
    </TextFieldRoot>
  );
}

interface ComparisonPanelProps {
  comparisonTitle: string;
  count: number;
  children: ReactNode;
}

function ComparisonPanel({
  comparisonTitle,
  count,
  children,
}: ComparisonPanelProps) {
  return (
    <section style={{
      ...surface,
      minWidth: 0,
      padding: 'var(--seed-dimension-x3)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--seed-dimension-x2)',
        marginBottom: 'var(--seed-dimension-x3)',
      }}>
        <Text as="h3" textStyle="t5Bold" color="fg.neutral">
          {comparisonTitle}
        </Text>
        <Badge tone="neutral" variant="weak" size="medium">{count}개</Badge>
      </div>
      {count > 0 ? (
        <div style={comparisonIconGrid}>{children}</div>
      ) : (
        <Text
          as="p"
          textStyle="t2Regular"
          color="fg.neutralSubtle"
          align="center"
          style={{ margin: 'var(--seed-dimension-x8) 0' }}
        >
          검색 결과가 없습니다.
        </Text>
      )}
    </section>
  );
}

export default function IconCatalog() {
  const [iconSet, setIconSet] = useState<IconSet>('monochrome');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);

  const normalizedQuery = query.trim().toLowerCase().replaceAll(' ', '_');
  const isComparing = normalizedQuery.length > 0;
  const filteredMonochromeIcons = useMemo(() => {
    return MONOCHROME_ICONS.filter(({ token }) => matchesToken(token, normalizedQuery));
  }, [normalizedQuery]);

  const filteredMulticolorIcons = useMemo(() => {
    return MULTICOLOR_ICONS.filter(({ token }) => matchesToken(token, normalizedQuery));
  }, [normalizedQuery]);

  const filteredCustomIcons = useMemo(() => {
    const customQuery = normalizedQuery.replaceAll('_', '-');
    return CUSTOM_ICONS.filter(([name]) => name.includes(customQuery));
  }, [normalizedQuery]);

  const filteredPackageIcons = iconSet === 'multicolor'
    ? filteredMulticolorIcons
    : filteredMonochromeIcons;
  const pageCount = Math.max(1, Math.ceil(filteredPackageIcons.length / PAGE_SIZE));
  const visiblePackageIcons = filteredPackageIcons.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(0);
  };

  const updateIconSet = (value: string) => {
    setIconSet(value as IconSet);
    setPage(0);
  };

  return (
    <main style={doc.main}>
      <Text textStyle="t2Bold" color="fg.brand" style={{ display: 'block' }}>
        모두립 · 아이콘 카탈로그
      </Text>
      <Text as="h1" textStyle="t11Bold" color="fg.neutral" style={doc.h1}>
        전체 아이콘
      </Text>
      <Text as="p" textStyle="t4Regular" color="fg.neutralSubtle" style={doc.sub}>
        설치된 SEED Monochrome, Multicolor 아이콘과 모두립 아이콘을 한곳에서 확인합니다.
      </Text>

      <div style={{ margin: 'var(--seed-dimension-x6) 0 var(--seed-dimension-x4)' }}>
        <SearchField
          value={query}
          onValueChange={updateQuery}
          placeholder="세 아이콘 세트에서 비교 검색..."
        />
      </div>

      {isComparing ? (
        <section>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--seed-dimension-x2)',
            marginBottom: 'var(--seed-dimension-x4)',
          }}>
            <div>
              <Text as="h2" textStyle="t6Bold" color="fg.neutral">
                비교 검색 결과
              </Text>
              <Text
                as="p"
                textStyle="t3Regular"
                color="fg.neutralSubtle"
                style={{ margin: 'var(--seed-dimension-x1) 0 0' }}
              >
                같은 검색어를 세 아이콘 집합에 동시에 적용했습니다.
              </Text>
            </div>
            <Badge tone="neutral" variant="weak" size="medium">
              총 {filteredMonochromeIcons.length + filteredMulticolorIcons.length + filteredCustomIcons.length}개
            </Badge>
          </div>

          <div style={comparisonGrid}>
            <ComparisonPanel
              comparisonTitle="Monochrome"
              count={filteredMonochromeIcons.length}
            >
              {filteredMonochromeIcons.map((icon) => (
                <PackageIconCard key={icon.token} {...icon} />
              ))}
            </ComparisonPanel>
            <ComparisonPanel
              comparisonTitle="Multicolor"
              count={filteredMulticolorIcons.length}
            >
              {filteredMulticolorIcons.map((icon) => (
                <PackageIconCard key={icon.token} {...icon} />
              ))}
            </ComparisonPanel>
            <ComparisonPanel
              comparisonTitle="모두립"
              count={filteredCustomIcons.length}
            >
              {filteredCustomIcons.map(([name, path]) => (
                <div key={name} style={card}>
                  <CustomGlyph path={path} width={32} height={32} />
                  <p style={tokenText}>{name}</p>
                </div>
              ))}
            </ComparisonPanel>
          </div>
        </section>
      ) : (
        <>
          <div style={{
            maxWidth: 660,
            margin: '0 auto var(--seed-dimension-x6)',
          }}>
            <SegmentedControl
              aria-label="아이콘 집합"
              value={iconSet}
              onValueChange={updateIconSet}
              style={{ width: '100%' }}
            >
              <SegmentedControlItem value="monochrome">Monochrome</SegmentedControlItem>
              <SegmentedControlItem value="multicolor">Multicolor</SegmentedControlItem>
              <SegmentedControlItem value="modorip">모두립</SegmentedControlItem>
            </SegmentedControl>
          </div>

          {iconSet !== 'modorip' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                gap: 'var(--seed-dimension-x3)',
                marginBottom: 'var(--seed-dimension-x3)',
              }}>
                {iconSet === 'multicolor' && (
                  <Text
                    textStyle="t2Regular"
                    color="fg.neutralSubtle"
                    style={{ marginRight: 'auto' }}
                  >
                    일부 아이콘은 당근 브랜드 리소스일 수 있으므로 실제 적용 전 NOTICE를 확인하세요.
                  </Text>
                )}
                <Badge tone="neutral" variant="weak" size="medium">
                  {filteredPackageIcons.length}개
                </Badge>
                <Text textStyle="t2Regular" color="fg.neutralSubtle">
                  {`${page + 1} / ${pageCount} 페이지`}
                </Text>
              </div>

              <div style={grid}>
                {visiblePackageIcons.map((icon) => (
                  <PackageIconCard key={icon.token} {...icon} />
                ))}
              </div>

              {pageCount > 1 && (
                <nav
                  aria-label="아이콘 페이지"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--seed-dimension-x2)',
                    marginTop: 'var(--seed-dimension-x5)',
                  }}
                >
                  <ActionButton
                    variant="neutralOutline"
                    size="small"
                    disabled={page === 0}
                    onClick={() => setPage((current) => Math.max(0, current - 1))}
                  >
                    이전
                  </ActionButton>
                  <ActionButton
                    variant="neutralOutline"
                    size="small"
                    disabled={page >= pageCount - 1}
                    onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
                  >
                    다음
                  </ActionButton>
                </nav>
              )}
            </section>
          )}

          {iconSet === 'modorip' && (
            <section>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--seed-dimension-x3)',
                marginBottom: 'var(--seed-dimension-x3)',
              }}>
                <Text textStyle="t3Regular" color="fg.neutralSubtle">
                  SEED에 대응 아이콘이 없거나 의미가 달라져 유지한 SVG입니다.
                </Text>
                <Badge tone="neutral" variant="weak" size="medium">
                  {filteredCustomIcons.length}개
                </Badge>
              </div>

              <div style={grid}>
                {filteredCustomIcons.map(([name, path]) => (
                  <div key={name} style={card}>
                    <CustomGlyph path={path} width={32} height={32} />
                    <p style={tokenText}>{name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
