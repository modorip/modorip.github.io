'use client';
import { useState, type ReactElement, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconBookOpenLine,
  IconCheckmarkScaleLine,
  IconChevronDownLine,
  IconDocumentCheckmarkLine,
  IconDocumentPenLine,
  IconGridLine,
  IconHouseLine,
  IconMapLocationpinLine,
  IconPaletteLine,
  IconPeople3Line,
  IconPersonCircleLine,
  IconPicture2StackedLine,
  IconRectangleSplitedLineVerticalLine,
  IconSparkle2Line,
  IconSparkleViewfinderLine,
  IconSquare2StackedLine,
} from '@karrotmarket/react-monochrome-icon';
import {
  Icon,
  Text,
  SideNavigationProvider,
  SideNavigationRoot,
  SideNavigationHeader,
  SideNavigationTrigger,
  SideNavigationContent,
  SideNavigationGroup,
  SideNavigationGroupLabel,
  SideNavigationItem,
  SideNavigationItemLabel,
  SideNavigationItemPrefixIcon,
  SideNavigationItemSuffixIcon,
  SideNavigationItemCollapsibleRoot,
  SideNavigationItemCollapsibleTrigger,
  SideNavigationItemCollapsibleContent,
} from '@seed-design/react';
import { SCREENS } from '@/lib/screens';

// SEED 가 SideNavigation 컴포넌트 일습(Provider/Root/Header/Content/Group/Item/Collapsible)을
// 배포하므로 그걸 그대로 쓴다. 이전에 Box 로 직접 조립했던 것은 잘못된 판단이었다.
// 화면 카테고리는 screens.ts 의 group 을 정본으로 삼아 인벤토리와 자동으로 동기화한다.

interface NavItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactElement;
  /** 현재 경로면 SEED 가 활성 스타일을 준다. */
  current: boolean;
  collapsed: boolean;
}

// SideNavigationItem 은 button 으로 렌더된다. 라우팅은 asChild 로 next/link 에 위임한다.
function NavItem({ href, children, icon, current, collapsed }: NavItemProps) {
  return (
    <SideNavigationItem asChild current={current}>
      <Link
        href={href}
        title={collapsed && typeof children === 'string' ? children : undefined}
      >
        {icon && <SideNavigationItemPrefixIcon svg={icon} />}
        <SideNavigationItemLabel>{children}</SideNavigationItemLabel>
      </Link>
    </SideNavigationItem>
  );
}

type ScreenMeta = (typeof SCREENS)[number];
type ScreenGroup = ScreenMeta['group'];

const SCREEN_GROUPS = Array.from(new Set(SCREENS.map((screen) => screen.group)));
const SCREEN_GROUP_ICONS: Record<ScreenGroup, ReactElement> = {
  온보딩: <IconSparkle2Line />,
  홈: <IconHouseLine />,
  발견: <IconMapLocationpinLine />,
  도감: <IconBookOpenLine />,
  프리셋: <IconDocumentCheckmarkLine />,
  광장: <IconPeople3Line />,
  프로필: <IconPersonCircleLine />,
};

interface ScreenCategoryProps {
  group: ScreenGroup;
  screens: readonly ScreenMeta[];
  path: string;
  collapsed: boolean;
  onRequestExpand: () => void;
}

