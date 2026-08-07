import type { Metadata } from 'next';
import IconCatalog from './IconCatalog';

export const metadata: Metadata = { title: '전체 아이콘 · 모두립' };

export default function IconsPage() {
  return <IconCatalog />;
}
