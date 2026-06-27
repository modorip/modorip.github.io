import { notFound } from 'next/navigation';
import FullScreenView from '@/components/FullScreenView';
import { SCREENS, byId } from '@/lib/screens';

export function generateStaticParams() { return SCREENS.map((s) => ({ id: s.id })); }

export async function generateMetadata({ params }) {
  const { id } = await params;
  const m = byId(id);
  return { title: m ? `${m.no} ${m.name} · 목업` : '목업' };
}

export default async function MockupScreenPage({ params }) {
  const { id } = await params;
  const m = byId(id);
  if (!m) notFound();
  return <FullScreenView mode="screen" id={id} backHref="/mockup" title={`${m.no} · ${m.name}`} />;
}