function ScreenCategory({
  group,
  screens,
  path,
  collapsed,
  onRequestExpand,
}: ScreenCategoryProps) {
  const active = screens.some((screen) => path === `/mockup/${screen.id}`);
  const [expanded, setExpanded] = useState(false);

  return (
    <SideNavigationItemCollapsibleRoot
      open={!collapsed && (active || expanded)}
      onOpenChange={setExpanded}
    >
      <SideNavigationItemCollapsibleTrigger
        current={collapsed && active}
        aria-label={group}
        title={collapsed ? group : undefined}
        onClick={() => {
          if (collapsed) onRequestExpand();
        }}
      >
        <SideNavigationItemPrefixIcon svg={SCREEN_GROUP_ICONS[group]} />
        <SideNavigationItemLabel>{group}</SideNavigationItemLabel>
        <SideNavigationItemSuffixIcon svg={<IconChevronDownLine />} />
      </SideNavigationItemCollapsibleTrigger>
      <SideNavigationItemCollapsibleContent>
        {screens.map((screen) => (
          <NavItem
            key={screen.id}
            href={`/mockup/${screen.id}`}
            current={path === `/mockup/${screen.id}`}
            collapsed={collapsed}
          >
            {screen.name}
          </NavItem>
        ))}
      </SideNavigationItemCollapsibleContent>
    </SideNavigationItemCollapsibleRoot>
  );
}

export default function Sidebar() {
  const path = usePathname();
  const is = (h: string): boolean => path === h;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideNavigationProvider
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
    >
      <SideNavigationRoot aria-label="목업 탐색">
        <SideNavigationHeader style={{
          display: 'flex',
          alignItems: 'center',
          paddingRight: 'var(--seed-dimension-x14)',
        }}>
          <Text
            textStyle="t4Bold"
            color="fg.neutral"
            whiteSpace="nowrap"
            style={{
              display: 'block',
              width: collapsed ? 0 : 'auto',
              opacity: collapsed ? 0 : 1,
              visibility: collapsed ? 'hidden' : 'visible',
              overflow: 'hidden',
              transition: 'opacity var(--seed-duration-d4)',
            }}
          >
            모두립 · Mockup
          </Text>
          <SideNavigationTrigger aria-label="사이드바 접기 또는 펼치기">
            <Icon svg={<IconRectangleSplitedLineVerticalLine />} />
          </SideNavigationTrigger>
        </SideNavigationHeader>
        <SideNavigationContent>
          <SideNavigationGroup>
            <NavItem href="/wireframes" icon={<IconGridLine />} current={is('/wireframes')} collapsed={collapsed}>와이어프레임</NavItem>
            <NavItem href="/storyboard" icon={<IconDocumentPenLine />} current={is('/storyboard')} collapsed={collapsed}>스토리보드</NavItem>
            <NavItem href="/prototype" icon={<IconSparkleViewfinderLine />} current={is('/prototype')} collapsed={collapsed}>프로토타입</NavItem>
          </SideNavigationGroup>

          <SideNavigationGroup>
            <SideNavigationGroupLabel>화면별 목업</SideNavigationGroupLabel>
            <NavItem href="/mockup" icon={<IconPicture2StackedLine />} current={is('/mockup')} collapsed={collapsed}>전체 갤러리</NavItem>
            {SCREEN_GROUPS.map((group) => (
              <ScreenCategory
                key={group}
                group={group}
                screens={SCREENS.filter((screen) => screen.group === group)}
                path={path}
                collapsed={collapsed}
                onRequestExpand={() => setCollapsed(false)}
              />
            ))}
          </SideNavigationGroup>

          <SideNavigationGroup>
            <SideNavigationGroupLabel>아이콘</SideNavigationGroupLabel>
            <NavItem href="/icons" icon={<IconPaletteLine />} current={is('/icons')} collapsed={collapsed}>전체 아이콘</NavItem>
          </SideNavigationGroup>

          <SideNavigationGroup>
            <SideNavigationGroupLabel>설계</SideNavigationGroupLabel>
            <NavItem href="/design/database" icon={<IconSquare2StackedLine />} current={is('/design/database')} collapsed={collapsed}>데이터베이스</NavItem>
          </SideNavigationGroup>

          <SideNavigationGroup>
            <NavItem href="/licenses" icon={<IconCheckmarkScaleLine />} current={is('/licenses')} collapsed={collapsed}>오픈소스 라이선스</NavItem>
          </SideNavigationGroup>
        </SideNavigationContent>
      </SideNavigationRoot>
    </SideNavigationProvider>
  );
}
