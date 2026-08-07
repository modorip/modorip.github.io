import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FullScreenView from '@/components/FullScreenView';
import { SCREENS, byId } from '@/lib/screens';

/** Next 16 은 동적 세그먼트 params 를 Promise 로 넘긴다. */
interface ScreenPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams(): { id: string }[] {
  return SCREENS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: ScreenPageProps): Promise<Metadata> {
  const { id } = await params;
  const m = byId(id);
  return { title: m ? `${m.no} ${m.name} · 목업` : '목업' };
}

export default async function MockupScreenPage({ params }: ScreenPageProps) {
  const { id } = await params;
  const m = byId(id);
  if (!m) notFound();
  return <FullScreenView mode="screen" id={id} backHref="/mockup" title={`${m.no} · ${m.name}`} />;
}
